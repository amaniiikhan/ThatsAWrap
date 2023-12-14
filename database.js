const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./my_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Created the users table.');
    }
});

function addUser(username, password) {
    db.run(`INSERT INTO users(username, password) VALUES(?, ?)`, [username, password], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

module.exports = {
    addUser
};

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
});
