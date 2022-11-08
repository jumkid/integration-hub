import logger from '../logging/logger.ts';
import CommonErrorResponse from "./common-error-response.mjs";

const RequestErrorHandler = (req, res, next) => {
    if (req.statusCode) {
        logger.error("catch request exception", req.stack);
        new CommonErrorResponse(false, req.statusCode, req.statusMessage, req.total)
            .write(res);
    }
    next();
};

export default RequestErrorHandler;
