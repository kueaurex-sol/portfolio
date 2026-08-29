import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const SubmissionSchema = new Schema(
  {
    type: { type: String, enum: ["contact", "audit"], required: true },

    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
    },
    status: { type: String, enum: ["new", "read", "archived"], default: "new" },

    // "contact" mode only
    subject: { type: String, trim: true, maxlength: 200 },
    message: {
      type: String,
      trim: true,
      maxlength: 5000,
      minlength: [10, "Add a little more detail to your message (10+ characters)."],
      required: [
        function () {
          return this.type === "contact";
        },
        "Add a little more detail to your message (10+ characters).",
      ],
    },
    scheduleCall: { type: Boolean, default: false },

    // shared by "contact" (when scheduleCall is true)
    phone: { type: String, trim: true, maxlength: 40 },
    notes: { type: String, trim: true, maxlength: 2000 },
    preferredDate: {
      type: String,
      required: [
        function () {
          return this.type === "contact" && this.scheduleCall;
        },
        "Pick a date for the call.",
      ],
    },
    preferredTime: {
      type: String,
      required: [
        function () {
          return this.type === "contact" && this.scheduleCall;
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
    interactionType: { type: String, enum: ["report", "meeting", "both"] },
    contactMethod: { type: String, enum: ["whatsapp", "email", "both"] },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export default models.Submission || model("Submission", SubmissionSchema);