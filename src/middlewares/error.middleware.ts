import { ErrorRequestHandler } from "express";
import { logger } from "../loggers/winston.logger";

const errorMiddleware: ErrorRequestHandler  = (err, req, res, next) => {
  let statusCode: number = 500;
  logger.error(`[${req.method}] [${req.url}] [${err}]`);
  return res.status(statusCode).json({ error: err })
};

export default errorMiddleware;