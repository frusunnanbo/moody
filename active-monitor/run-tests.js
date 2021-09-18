const jest = require("jest");

const defaultUrl = "https://moody.frusunnanbo.se";

function filterTestResult(jestTestResult) {
  return {
    fullName: jestTestResult.fullName,
    status: jestTestResult.status,
  };
}

function filterFileTestResults(jestFileTestResult) {
  return jestFileTestResult.testResults.map(filterTestResult);
}

function filterResults(jestResult) {
  return {
    success: jestResult.success,
    testResults: jestResult.testResults.map(filterFileTestResults).flat(),
  };
}

function runTests(url) {
  process.env.BASE_URL = url || defaultUrl;
  return jest.runCLI({}, ["."]).then((result) => {
    return filterResults(result.results);
  });
}

module.exports = {
  runTests,
};
