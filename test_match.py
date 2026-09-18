import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'api'))
from _ai_extractor import extract_profile_from_text
from index import get_schemes_from_profile

tests = [
    'give me some free tablet yojna',
    'free tablet yojana',
    'main college student hoon scholarship chahiye',
]

for query in tests:
    profile = extract_profile_from_text(query)
    schemes = get_schemes_from_profile(profile, raw_text=query)
    top = schemes[0] if schemes else None
    print(f"Query: '{query}'")
    print(f"  Extracted Profile: {profile}")
    if top:
        print(f"  Matched: {top['name']} ({top['official_url']}) - Score: {top['score']}%\n")
    else:
        print("  No match found.\n")

