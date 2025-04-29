import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique:true
  },
});

const UserModel = mongoose.model("user", UserSchema);

export const findByEmail = (email) => {
  return UserModel.findOne({ email });
};

export const createNewUser = (newuser) => {
  return UserModel(newuser).save();
};
