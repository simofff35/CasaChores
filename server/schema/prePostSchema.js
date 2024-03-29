const mongoose = require("mongoose");

const prePostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  step0: {
    city: {
      type: String,
      required: true,
    },
    adresse: { type: String, required: false },
    phone: { type: String, required: false },
    hiddenPhone: { type: Boolean, required: true, default: false },
  },

  step1: {
    mainCat: {
      type: String,
      required: false,
    },
    subCat: {
      type: String,
      required: false,
    },
    subCat1: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },

  step2: {
    favIndex: Number,
    imgUrl: [
      {
        type: String,
        required: true,
      },
    ],
  },
});

module.exports = mongoose.model("PrePost", prePostSchema);
