import Conf from "../config/server-conf.mjs";
import fs from "fs";
import * as C from "../util/constants.mjs";
import path from 'path';

/**
 * Reads the service version from the manifest (package.json)
 * @return {string} The application version
 */
function readVersion() {
    const manifestPath = path.resolve(__dirname + '/../../package.json');
    const manifest = require(manifestPath);
    return manifest.version;
};

const HealthCheckController = (req, res) => {
    if (Conf.heartbeat.enabled) {
        fs.stat(Conf.heartbeat.filePath, function (err, stats){
            if (err) {
                res.status(404).end();
            } else {
                res.set('Expires', 0)
                    .set('Cache-Control', 'no-store, no-cache, must-revalidate')
                    .set('Pragma', 'no-cache').set(C.X_SERVICE_VERSION_HEADER, readVersion())
                    .set('Content-Type', 'text/plain')
                    .end('OK');
            }
        })
    }else{
        res.set('Content-Type', 'text/plain').end('Heartbeat is disabled');
    }
};

export default HealthCheckController;
