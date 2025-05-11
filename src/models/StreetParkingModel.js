import mongoose from "mongoose";

const StreetParkingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Free",
        "Paid",
        "Permit Only",
        "Time-Limited",
        "No Parking",
        "Disabled",
        "Unrestricted",
        "Loading Zone",
        "Other",
      ],
    },

    time: {
      type: String,
      required: true,
      trim: true,
      // e.g., "Mon–Fri 08:00–18:00", "All days 6 PM – 8:30 AM", "24/7"
    },

    location: {
      type: {
        type: String,
        enum: ["LineString"],
        required: true,
      },
      coordinates: {
        type: [[Number]], // [[lng, lat], [lng, lat], ...]
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
    },

    availability: {
      type: String,
      trim: true,
      required: true,
      // e.g., "Weekdays only", "Nights only", "All day", "Custom schedule"
    },

    price: {
      type: Number,
      default: 0, // Free by default
    },

    currency: {
      type: String,
      default: "AUD",
    },

    spaces: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      // Extra info: “2min pickup allowed”, “Mail trucks only”, etc.
    },

    // addedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },r

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

StreetParkingSchema.index({ location: "2dsphere" });

const StreetParkingLine = mongoose.model("StreetParking", StreetParkingSchema);


export const createNewStreetLineDB = (obj) => {
  return StreetParkingLine(obj).save();
};
