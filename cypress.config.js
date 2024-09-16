const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const path = require('path');
const AccessibilityReportGenerator = require('./cypress/utils/AccessibilityReportGenerator');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    table(data) {
      console.table(data);
      return null;
    },
    generateAccessibilityReport({ violations, screenshotName }) {
      const reportPath = path.resolve(`cypress/reports/accessibility-report-${new Date().getTime()}.html`);

      const reportGenerator = new AccessibilityReportGenerator(violations, screenshotName);
      const savedReportPath = reportGenerator.saveReport(reportPath);

      return `Report generated at: ${savedReportPath}`;
    }
  });

  return config;
}

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  defaultCommandTimeout: 8000,
  chromeWebSecurity: false,
  video: false,

  e2e: {
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
});