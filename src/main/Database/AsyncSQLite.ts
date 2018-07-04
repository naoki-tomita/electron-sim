import { Database, OPEN_READWRITE, OPEN_CREATE } from "sqlite3";

let db: Database;

export async function createDatabase(path: string) {
  return new Promise((ok, ng) => {
    db = new Database(path, OPEN_CREATE | OPEN_READWRITE, err => {
      if (err) return ng(err);
      ok();
    });
  });
}

export function check() {
  if (!db) {
    throw new Error("Database does not initialized yet.");
  }
}

export function close() {
  check();
  db.close();
}

export async function run(sql: string, params?: string[]) {
  check();
  return new Promise((ok, ng) => {
    db.run(sql, params, err => {
      if (err) return ng(err);
      ok();
    });
  });
}

export async function exec(sql: string) {
  check();
  return new Promise((ok, ng) => {
    db.exec(sql, err => {
      if (err) return ng(err);
      ok();
    });
  });
}

export async function get(sql: string, params?: string[]) {
  check();
  return new Promise<any>((ok, ng) => {
    db.get(sql, params, (err, row) => {
      if (err) return ng(err);
      ok(row);
    });
  });
}

export async function all(sql: string, params?: string[]) {
  check();
  return new Promise<any[]>((ok, ng) => {
    db.all(sql, params, (err, rows) => {
      if (err) return ng(err);
      ok(rows);
    });
  });
}
