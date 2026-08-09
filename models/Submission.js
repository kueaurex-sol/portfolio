import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const SubmissionSchema = new Schema(
  {
    type: { type: String, enum: ["message", "call"], required: true },

    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
    },
    status: { type: String, enum: ["new", "read", "archived"], default: "new" },

    // "message" mode only
    subject: { type: String, trim: true, maxlength: 200 },
    message: {
      type: String,
      trim: true,
      maxlength: 5000,
      minlength: [10, "Add a little more detail to your message (10+ characters)."],
      required: [
        function () {
          return this.type === "message";
        },
        "Add a little more detail to your message (10+ characters).",
      ],
    },

    // "call" mode only
    phone: { type: String, trim: true, maxlength: 40 },
    notes: { type: String, trim: true, maxlength: 2000 },
    preferredDate: {
      type: String, // raw "YYYY-MM-DD" as picked, kept for display
      required: [
        function () {
          return this.type === "call";
        },
        "Pick a date for the call.",
      ],
    },
    preferredTime: {
      type: String, // raw "HH:MM" as picked, kept for display
      required: [
        function () {
          return this.type === "call";
        },
        "Pick a time for the call.",
      ],
    },
    scheduledFor: { type: Date }, // combined date+time, for sorting/reminders
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

// `models.Submission ||` avoids "Cannot overwrite `Submission` model once
// compiled" on every hot-reload in dev, where this module re-runs but the
// mongoose connection (and its registered models) survives via `global`.
export default models.Submission || model("Submission", SubmissionSchema);