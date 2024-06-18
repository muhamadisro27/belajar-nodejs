import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      filename: "infos.log",
      dirname : "./src/logs"
    }),
    new winston.transports.File({
      level: "error",
      filename: "errors.log",
      dirname : "./src/logs"
    }),
  ],
});

export { logger };
