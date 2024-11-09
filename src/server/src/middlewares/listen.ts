import { Express } from "express";

export function listen(app: Express) {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  return (req, res, next) => {
    next();
  };
}
