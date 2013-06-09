
var Github = require("github");
var GithubProvider = function(opts) {
  this.github = new Github({
    username: opts.username,
    password: opts.password,
    auth: "basic"
  });
  this.user = this.github.getUser();
  this.username = opts.username;
}

GithubProvider.prototype._getUserRepo = function(repoName) {
  return this.github.getRepo(this.username, repoName);
}

GithubProvider.prototype.authenticatedUser = function(callback) {
  
  this.user.show(null, function(err, userInfo) {
    callback(err, userInfo);
  });
}
GithubProvider.prototype.reposGet = function(callback) {
  
  this.user.repos(function(err, repos) {
    callback(err, repos);
  });
}

GithubProvider.prototype.reposCreate = function(repoName, callback) {
  this.user.createRepo({
      name: repoName
    , auto_init: true
  }, function(err, repo) {
    callback(err,repo);
  });
}

GithubProvider.prototype.reposDelete = function(repoName, callback) {
  this._getUserRepo(repoName).deleteRepo(function(err, repo) {
    callback(err, repo);
  });
}

GithubProvider.prototype.reposFork = function(repoGitUrl, callback) {
  var match = repoGitUrl.match(/^git:\/\/github.com\/(.+)\/(.+).git$/);

  var repoUserName = match[1]
    , repoName = match[2];
  var repo = this._getUserRepo(repoName);
  repo.fork(function(err, repo) {
    callback(err, repo);
  });
}

GithubProvider.prototype.reposGetContents = function(opts, callback) {
  var branch = opts.ref || "master";
  var path = opts.path;
  this._getUserRepo(opts.repo).contents(branch, path, function(err, repoContents) {
    callback(err, repoContents);
  });
}

GithubProvider.prototype.repoFileGet = function(opts, callback) {
  var branch = opts.ref || "master";
  var path = opts.path;
  this._getUserRepo(opts.repo).read(branch, path, function(err, content, sha) {
    callback(err, content, sha);
  });
}

GithubProvider.prototype.repoFileUpdate = function(opts, callback) {
  var branch = opts.branch || "master";
  var path = opts.path;
  var message = opts.message;
  var content = opts.content;
  this._getUserRepo(opts.repo).write(branch, path, content, message, function(err) {
    callback(err);
  });
}

GithubProvider.prototype.repoFileCreate = function(opts, callback) {
  var branch = opts.branch || "master";
  var path = opts.path;
  var message = opts.message;
  var content = opts.content;
  this._getUserRepo(opts.repo).write(branch, path, content, message, function(err) {
    callback(err);
  });
}
GithubProvider.prototype.repoFileDelete = function(opts, callback) {
  var branch = opts.branch || "master";
  var path = opts.path;
  this._getUserRepo(opts.repo).remove(branch, path, function(err) {
    callback(err);
  });
}







module.exports = GithubProvider;