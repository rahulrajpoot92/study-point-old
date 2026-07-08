
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        code = "ERROR",
        isOperational = true,
        stack = ""
    ) {

        super(message);
   
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.message = message;
        this.success = false;
        this.code = code;
        this.errors = errors;
        this.isOperational = isOperational;

        
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;