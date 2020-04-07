import logger from '../logging/logger.mjs';
import CommonErrorResponse from "./common-error-response.mjs";

const RequestErrorHandler = (message, res, next) => {
    if (message.statusCode) {
        logger.error("catch request exception", message.stack);
        new CommonErrorResponse(false, message.statusCode, message.statusMessage, message.total)
            .write(res);
    }
    next();
};

export default RequestErrorHandler;
