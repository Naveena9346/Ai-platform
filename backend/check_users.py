import sqlite3

conn = sqlite3.connect('backend/dataquest.db')
cursor = conn.cursor()

try:
    cursor.execute("SELECT id, username, email FROM users;")
    rows = cursor.fetchall()
    print("USERS IN DATABASE:", rows)
except Exception as e:
    print("ERROR:", e)

conn.close()
