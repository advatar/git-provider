var apiSpec = require("./api_spec_constructor")
  , TEST_USERNAME = "mikedeboertest"
  , TEST_PASSWORD = "test1324";

describe("GitHub API", function(){
  this.timeout(30000);
  apiSpec("github", {
      username: process.env.GITHUB_USERNAME || TEST_USERNAME
    , password: process.env.GITHUB_PASSWORD || TEST_PASSWORD
  })();
});