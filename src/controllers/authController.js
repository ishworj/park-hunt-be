import { oauth2client } from "../config/googleConfig.js";
import axios from "axios";
import { createNewUser, findByEmail } from "../models/UserModel.js";
import { jwtSign } from "../utils/jwt.js";

export const googleLogin = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code is missing." });
    }

    // Exchange authorization code for tokens
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    // Fetch user information from Google
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const { email, name } = userInfoResponse.data;
    let user = await findByEmail(email);
    if (!user) {
      user = await createNewUser({ email, name });
    }
    const { _id } = user;
    const token = jwtSign({ _id, email });

    return res.status(200).json({
      message: "Google login successful",
      user,
      token,
    });
  } catch (error) {
    next({
      message: "Error while loggin with google",
      errorMessage: error.message,
    });
  }
};
