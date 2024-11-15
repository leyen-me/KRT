import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { createViteServer } from "./middlewares/vite";
import { listenServer } from "./middlewares/listen";
import { responseMiddleware } from "./middlewares/result";

// Create Koa app
export const app = new Koa();

// parse body
app.use(bodyParser());

// response middleware
app.use(responseMiddleware);

// vite
createViteServer(app)

// listen
listenServer(app);
