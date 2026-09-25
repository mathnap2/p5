-- Migration number: 0001 	 2026-09-24T00:00:00.000Z
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE
);

INSERT INTO users (name, email) VALUES ('mathias', 'mathias@example.com');
