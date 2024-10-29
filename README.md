## Installation

Install the package globally:

```bash
npm install -g kklo-react-ts-template
```

## Usage

## First

Create project with vite:

```bash
npm create vite@latest my-project
cd my-project
npm i
```

Then, run the following command:

```bash
npx init-project
```

It will create a new project with the following structure:

```
my-project
├── src
│   ├── assets
│   │   └── ...
│   ├── components
│   │   ├── layout
│   │   │   └── DashboardLayout.tsx
│   │   └── pages
│   │       └── ErrorPage.tsx
│   ├── configs
│   │   ├── api.ts
│   │   ├── queryKeys.ts
│   │   └── routes.ts
│   ├── hooks
│   │   └── useParamHelper.ts
│   ├── pages
│   │   └── ...
│   ├── services
│   │   └── user.service.ts
│   ├── stores
│   │   └── ...
│   └── types.d.ts
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

And will install the following packages:

- axios
- react-router-dom
- @tanstack/react-query
- @types/node
- @vitejs/plugin-react

## Second

Run the following command:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## License

MIT
