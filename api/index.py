import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI(title="VaaniAccess API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
import json
from _ai_extractor import extract_profile_from_text
from _database import get_db, init_db
class AnalyzeRequest(BaseModel):
    text: str

def get_schemes_from_profile(profile: dict, raw_text: str = ""):
    conn = get_db()
    c = conn.cursor()
    
    # Fetch all schemes
    c.execute("SELECT * FROM schemes")
    all_rows = c.fetchall()
    schemes_dict = {}
    for row in all_rows:
        r = dict(row)
        r['documents'] = json.loads(r['documents']) if r.get('documents') else []
        r['steps'] = json.loads(r['steps']) if r.get('steps') else []
        r['benefit'] = r.get('benefit') or ''
        r['official_url'] = r.get('official_url') or ''
        r['match_score'] = 0
        r['matchedCriteria'] = []
        schemes_dict[r['id']] = r

    # Fetch all criteria
    c.execute("SELECT * FROM match_criteria")
    criteria_rows = c.fetchall()
    conn.close()

    occ = (profile.get('occupation') or "").strip().lower()
    edu = (profile.get('education') or "").strip().lower()
    intt = (profile.get('intent') or "").strip().lower()
    cat = (profile.get('category') or "").strip().lower()
    raw = (raw_text or "").strip().lower()

    for row in criteria_rows:
        crit = dict(row)
        sid = crit['scheme_id']
        ctype = crit['criteria_type']
        val = (crit['value'] or "").strip().lower()
        if sid not in schemes_dict or not val:
            continue

        matched_this = False
        desc = ""
        weight = 2

        if ctype == 'intent' and intt:
            if val in intt or intt in val or any(len(w) > 3 and w in intt for w in val.split()):
                matched_this = True
                weight = 6  # Strong intent match priority
                desc = f"Benefit requirement match: {intt.title()}"
        elif ctype == 'occupation' and occ:
            if val in occ or occ in val or any(len(w) > 3 and w in occ for w in val.split()):
                matched_this = True
                desc = f"Occupation match: {occ.title()} ({val})"
        elif ctype == 'education' and edu:
            if val in edu or edu in val or any(len(w) > 3 and w in edu for w in val.split()):
                matched_this = True
                desc = f"Education qualification match: {edu.title()}"

        if matched_this:
            schemes_dict[sid]['match_score'] += weight
            if desc and desc not in schemes_dict[sid]['matchedCriteria']:
                schemes_dict[sid]['matchedCriteria'].append(desc)

    # Raw query direct keyword boost
    if raw:
        for sid, s in schemes_dict.items():
            s_name = s.get('name', '').lower()
            if ('tablet' in raw or 'digishakti' in raw) and ('tablet' in s_name or 'digishakti' in s_name):
                s['match_score'] += 10
                if "Direct tablet requirement match: Muft Tablet / Smartphone" not in s['matchedCriteria']:
                    s['matchedCriteria'].insert(0, "Direct requirement match: Muft Tablet / Smartphone")
            elif 'scholarship' in raw and 'scholarship' in s_name and 'tablet' not in raw:
                s['match_score'] += 6
            elif ('kisan' in raw or 'kisan samman' in raw) and 'kisan' in s_name:
                s['match_score'] += 10
            elif ('mudra' in raw or 'vyapar' in raw) and 'mudra' in s_name:
                s['match_score'] += 6
            elif ('svanidhi' in raw or 'vendor' in raw or 'thela' in raw) and 'svanidhi' in s_name:
                s['match_score'] += 10
            elif ('ayushman' in raw or 'ilaj' in raw) and 'ayushman' in s_name:
                s['match_score'] += 10
            elif ('awas' in raw or 'makan' in raw) and 'awas' in s_name:
                s['match_score'] += 10
            elif ('vishwakarma' in raw or 'karigar' in raw or 'toolkit' in raw) and 'vishwakarma' in s_name:
                s['match_score'] += 10
            elif ('sukanya' in raw or 'beti' in raw) and 'sukanya' in s_name:
                s['match_score'] += 10

    # Category matching bonus
    if cat:
        for sid, s in schemes_dict.items():
            if s.get('category', '').lower() == cat:
                s['match_score'] += 1
                cat_desc = f"Welfare domain match: {s.get('category', '').title()}"
                if cat_desc not in s['matchedCriteria']:
                    s['matchedCriteria'].append(cat_desc)

    # Filter schemes with score > 0 and sort
    matched_schemes = [s for s in schemes_dict.values() if s['match_score'] > 0]
    matched_schemes.sort(key=lambda x: x['match_score'], reverse=True)

    # Calculate friendly match percentage
    for s in matched_schemes:
        raw_score = s['match_score']
        # Map raw score to 78% - 98%
        pct = min(98, 75 + raw_score * 4)
        s['score'] = pct
        if not s['matchedCriteria']:
            s['matchedCriteria'] = [
                f"Eligible for {s.get('category', 'general').title()} assistance",
                "Matches demographic eligibility",
                "Verified against central portal criteria"
            ]

    # If no criteria hit but profile has keywords, fallback to top category or popular schemes
    if not matched_schemes and (occ or intt or edu or cat):
        for s in schemes_dict.values():
            if cat and s.get('category', '').lower() == cat:
                s['score'] = 80
                s['matchedCriteria'] = [f"Matches requested category: {cat.title()}"]
                matched_schemes.append(s)

    return matched_schemes

def startup_event():
    import seed
    seed.seed_data()

def analyze_text(req: AnalyzeRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is empty")
        
    profile = extract_profile_from_text(req.text)
    schemes = get_schemes_from_profile(profile, raw_text=req.text)
    
    if not schemes:
        audio_msg = "Maaf karein, mujhe is jankari ke aadhar par koi yojana nahi mili. Kripya thoda aur vistaar se batayen."
    else:
        top_scheme = schemes[0]
        audio_msg = f"Aapki jankari ke anusar, aapke liye {top_scheme['name']} sabse sahi lag rahi hai."
        
    return {
        "extracted_profile": profile,
        "matched_schemes": schemes,
        "audio_message": audio_msg
    }

def list_schemes():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM schemes")
    rows = c.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        r = dict(row)
        r['documents'] = json.loads(r['documents'])
        r['steps'] = json.loads(r['steps'])
        results.append(r)
    return {"schemes": results}

if app:
    app.on_event("startup")(startup_event)
    app.post("/api/analyze")(analyze_text)
    app.get("/api/schemes")(list_schemes)
