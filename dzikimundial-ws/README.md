# DzikimundialWs

This project was generated using [Nx](https://nx.dev).

## Node version

node v14.16.0

## Webpack version

webpack v5.50.0

## How to serve?

You can serve application using command: nx run ${projectName}:serve e.g. nx run dzikimundial-ui:serve

## How to create new library?

nx g @nrwl/angular:library ${libraryName} and

## How to create new component?

nx g @nrwl/angular:component --project=${applicationName || libraryName} ${componentName}

## How to add storybook configuration?

nx g @nrwl/angular:storybook-configuration ${applicationName || librabryName}

## How to run storybook?

You can run each storybook configuration using command: nx run ${projectName}:storybook e.g. nx run ui-nav-link:storybook

## Known errors

1. If you run into error: `TypeError: The 'compilation' argument must be an instance of Compilation` while serving an application, you should remove node_modules and package-lock.json

