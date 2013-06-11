[![browser support](https://ci.testling.com/darvin/git-provider.png)](https://ci.testling.com/darvin/git-provider)

# GitProvider
[![Build Status](https://travis-ci.org/darvin/git-provider.png?branch=master)](https://travis-ci.org/darvin/git-provider)



This is library that provides unified high-level interface to different methods of interacting with Git repositories. It suppose to work in browser (via [Browserify](browserify.org)) and in Node.JS.

Used git adapters:

  - [Github.js](https://github.com/michael/github) Github REST API library, used by [Prose.io](http://prose.io/)

Planned adapters:

  - [node-gitteh](https://github.com/libgit2/node-gitteh) Node.js-only libgit2 library
  - [JS-Git](https://github.com/creationix/js-git) Pure javascript Git implementation

## Installation

    npm install git-provider


## API


### Initialization

#### Github.js

```javascript
var gitProvider = require("git-provider")
    gp = gitProvider("github",{
        username:"YOUR_GITHUB_USERNAME"
      , password: "YOUR_GITHUB_PASSWORD"
    });
```

### Methods on gp object
  
```javascript
gp.authenticatedUserGet(function(err, user){});

gp.reposGet(function(err, repositories){});

gp.repoCreate(repoName, function(err, repo){});

gp.repoDelete(repoName, function(err){});

gp.repoFork = function({url:"git//github.com/darvin/git-provider.git"}, function(err, repo) {});

gp.repoGetContents({
      ref: "master"
    , path: "/path/inside/repo"
  }, function(err, repoContents){});

gp.repoFileGet({
      ref: "master"
    , path: "/path/inside/repo/file.js"
  }, function(err, fileContent, fileSha){});

gp.repoFileUpdate({
      branch: "master"
    , path: "/path/inside/repo/file.js"
    , message: "Commit Message"   //optional
    , content: "New \n file \n content"
  }, function(err){});

gp.repoFileCreate({
      branch: "master"
    , path: "/path/inside/repo/file.js"
    , message: "Commit Message"   //optional
    , content: "New \n file \n content"
  }, function(err){});

gp.repoFileDelete({
      branch: "master"
    , path: "/path/inside/repo/file.js"
    , message: "Commit Message"   //optional
  }, function(err){});
```

