class ErrorHandler extends Error {

    constructor(statusCode, description) {

        super(description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode;

        Error.captureStackTrace(this);

    }

}

export default ErrorHandler;