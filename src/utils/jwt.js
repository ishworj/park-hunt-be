import jwt from 'jsonwebtoken'

export const jwtSign = (signData) => {
  const token = jwt.sign(signData, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
  return token;
};
