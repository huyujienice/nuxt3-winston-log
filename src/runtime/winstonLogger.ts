import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { createLogger, format, transports } = winston;
import path from "path";

interface LoggerOptions {
  maxSize: string;
  maxFiles: string;
  infoLogPath: string;
  infoLogName: string;
  errorLogPath: string;
  errorLogName: string;
}
export const getLogger = (options: LoggerOptions) => {
  const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
  );
  const maxSize = options.maxSize;
  const maxFiles = options.maxFiles;
  const fullInfoPath = path.join(options.infoLogPath, options.infoLogName);
  const fullerrorPath = path.join(options.errorLogPath, options.errorLogName);

  // console.log(`maxSize=${maxSize}`);
  // console.log(`maxFiles=${maxFiles}`);
  // console.log(`fullInfoPath=${fullInfoPath}`);
  // console.log(`fullerrorPath=${fullerrorPath}`);

  const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize,
    maxFiles,
  };
  const globalLogger = createLogger({
    format: customFormat,
    transports: [
      new DailyRotateFile({
        filename: fullInfoPath,
        level: "info",
        ...defaultOptions,
      }),
      new DailyRotateFile({
        filename: fullerrorPath,
        level: "error",
        ...defaultOptions,
      }),
    ],
  });
  return globalLogger;
};
