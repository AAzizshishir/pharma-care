export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 400;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map