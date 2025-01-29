USE kimaster_db;

CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY, -- Neue autoincrement-Spalte
    email VARCHAR(255) UNIQUE,             -- Eindeutige E-Mail-Adresse, kann NULL sein
    fullname VARCHAR(255) NOT NULL,
    sessionKey LONGTEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastSeenAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mailSentAt TIMESTAMP DEFAULT NULL
);