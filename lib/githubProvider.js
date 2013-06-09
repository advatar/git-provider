
var Github = require("github");
module.exports = function(opts) {
  var github = new Github({
    username: opts.username,
    password: opts.password,
    auth: "basic"
  });
  var self = this;
  self.user = github.getUser();
  self.username = opts.username;
  return {
      authenticatedUser: function(callback) {
        
        self.user.show(null, function(err, userInfo) {
          callback(err, userInfo);
        });
      }
    , reposGet: function(callback) {
        
        self.user.repos(function(err, repos) {
          callback(err, repos);
        });
      }

    , reposCreate: function(repoName, callback) {
        self.user.createRepo({
          name: repoName
        }, function(err, repo) {
          callback(err,repo);
        });
      }

    , reposDelete: function(repoName, callback) {
        var repo = github.getRepo(self.username, repoName);

        repo.deleteRepo(function(err, repo) {
          callback(err, repo);
        });
      }

    , reposFork: function(repoGitUrl, callback) {
        var match = repoGitUrl.match(/^git:\/\/github.com\/(.+)\/(.+).git$/);

        var repoUserName = match[1]
          , repoName = match[2];
        var repo = github.getRepo(repoUserName, repoName);
        console.error(repoUserName, repoName);
        repo.fork(function(err, repo) {
          callback(err, repo);
        });
      }

    , reposGetContents: function(opts, callback) {
        var repo = github.getRepo(self.username, opts.repo);
        var branch = opts.ref || "master";
        var path = opts.path;
        repo.contents(branch, path, function(err, repoContents) {
          callback(err, repoContents);
        });
      }

    , repoFileGet: function(opts, callback) {
        var repo = github.getRepo(self.username, opts.repo);
        var branch = opts.ref || "master";
        var path = opts.path;
        repo.read(branch, path, function(err, content, sha) {
          callback(err, content, sha);
        });
      }

    , repoFileUpdate: function(opts, callback) {
        var repo = github.getRepo(self.username, opts.repo);
        var branch = opts.branch || "master";
        var path = opts.path;
        var message = opts.message;
        var content = opts.content;
        repo.write(branch, path, content, message, function(err) {
          callback(err);
        });
      }

    , repoFileCreate: function(opts, callback) {
        var repo = github.getRepo(self.username, opts.repo);
        var branch = opts.branch || "master";
        var path = opts.path;
        var message = opts.message;
        var content = opts.content;
        repo.write(branch, path, content, message, function(err) {
          callback(err);
        });
      }
    , repoFileDelete: function(opts, callback) {
        var repo = github.getRepo(self.username, opts.repo);
        var branch = opts.branch || "master";
        var path = opts.path;
        repo.remove(branch, path, function(err) {
          callback(err);
        });
      }





  }
};