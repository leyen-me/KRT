import express from "express";

import { cors } from "./middlewares/cors";
import { env } from "./middlewares/env";
import { vite } from "./middlewares/vite";
import { result } from "./middlewares/result";
import { listen } from "./middlewares/listen";

let app = express();

// 加载环境变量
app.use(env(app));

// 让接口可以跨域，全栈项目，默认关闭
app.use(cors(app));

// 统一响应格式
app.use(result(app));

// 启动Vite服务, 加载路由
app.use(vite(app));

// 监听端口
app.use(listen(app));