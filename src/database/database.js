import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('notes.db');

export const initDatabase = () => {
    try {
        db.execAsync(`
            CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT DEFAULT '',
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );
                
        `);

        console.log('Database Sukses');

    } catch (error) {
        console.log('Error database:', error);
    }
} 
export default db;