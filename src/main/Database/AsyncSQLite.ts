import { Database, Statement } from "sqlite3";

let db: Database;

export async function createDatabase(path: string) {
  return new Promise((ok, ng) =>
    (db = new Database(path, err => err ? ng(err) :ok())));
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
  return new Promise((ok, ng) =>
    db.exec(sql, err => err ? ng(err) : ok()));
}

export async function exec(sql: string) {
  check();
  return new Promise((ok, ng) =>
    db.exec(sql, err => err ? ng(err) : ok()));
}

export async function get<T>(sql: string, params?: string[]) {
  check();
  return new Promise<T>((ok, ng) =>
    db.get(sql, params, (err, row) => err ? ng(err) : ok(row)));
}

export async function all<T>(sql: string, params?: string[]) {
  check();
  return new Promise<T[]>((ok, ng) =>
    db.all(sql, params, (err, rows) => err ? ng(err) : ok(rows)));
}

export async function prepare(sql: string) {
  check();
  return new Promise<Statement>((ok, ng) =>
    db.prepare(sql, function(err) { err ? ng(err): ok(this) }));
}
