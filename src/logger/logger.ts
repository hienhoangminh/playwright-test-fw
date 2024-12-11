import * as winston from "winston";
import colors from "@colors/colors";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });
// Define custom format
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  let colorizedMessage = message;
  switch (level) {
    case "error":
      colorizedMessage = colors.red(message as string);
      break;
    case "warn":
      colorizedMessage = colors.yellow(message as string);
      break;
    case "info":
      colorizedMessage = colors.blue(message as string);
      break;
    default:
      colorizedMessage = colors.grey(message as string);
      break;
  }
  return `${timestamp} - ${level} : ${colorizedMessage}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    // combine existing format of Winston with custom format
    winston.format.timestamp(),
    winston.format.simple(),
    myFormat
  ),
  transports: [
    // A transport is essentially a storage device for your logs. Each winston logger can have multiple transports
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/automation.log",
    }),
  ],
});
