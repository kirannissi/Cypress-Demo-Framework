const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    
    specPattern: 'cypress/**/*.feature',
    supportFile: 'cypress/e2e/support/e2e.js',




    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

    }
  },
})
