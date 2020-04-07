export default {
    sslEnabled: false,
    sslPort: 8443,

    noneSslEnabled: true,
    noneSslPort: 8080,

    logPath: "./logs/system.log",
    logLevel: "debug",

    heartbeat:{
        enabled: true,
        filePath: "./src/util/heartbeat.txt"
    },

    keyFilePath: {
        value: "./credential/key.pem"
    },

    certFilePath: {
        value: "./credential/cert.pem"
    }

}
