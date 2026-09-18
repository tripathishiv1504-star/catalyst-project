import os
import json
import re
import requests
from pathlib import Path
try:
    import google.generativeai as genai
except ImportError:
    genai = None
try:
    from dotenv import load_dotenv
    # Load .env from backend dir and project root
    env_paths = [
        Path(__file__).parent / '.env',
        Path(__file__).parent.parent / '.env'
    ]
    for p in env_paths:
        if p.exists():
            load_dotenv(p)
except ImportError:
    pass

API_KEY = os.environ.get("GEMINI_API_KEY")

primary_model = None
fallback_model = None

if API_KEY and genai:
    try:
        genai.configure(api_key=API_KEY)
        # gemini-3.5-flash-lite is the active fast model
        primary_model = genai.GenerativeModel('gemini-3.5-flash-lite')
        fallback_model = genai.GenerativeModel('gemini-3.6-flash')
    except Exception as e:
        print(f"GenAI configuration warning: {e}")
def _clean_and_parse_json(text: str) -> dict:
    """Safely extracts JSON dict from text."""
    try:
        # Match outermost curly brackets
        match = re.search(r'\{[\s\S]*\}', text)
        if match:
            return json.loads(match.group(0))
    except Exception:
        pass
    return None

def extract_profile_from_text(text: str) -> dict:
    """Extracts occupation, education, and intent from Hindi/Hinglish/English text."""
    prompt = f"""
    You are an AI assistant for the Indian Government welfare navigator "VaaniAccess".
    Analyze the user's spoken or typed requirement (in Hindi, Hinglish, or English).
    Extract their profile details to match government welfare schemes.
    
    Fields to extract:
    - occupation: The person's role or livelihood (e.g. "student", "farmer", "street vendor", "small business", "artisan", "unemployed", "homemaker", "laborer", "daily wage worker").
    - education: Educational stage if mentioned (e.g. "school", "college", "10th pass", "12th pass", "graduate", "post-graduate", "degree").
    - intent: What assistance they seek (e.g. "free tablet", "scholarship", "loan", "financial aid", "health insurance", "pucca house", "toolkit subsidy", "daughter savings").
    - category: The welfare domain ("education", "agriculture", "business", "healthcare", "housing", "social welfare").

    User text: "{text}"

    Return ONLY a single valid JSON object. Do not include markdown codeblocks or explanation.
    Example JSON:
    {{
        "occupation": "student",
        "education": "college",
        "intent": "free tablet",
        "category": "education"
    }}
    """

    if API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}]
            }
            resp = requests.post(url, headers=headers, json=payload, timeout=10)
            if resp.status_code == 200:
                data = resp.json()
                if "candidates" in data and len(data["candidates"]) > 0:
                    result_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = _clean_and_parse_json(result_text)
                    if parsed and isinstance(parsed, dict):
                        return {
                            "occupation": parsed.get("occupation"),
                            "education": parsed.get("education"),
                            "intent": parsed.get("intent"),
                            "category": parsed.get("category")
                        }
            else:
                print(f"Gemini API Error: {resp.status_code} {resp.text}")
        except Exception as e:
            print(f"Gemini generation error: {e}")

    # Robust Keyword/Context Fallback (handles Hindi, Hinglish, English)
    t = text.lower()
    profile = {
        "occupation": None,
        "education": None,
        "intent": None,
        "category": None
    }

    # Education / Student & Free Tablet / Smartphone / Scholarship
    if any(k in t for k in ["tablet", "tab", "smartphone", "smart phone", "laptop", "digishakti", "muft tablet", "free tablet", "free smartphone"]):
        profile["occupation"] = "student"
        profile["education"] = "college"
        profile["intent"] = "free tablet"
        profile["category"] = "education"
    elif any(k in t for k in ["student", "chhatra", "vidyarthi", "padhai", "study", "studies"]):
        profile["occupation"] = "student"
        profile["category"] = "education"

    if any(k in t for k in ["college", "degree", "graduation", "university", "btech", "ba", "bsc", "diploma", "iti", "polytechnic"]):
        profile["education"] = "college"
    elif any(k in t for k in ["school", "10th", "12th", "matric"]):
        profile["education"] = "school"

    if not profile["intent"] and any(k in t for k in ["scholarship", "fees", "fee", "wazifa", "padhai ke paise", "stipend"]):
        profile["intent"] = "scholarship"
        profile["category"] = "education"

    # Agriculture / Farmers
    if any(k in t for k in ["farmer", "kisan", "kisaan", "kheti", "kheti-bari", "fasal", "krishi", "agriculture"]):
        profile["occupation"] = "farmer"
        profile["category"] = "agriculture"
        if any(k in t for k in ["sahayata", "paise", "kist", "subsidy", "financial help", "money"]):
            profile["intent"] = "financial help"

    # Street Vendors & Small Business
    if any(k in t for k in ["vendor", "thela", "rehdi", "stall", "feri", "street vendor", "hawker"]):
        profile["occupation"] = "street vendor"
        profile["category"] = "business"
        profile["intent"] = "loan"
    elif any(k in t for k in ["business", "vyapar", "dukaan", "shop", "entrepreneur", "start", "shuru"]):
        profile["occupation"] = "business"
        profile["category"] = "business"
        profile["intent"] = "loan"

    # Healthcare / Ayushman
    if any(k in t for k in ["health", "hospital", "ilaj", "bimar", "bimari", "doctor", "medicine", "dawa", "treatment", "ayushman"]):
        profile["intent"] = "health insurance"
        profile["category"] = "healthcare"

    # Housing / PM Awas
    if any(k in t for k in ["ghar", "makan", "house", "pucca ghar", "housing", "awas"]):
        profile["intent"] = "housing subsidy"
        profile["category"] = "housing"

    # Traditional Artisans / Vishwakarma
    if any(k in t for k in ["artisan", "karigar", "lohar", "badhai", "carpenter", "blacksmith", "darzi", "tailor", "vishwakarma", "hath ka kaam"]):
        profile["occupation"] = "artisan"
        profile["intent"] = "toolkit subsidy and loan"
        profile["category"] = "business"

    # Women & Daughter Welfare
    if any(k in t for k in ["beti", "daughter", "girl", "sukanya", "mahila", "aurat", "lady"]):
        profile["intent"] = "savings for daughter"
        profile["category"] = "social welfare"

    # General Financial Assistance / Loan
    if not profile["intent"]:
        if any(k in t for k in ["loan", "karz", "kredit", "credit"]):
            profile["intent"] = "loan"
        elif any(k in t for k in ["sahayata", "madad", "help", "paise", "subsidy"]):
            profile["intent"] = "financial help"

    return profile

