import { MicroFrontend } from '../models/microfrontend.model'

export const microFrontends: MicroFrontend[] = [
  {
    baseUrl: 'ui',
    moduleName: 'AppRemoteModule',
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    remoteName: 'dzikimundialUi',
    exposedModule: './Module',
  },
  {
    baseUrl: 'admin',
    moduleName: 'AppRemoteModule',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    remoteName: 'dzikimundialAdminUi',
    exposedModule: './Module',
  },
]
