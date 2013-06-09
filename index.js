module.exports = function(gitProviderName, opts){
  switch (gitProviderName) {
    case "github":
      return new (require("./lib/githubProvider"))(opts);
  }
}