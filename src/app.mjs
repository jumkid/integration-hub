import express from 'express';
import Logger from './logging/logger.mjs';
import requestErrorHandler from "./exception/request-error-handler.mjs";
import healthCheckController from "./controller/health-check-controller.mjs";

const app = express();

const App = {

    getApp() {
      return app;
    },

    init: () => {
        console.log("running integration hub application ...");

        try {
            //set global exception handler
            app.use(requestErrorHandler);

            //set health check endpoint
            app.use('/health', healthCheckController);

        } catch (err) {
            Logger.error("application initiate with error: ", err);
        }

        return app;
    }

};

export default App;
