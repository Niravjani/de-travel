import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String
      
    },
    tourname: {
      type: String,
      required: true,

    },
    fullname: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingAt: {
      type: Date,
     
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
