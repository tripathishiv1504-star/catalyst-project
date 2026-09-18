import json
import os
from _database import init_db, get_db
def seed_data():
    conn = get_db()
    c = conn.cursor()
    
    # drop existing to recreate with new columns
    c.execute('DROP TABLE IF EXISTS match_criteria')
    c.execute('DROP TABLE IF EXISTS schemes')
    conn.commit()
    conn.close()

    init_db()
    conn = get_db()
    c = conn.cursor()
    
    json_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src', 'data', 'schemes.json')
    if not os.path.exists(json_path):
        print("Error: schemes.json not found at", json_path)
        return

    with open(json_path, 'r') as f:
        schemes = json.load(f)
        
    for s in schemes:
        c.execute('''
            INSERT INTO schemes (id, name, category, benefit, official_url, description, documents, steps)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            s['id'], 
            s['name'], 
            s['category'],
            s.get('benefit', ''),
            s.get('official_url', ''),
            s['description'], 
            json.dumps(s['documents']), 
            json.dumps(s['steps'])
        ))
        
        for criteria_type, values in s['match_criteria'].items():
            for v in values:
                c.execute('''
                    INSERT INTO match_criteria (scheme_id, criteria_type, value)
                    VALUES (?, ?, ?)
                ''', (s['id'], criteria_type, v.lower()))
                
    conn.commit()
    conn.close()
    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
