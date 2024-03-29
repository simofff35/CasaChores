const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  birth: {
    type: Date,
    required: true,
  },

  dateRegister: {
    type: Date,
    default: Date.now(),
  },
  pfpLink: {
    type: String,
    default: "http://localhost:3001/uploads/pfp/default.png",
  },
  seller: {
    type: Boolean,
    default: false,
    required: true,
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
    ref: "Seller",
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          comment: {
            type: String,
            default: Date.now(),
            required: true,
          },
          date: { type: Date, required: true },
        },
      ],
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
        required: true,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          comment: {
            type: String,
            default: Date.now(),
            required: true,
          },
          date: { type: Date, required: true },
        },
      ],
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  userRating: {
    type: Number,
    default: 0,
    required: true,
  },
  settings: {
    notifications: {
      messages: {
        type: Boolean,
        default: true,
      },
      rating: {
        type: Boolean,
        default: true,
      },
      offers: {
        type: Boolean,
        default: true,
      },
      updates: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: true,
      },
      others: {
        type: Boolean,
        default: true,
      },
    },
    emailNotifications: {
      suggestions: {
        type: Boolean,
        default: true,
      },
      rating: {
        type: Boolean,
        default: true,
      },
      recommandations: {
        type: Boolean,
        default: true,
      },
      updates: {
        type: Boolean,
        default: true,
      },
      offres: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: true,
      },
      others: {
        type: Boolean,
        default: true,
      },
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("remove", async function (next) {
  await Seller.deleteOne({ userId: this._id });
  next();
});

userSchema.pre("save", async function (next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    this.userRating = totalRating / this.reviews.length;
  } else {
    this.userRating = 0;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
