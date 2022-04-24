import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const DB_Initialize = require("../config/config.js");

const { development:{ jwtToken: JWT_SECRET }} = DB_Initialize;

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err: any, email: string) => {
    if (err) return res.sendStatus(403);
    req.email = email;
    next();
  });
}

module.exports = {
  notFound,
  errorHandler,
  authenticateToken,
};
