import sqlite3

conn = sqlite3.connect('db.sqlite3');
c = conn.cursor();

#cursor=c.execute('''SELECT * from sqlite_master''');
cursor=c.execute('''DELETE FROM sqlite_sequence''');

for row in cursor:
	print("ID = "+row[0]);
	print("NAME = "+row[1]+"\n")
conn.commit();
conn.close();