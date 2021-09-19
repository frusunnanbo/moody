const jest = require("jest");

let cache = {
  status: "pending"
}

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

function start(url) {
  process.env.BASE_URL = url;
  return jest.runCLI({}, ["."]).then((result) => {
    cache = filterResults(result.results);
    setTimeout(() => start(url), 1000);
  });
}

function getStatus() {
  return cache;
}

module.exports = {
  start,
  getStatus
};
