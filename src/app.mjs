import express from 'express';
import Logger from './logging/logger.mjs';
import RequestErrorHandler from "./exception/request-error-handler.mjs";
import healthCheckController from "./controller/health-check-controller.mjs";

const App = {

    init: () => {
        console.log("running integration hub application ...");

        const app = express();

        try {
            //set global exception handler
            app.use(RequestErrorHandler);

            app.use('/health', healthCheckController);

        } catch (err) {
            Logger.error("application initiate with error: ", err);
        }
    }

};

export default App;
