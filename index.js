(function() {
  var fontage, fs, path;

  path = require('path');

  fs = require('fs');

  fontage = require(path.join(path.dirname(fs.realpathSync(__filename)), './fontage.js'));

  new fontage();

}).call(this);
