import db from './database';

// CREATE
export const createNote = (title, content) => {
  const now = Date.now();

  db.runSync(
    `
      INSERT INTO notes
      (title, content, created_at, updated_at)
      VALUES (?, ?, ?, ?)
    `,
    [title, content, now, now]
  );
};

// READ
export const getNotes = () => {
  return db.getAllSync(
    `
      SELECT * FROM notes
      ORDER BY updated_at DESC
    `
  );
};

// UPDATE
export const updateNote = (id, title, content) => {
  db.runSync(
    `
      UPDATE notes
      SET title = ?, content = ?, updated_at = ?
      WHERE id = ?
    `,
    [title, content, Date.now(), id]
  );
};

// DELETE
export const deleteNote = (id) => {
  db.runSync(
    `
      DELETE FROM notes
      WHERE id = ?
    `,
    [id]
  );
};