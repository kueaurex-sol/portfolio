// import mongoose from "mongoose";

// const { Schema, models, model } = mongoose;

// const SubmissionSchema = new Schema(
//   {
//     type: { type: String, enum: ["message", "call"], required: true },

//     name: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       maxlength: 200,
//       match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
//     },
//     status: { type: String, enum: ["new", "read", "archived"], default: "new" },

//     // "message" mode only
//     subject: { type: String, trim: true, maxlength: 200 },
//     message: {
//       type: String,
//       trim: true,
//       maxlength: 5000,
//       minlength: [10, "Add a little more detail to your message (10+ characters)."],
//       required: [
//         function () {
//           return this.type === "message";
//         },
//         "Add a little more detail to your message (10+ characters).",
//       ],
//     },

//     // "call" mode only
//     phone: { type: String, trim: true, maxlength: 40 },
//     notes: { type: String, trim: true, maxlength: 2000 },
//     preferredDate: {
//       type: String, // raw "YYYY-MM-DD" as picked, kept for display
//       required: [
//         function () {
//           return this.type === "call";
//         },
//         "Pick a date for the call.",
//       ],
//     },
//     preferredTime: {
//       type: String, // raw "HH:MM" as picked, kept for display
//       required: [
//         function () {
//           return this.type === "call";
//         },
//         "Pick a time for the call.",
//       ],
//     },
//     scheduledFor: { type: Date }, // combined date+time, for sorting/reminders
//   },
//   { timestamps: { createdAt: "createdAt", updatedAt: false } }
// );

// // `models.Submission ||` avoids "Cannot overwrite `Submission` model once
// // compiled" on every hot-reload in dev, where this module re-runs but the
// // mongoose connection (and its registered models) survives via `global`.
// export default models.Submission || model("Submission", SubmissionSchema);
import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const SubmissionSchema = new Schema(
  {
    type: { type: String, enum: ["message", "call", "audit"], required: true },

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
      type: String,
      required: [
        function () {
          return this.type === "call";
        },
        "Pick a date for the call.",
      ],
    },
    preferredTime: {
      type: String,
      required: [
        function () {
          return this.type === "call";
        },
        "Pick a time for the call.",
      ],
    },
    scheduledFor: { type: Date },

    // "audit" mode only
    companyName: {
      type: String,
      trim: true,
      maxlength: 200,
      required: [
        function () {
          return this.type === "audit";
        },
        "Enter your company name.",
      ],
    },
    repName: { type: String, trim: true, maxlength: 200 },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 200,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid company email address."],
    },
    altPhone: { type: String, trim: true, maxlength: 40 },
    productLink: {
      type: String,
      trim: true,
      maxlength: 500,
      required: [
        function () {
          return this.type === "audit";
        },
        "Add a link to the website, app, or product.",
      ],
    },
    issue: {
      type: String,
      trim: true,
      maxlength: 3000,
      minlength: [10, "Describe the issue in a bit more detail (10+ characters)."],
      required: [
        function () {
          return this.type === "audit";
        },
        "Describe the current issue with the product.",
      ],
    },
    directions: { type: String, trim: true, maxlength: 2000 },
    interactionType: { type: String, enum: ["report", "meeting"] },
    contactMethod: { type: String, enum: ["whatsapp", "email"] },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export default models.Submission || model("Submission", SubmissionSchema);