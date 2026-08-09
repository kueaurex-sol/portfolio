import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "kueaurex";

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Add it to .env.local (see .env.example)."
  );
}

// Same reason as any Next.js + DB-driver pairing: hot-reload in dev
// re-runs this module on every save, and without caching the connection
// on `global` (which survives the reload), you'd open a new connection
// pool each time. Model registration has the same problem — see
// models/Submission.js's `models.Submission ||` guard.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { dbName }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}