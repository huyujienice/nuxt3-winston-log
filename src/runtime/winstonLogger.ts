import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { createLogger, format, transports } = winston;

interface LoggerOptions {
  maxSize: string;
  maxFiles: string;
  infoFileName: string;
  errorFileName: string;
}
export const getLogger = (options: LoggerOptions) => {
  const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.align(),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
  );
  const maxSize = options.maxSize;
  const maxFiles = options.maxFiles;
  const infoFileName = options.infoFileName;
  const errorFileName = options.errorFileName;

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
        filename: infoFileName,
        level: "info",
        ...defaultOptions,
      }),
      new DailyRotateFile({
        filename: errorFileName,
        level: "error",
        ...defaultOptions,
      }),
    ],
  });
  return globalLogger;
};
