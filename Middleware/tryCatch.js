const tryCatchMiddleware = (trycatchhandler) => async (req, res, next) => {
  try {
    await trycatchhandler(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      message: "error",
      error_message: error.message,
    });
  }
};

module.exports = tryCatchMiddleware;
