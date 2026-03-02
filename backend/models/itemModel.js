const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name for the item"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Please add the date when the item was lost or found"],
    },
    location: {
      type: String,
      required: [true, "Please add the location where the item was lost or found"],
    },
    status: {
      type: String,
      enum: ["open", "claimed", "resolved"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
