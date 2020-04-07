import Logger from '../logging/logger.mjs';
import CommonErrorResponse from "./common-error-response.mjs";

const RequestErrorHandler = (message, res, next) => {

    Logger.error("catch request exception", message.stack);

    if (message.statusCode) {
        new CommonErrorResponse(false, message.statusCode, message.statusMessage, message.total)
            .write(res);
    }
    next();
};

export default RequestErrorHandler;
