import sqlite3
import json
import os
import shutil

BUNDLED_DB_PATH = os.path.join(os.path.dirname(__file__), 'schemes.db')

if os.environ.get("VERCEL") == "1":
    TMP_DB_PATH = '/tmp/schemes.db'
    # Always copy on cold start to ensure we don't use a corrupted/empty leftover file
    shutil.copy2(BUNDLED_DB_PATH, TMP_DB_PATH)

def get_db():
    if os.environ.get("VERCEL") == "1":
        conn = sqlite3.connect('/tmp/schemes.db')
    else:
        conn = sqlite3.connect(BUNDLED_DB_PATH)
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
