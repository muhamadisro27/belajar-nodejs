import winston from "winston";
import * as fs from "node:fs";


// try {
//   const dirname = "./src/logs";
  
//   if (!fs.existsSync(dirname)) {
//     fs.mkdirSync(dirname);
//   }
// } catch (err) {
//   console.error(err);
// }

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
