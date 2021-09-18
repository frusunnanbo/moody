const jest = require("jest");

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

function runTests() {
  const projectRootPath = ".";

  return jest.runCLI({ colors: false }, [projectRootPath]).then((result) => {
    if (result.results.success) {
      console.log(`Tests completed`);
    } else {
      console.error(`Tests failed`);
    }
    return filterResults(result.results);
  });
}

module.exports = {
  runTests,
};
