import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    time: {
      type: String,
      required: [true, "Time is required"]
    },
    people: {
      type: Number,
      required: [true, "Number of people is required"],
      min: [1, "At least 1 person is required"]
    }
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
