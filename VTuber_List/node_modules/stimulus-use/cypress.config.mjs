import { defineConfig } from 'cypress'

// https://docs.cypress.io/guides/references/configuration#Configuration-File
export default defineConfig({
  retries: {
    runMode: 3,
    openMode: 0
  },
  e2e: {
    baseUrl: 'http://localhost:8080'
  }
})
