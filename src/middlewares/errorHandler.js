export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "no error message provided"; // customize message
  const errorMessage = err.errorMessage || "Internal server error !!!"; // message for developer

  if (errorMessage.includes("E11000")) {
    (statusCode = 400), (message = "user already present !");
  }

  return res.status(statusCode).send({
    status: "error",
    message,
    errorMessage,
  });
};
