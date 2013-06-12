var apiSpec = require("./api_spec_constructor")
  , path = require("path")
  , temp = require('temp');
require('shelljs/global');

var REPO_DIR_PATH = null;
var USER_NAME = "localGitUser";

xdescribe("gitteh", function(){
  this.timeout(300);
  before(function(done){
    temp.mkdir('git-provider-gitteh-test', function(err, repoDirPath) {
      REPO_DIR_PATH = repoDirPath;
      if (!which('git')) return done("need git to run tests");
      console.error("using", REPO_DIR_PATH);
      cd(REPO_DIR_PATH);
      mkdir(USER_NAME);
      cd(USER_NAME);
      exec("git clone git://github.com/mikedeboertest/node-slug.git");
      done();
    });
  });


  apiSpec("gitteg", {
      username: USER_NAME
    , baseReposPath: REPO_DIR_PATH
  })();


  after(function(done){
    rm('-rf', REPO_DIR_PATH);
    done();
  });

});