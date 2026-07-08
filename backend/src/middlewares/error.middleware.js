
const globalErrorHandler = (err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const status =    err.status || 'error';
    
    res.status(statusCode).json({
        success: false,
        message: err.message,
        status: status,
        statusCode : statusCode,
        code: err.code || "INTERNAL_SERVER_ERROR",
        errors: err.errors || [],
        stack : err.stack
    });
};

export default globalErrorHandler;