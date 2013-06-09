module.exports = function(gitProviderName, opts){
  switch (gitProviderName) {
    case "github":
      return require("./lib/githubProvider")(opts);
  }
}