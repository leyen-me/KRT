# Demo-Express-React

`Demo-Express-React` 是一个全栈项目，旨在展示如何使用相同的依赖、语言和端口来构建现代 Web 应用。该项目采用以下技术栈：

- **前端**：React
- **后端**：Express
- **语言**：TypeScript
- **包管理器**：Pnpm

## 技术栈

- **React**：构建现代响应式前端应用
- **Express**：快速且灵活的 Web 应用框架，用于搭建服务端
- **TypeScript**：增强 JavaScript 的类型系统，提升开发体验
- **Pnpm**：高效的包管理工具，优化依赖管理和构建速度

## 安装所有依赖

在项目根目录下执行以下命令安装所有依赖：

```sh
pnpm i
```

## 启动开发环境

在开发过程中，可以通过以下命令启动本地开发服务器，实时预览前后端功能：

```sh
pnpm dev
```

## 生产环境构建

构建生产环境所需的文件，优化性能并准备好部署：

```sh
pnpm build
```

## 生产环境构建预览

在构建完成后，你可以使用以下命令启动生产环境并预览应用：

```sh
pnpm start
```

## 安装客户端依赖

如果你只想安装客户端相关的依赖，可以使用以下命令：

```sh
pnpm --filter client install package-name
```

## 安装服务端依赖

如果你只需要安装服务端相关的依赖，可以执行以下命令：

```sh
pnpm --filter server install package-name
```

## 在所有项目中安装开发依赖

如果你希望为所有子项目安装开发依赖，可以使用以下命令：

```sh
pnpm -r install typescript -D
```

## 部署

我们非常推荐将整个服务部署到`dokploy`上，dokploy安装使用简单，自带CICD。是部署的最佳选择

## 贡献

欢迎任何形式的贡献！如果你有好的想法或发现了问题，欢迎提交 **Issue** 或 **Pull Request**。