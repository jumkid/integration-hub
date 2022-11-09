import express, { Router } from 'express';
import helmet from 'helmet';
import logger from './logging/logger';
import createError from 'http-errors';
import healthCheckController from './controller/HealthCheckController';
import vehicleVinController from './controller/VehicleVinController';

const setRouters = (router:Router) => {
    router.get('/health', healthCheckController);
    router.get('/vehicle/vin/decode/:vin', vehicleVinController.vinDecode);
};

const App = {

    init: () => {
        const app = express();

        app.set('appName', process.env.SERVICE_NAME);

        console.log("Initiating integration-hub application ...");

        try {
            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));

            app.use(helmet());
            app.use(helmet.xssFilter());
            app.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:"],
                    connectSrc: ["'self'", 'http://localhost', 'https://localhost', 'https://api.jumkid.com'],
                    fontSrc: ["'self'"],
                    mediaSrc: ["'self'"],
                    childSrc: ["'self'"],
                    objectSrc:["'self'"]
                },
                reportOnly: false
            }));

            const router = express.Router();
            setRouters(router);
            // all of the routes will be prefixed with api
            logger.debug("add /int prefix to all endpoints");
            app.use('/int', (req, res, next) => { next(); }, router);

            // catch 404 and forward to error handler
            app.use((req, res, next) => {
                next(createError(404));
            });

        } catch (err) {
            logger.error("application initiate with error: ", err);
        }

        return app;
    }
}

export default App;
