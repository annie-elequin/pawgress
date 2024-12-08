package database

import (
    "database/sql"
    "log"

    _ "github.com/jackc/pgx/v4/stdlib"
)

var DB *sql.DB

func Connect() {
    var err error
    DB, err = sql.Open("pgx", "postgresql://username:password@localhost:5432/dog_training")
    if err != nil {
        log.Fatal("Failed to connect to the database:", err)
    }

    if err = DB.Ping(); err != nil {
        log.Fatal("Database is not reachable:", err)
    }
    log.Println("Database connection established")
}
