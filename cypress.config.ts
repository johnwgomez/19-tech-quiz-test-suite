import { defineConfig } from 'cypress'
import viteConfig from './client/vite.config'

export default defineConfig({
  component: {
    // point at your client index.html for component tests
    indexHtmlFile: 'cypress/support/component-index.html',

    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        ...viteConfig,
        // tell Vite to serve from the client folder
        root: 'client',
      },
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
})