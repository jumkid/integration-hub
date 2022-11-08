import fs from "fs";
import * as C from "../App.constants";
import path from 'path';

/**
 * Reads the service version from the manifest (package.json)
 * @return {string} The application version
 */
const readVersion = () => {
    const manifestPath = path.resolve( './package-lock.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath).toString());
    return manifest.version;
}

function HealthCheckController (req:any, res:any, next:any) {
    if (process.env.HEARTBEAT_ENABLED) {
        fs.stat(process.env.HEARTBEAT_FILE!, function (err, stats){
            if (err) {
                res.status(404).end();
            } else {
                res.set('Expires', 0)
                    .set('Cache-Control', 'no-store, no-cache, must-revalidate')
                    .set('Pragma', 'no-cache').set(C.X_SERVICE_VERSION_HEADER, readVersion())
                    .set('Content-Type', 'text/plain')
                    .end('My heart is beating');
            }
        })
    } else {
        res.set('Content-Type', 'text/plain').end('Heartbeat is disabled');
    }
}

export default HealthCheckController;
