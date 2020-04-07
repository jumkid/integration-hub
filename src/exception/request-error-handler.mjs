import Logger from '../logging/logger.mjs';
import CommonErrorResponse from "./common-error-response.mjs";

const RequestErrorHandler = (error, req, res) => {

    Logger.error("catch request exception", error.stack);

    new CommonErrorResponse(false, error.code, error.message, error.total)
        .write(res);

};

export default RequestErrorHandler;
