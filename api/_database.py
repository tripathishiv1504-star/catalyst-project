import sqlite3
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'schemes.db')

def get_db():
    if os.environ.get("VERCEL") == "1":
        conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    else:
        conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS schemes (
            id TEXT PRIMARY KEY,
            name TEXT,
            category TEXT,
            benefit TEXT,
            official_url TEXT,
            description TEXT,
            documents TEXT,
            steps TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS match_criteria (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            scheme_id TEXT,
            criteria_type TEXT,
            value TEXT,
            FOREIGN KEY(scheme_id) REFERENCES schemes(id)
        )
    ''')
    conn.commit()
    conn.close()
