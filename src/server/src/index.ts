import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { createViteServer } from "./middlewares/vite";
import { listenServer } from "./middlewares/listen";
import { koaResult } from "@app/result";
import { LOCALS } from "@app/i18n/locals";
import { koaI18n } from "@app/i18n/koa";
import { ERROR_CODES } from "./constants/ErrorCode";

// create koa app
export const app = new Koa();

// parse body
app.use(bodyParser());

// i18n
app.use(koaI18n());

// response middleware
app.use(
  koaResult({
    i18n: {
      locales: LOCALS,
    },
    mapping: ERROR_CODES,
  })
);

// vite
createViteServer(app);

// listen
listenServer(app);
