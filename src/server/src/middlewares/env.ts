import { Express } from "express";
import dotenv from "dotenv";

// The lower the priority, the higher the priority
export function env(app: Express) {
  // Load the env file first
  dotenv.config({ path: `.env` });
  // Load the env file based on the NODE_ENV
  dotenv.config({ path: `.env.${process.env.NODE_ENV}`, override: true });
  
  return (req, res, next) => {
    next();
  };
}
