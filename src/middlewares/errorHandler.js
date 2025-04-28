export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "no error message provided"; // customize message
  const errorMessage = err.errorMessage || "Internal server error !!!"; // message for developer

  if (message.includes("E11000")) {
    (statusCode = 400), (message = "DUPLICATE USER !");
  }

  return res.status(statusCode).send({
    status: "error",
    message,
    errorMessage,
  });
};
