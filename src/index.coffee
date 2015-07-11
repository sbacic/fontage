#!/usr/bin/env node
#coffeescript has a bad habit of removing the shebang so youll have to add it manually to the compiled js file

path    = require('path');
fs      = require('fs');
fontage = require(path.join(path.dirname(fs.realpathSync(__filename)), './fontage.js'))

new fontage()