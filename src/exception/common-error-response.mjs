class CommonErrorResponse {

    constructor(success, errorCode, message, total) {
        this.success = success || false;
        this.errorCode = errorCode || 0;
        this.message = message;
        this.total = total || 0;
    }

    setSuccess(success) {
        this.success = success;
    }

    setErrorCode(errorCode) {
        this.errorCode = errorCode;
    }

    setMessage(message) {
        this.message = message;
    }

    setTotal(total) {
        this.total = total;
    }

    write(response) {
        response.json({
            success: this.success,
            errorCode: this.errorCode,
            error: this.message ? String(this.message) : null,
            total: this.total
        });
        response.end();
    }

}

export default CommonErrorResponse;
