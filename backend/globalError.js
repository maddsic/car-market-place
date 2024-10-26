exports.globalErrorHandler = (err, req, res, next) => {
   console.log(err.stack);

   return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message || "Internal server error",
   });
};
