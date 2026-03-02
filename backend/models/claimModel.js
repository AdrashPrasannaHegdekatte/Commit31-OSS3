const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    claimer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proofDescription: {
      type: String,
      required: [true, "Please provide details to prove ownership or possession"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

claimSchema.index({ item: 1, claimer: 1 }, { unique: true });

module.exports = mongoose.model("Claim", claimSchema);
