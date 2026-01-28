const reviewSchema = new mongoose.Schema(
  {
    tourId: {  // Changed from productId to tourId
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    userId: {  // Better than username as it references the User model
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {  // Keep this if you want to display names easily
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

import mongoose from "mongoose";
const Review = mongoose.model("Review", reviewSchema);

export default Review;