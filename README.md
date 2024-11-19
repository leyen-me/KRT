# KRT

`Koa-React-TypeScript` (KRT) is a full-stack development framework based on PNPM package management. It uses the same dependencies, languages, and ports to build modern Web applications.


## Install all dependencies

Execute the following command in the project root directory to install all dependencies:

```sh
pnpm i
```

## Init DataBase

```sh
cd src/server
pnpm db:generate
pnpm db:migrate
```

## Start the development environment

During development, you can start the local development server with the following command to preview the frontend and backend functions in real time:

```sh
pnpm dev
```

## Production environment build

Build the files required for the production environment, optimize performance, and prepare for deployment:

```sh
pnpm build
```

## Production environment build preview

After the build is complete, you can use the following command to start the production environment and preview the application:

```sh
pnpm start
```

## Install client dependencies

If you only want to install the client-related dependencies, you can use the following command:

```sh
pnpm --filter client install package-name
```

## Install server dependencies

If you only want to install the server-related dependencies, you can execute the following command:

```sh
pnpm --filter server install package-name
```

## Install development dependencies for all sub-projects

If you want to install the development dependencies for all sub-projects, you can use the following command:

```sh
pnpm -r install typescript -D
```

## Deployment

We highly recommend deploying the entire service to `dokploy`, which is easy to install and have CICD. It is the best choice for deployment.

## Contribution

Welcome any form of contribution! If you have good ideas or find problems, please submit **Issue** or **Pull Request**.