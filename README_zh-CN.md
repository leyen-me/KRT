简体中文 | [English](./README.md)

# KRT

`Koa-React-TypeScript`（KRT）是一个基于 PNPM 包管理的全栈开发框架。它使用相同的依赖、语言和端口来构建现代 Web 应用程序。

## 安装所有依赖

在项目根目录执行以下命令以安装所有依赖：

```sh
pnpm i
```

## 初始化数据库

```sh
cd src/server
pnpm db:generate
pnpm db:migrate
```

## 启动开发环境

在开发过程中，您可以使用以下命令启动本地开发服务器，以实时预览前端和后端功能：

```sh
pnpm dev
```

## 生产环境构建

构建生产环境所需的文件，优化性能并准备部署：

```sh
pnpm build
```

## 生产环境构建预览

构建完成后，您可以使用以下命令启动生产环境并预览应用程序：

```sh
pnpm start
```

## 安装客户端依赖

如果您只想安装客户端相关的依赖，可以使用以下命令：

```sh
pnpm --filter client install package-name
```

## 安装服务器依赖

如果您只想安装服务器相关的依赖，可以执行以下命令：

```sh
pnpm --filter server install package-name
```

## 安装所有子项目的开发依赖

如果您想安装所有子项目的开发依赖，可以使用以下命令：

```sh
pnpm -r install typescript -D
```

## 部署

我们强烈推荐将整个服务部署到 `dokploy`，它易于安装并且支持 CICD，是最佳的部署选择。

## 贡献

欢迎任何形式的贡献！如果您有好的想法或发现问题，请提交 **Issue** 或 **Pull Request**。