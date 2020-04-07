import https from 'https';
import Conf from "./src/config/server-conf.mjs";
import App from './src/app.mjs';
import Logger from './src/logging/logger.mjs';
import fs from 'fs';

const app = App.init();

//http listener
if (Conf.noneSslEnabled) {
    app.listen(Conf.noneSslPort);
    Logger.info('Server running on port ' + Conf.noneSslPort );
}

if (Conf.sslEnabled) {
    const server = https.createServer({
        key: fs.readFileSync(Conf.keyFilePath.value),
        cert: fs.readFileSync(Conf.certFilePath.value),
        passphrase: Conf.passphrase
    }, app);

    server.listen(Conf.sslPort);

    Logger.info('Server running on port ' + server.address().port );
}