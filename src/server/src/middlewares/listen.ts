import { IS_PRODUCTION } from "@/constants/index";
import { Express } from "express";

export function listen(app: Express) {
  if (IS_PRODUCTION) {
    app.listen(Number(import.meta.env.VITE_PORT) || 5000, () => {
      console.log(
        `Server running at http://localhost:${
          Number(import.meta.env.VITE_PORT) || 5000
        }`
      );
    });
  }
  return (req, res, next) => {
    next();
  };
}
