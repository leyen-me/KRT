import express, { json } from "express";

import { cors } from "./middlewares/cors";
import { vite } from "./middlewares/vite";
import { result } from "./middlewares/result";
import { listen } from "./middlewares/listen";

export const app = express();

// 让接口可以跨域，全栈项目，默认关闭
app.use(cors(app));

// 统一响应格式
app.use(result(app));

// 解析 JSON 格式的请求体
app.use(json());

// 启动Vite服务, 加载路由
app.use(vite(app));

// 监听端口
app.use(listen(app));
