import mongoose from "mongoose";

const parkingLineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    line: {
      type: [
        {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
      ],
      validate: {
        validator: (value) => value.length === 2, // Validate that the array has exactly two items
        message: "Line must contain exactly two coordinates.",
      },
      required: true, // Ensure this field is always present
    },
  },
  {
    timestamps: true,
  }
);

const ParkingLine = mongoose.model("ParkingLine", parkingLineSchema);

export const createNewLineDB = (obj) => {
  return ParkingLine(obj).save();
};


export const getParkingLineDB = async() => {
  const data = await ParkingLine.find({},{line:1,_id:0})
 return data
};
