import express from 'express';
import helmet from 'helmet';
import logger from './logging/logger.mjs';
import requestErrorHandler from "./exception/request-error-handler.mjs";
import healthCheckController from "./controller/health-check-controller.mjs";
import activityController from "../dist/src/controller/activity-controller.mjs";

const app = express();

const setRouters = (router) => {

    const ep = '/activities/:activityId';
    router.get(ep, activityController.getActivity);
    logger.debug("added endpoint ", ep);

};

const App = {

    init: () => {
        console.log("Initiating integration hub application ...");

        try {
            //set global exception handler
            app.use(requestErrorHandler);

            app.use(helmet());
            app.use(helmet.xssFilter());
            app.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    mediaSrc: ["'self'"],
                    childSrc: ["'self'"],
                    objectSrc:["'self'"]
                },
                reportOnly: false,
                setAllHeaders: false,
                safari5: false
            }));

            //set health check endpoint
            logger.debug("add health check endpoint");
            app.use('/health', healthCheckController);

            /* TODO AUTHENTICATION */
            const router = express.Router();
            // all of the routes will be prefixed with int
            logger.debug("add /int prefix to all endpoints");
            app.use('/int', (req, res, next) => { next(); }, router);

            setRouters(router);

        } catch (err) {
            logger.error("application initiate with error: ", err);
        }

        return app;
    }

};

export default App;
