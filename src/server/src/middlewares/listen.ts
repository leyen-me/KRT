import { IS_PRODUCTION } from "@/constants/index";

export function listenServer(app: any) {
  if (IS_PRODUCTION) {
    app.listen(Number(import.meta.env.VITE_PORT) || 5000, () => {
      console.log(
        `Server running at http://localhost:${
          Number(import.meta.env.VITE_PORT) || 5000
        }`
      );
    });
  }
}
