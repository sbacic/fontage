(function() {
  var AdmZip, Fontage, fs, glob, path, util,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  glob = require('glob');

  AdmZip = require('adm-zip');

  path = require('path');

  util = require('util');

  fs = require('fs');

  Fontage = (function() {
    Fontage.prototype.dir = '.';

    Fontage.prototype.unzipDir = 'unpacked';

    function Fontage() {
      var args, css, j, js, k, len, len1, param, ref, ref1;
      args = process.argv.slice(0);
      if ((indexOf.call(args, '--extract') >= 0)) {
        this.extractArchives();
      }
      ref = args.slice(2, args.length);
      for (j = 0, len = ref.length; j < len; j++) {
        param = ref[j];
        if (param.match(/--unpackTo=/, param) !== null) {
          this.unzipDir = param.replace('--unpackTo=', '');
          break;
        }
      }
      ref1 = args.slice(2, args.length);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        param = ref1[k];
        if (param.match(/--dir=/, param) !== null) {
          this.dir = param.replace('--dir=', '');
          break;
        }
      }
      if ((indexOf.call(args, '--print') >= 0)) {
        console.log("\n" + this.globFonts() + "\n");
      } else {
        css = this.globFonts() + fs.readFileSync('src/awesomplete/awesomplete.css', "utf8");
        js = fs.readFileSync('src/awesomplete/awesomplete.min.js', "utf8") + fs.readFileSync('fontageSwitcher.js', "utf8");
        fs.writeFileSync('fontage.css', css);
        fs.writeFileSync('switcher.js', js);
      }
      if ((indexOf.call(args, '--silent') < 0)) {
        this.printInstructions();
      }
    }

    Fontage.prototype.extractArchives = function() {
      var archive, archives, j, len, results1;
      archives = glob.sync(this.dir + '/**/*.zip');
      results1 = [];
      for (j = 0, len = archives.length; j < len; j++) {
        archive = archives[j];
        results1.push(this.unpack(archive));
      }
      return results1;
    };

    Fontage.prototype.unpack = function(archive) {
      var zip;
      zip = new AdmZip(archive);
      return zip.extractAllTo(this.unzipDir, false);
    };

    Fontage.prototype.globFonts = function() {
      var css, e, font, fonts, i, j, len, results;
      fonts = glob.sync(this.dir + '/**/*.{otf,ttf}');
      css = (function() {
        var j, len, results1;
        results1 = [];
        for (j = 0, len = fonts.length; j < len; j++) {
          font = fonts[j];
          results1.push(this.generateCSS(font));
        }
        return results1;
      }).call(this);
      results = '';
      for (i = j = 0, len = css.length; j < len; i = ++j) {
        e = css[i];
        results += util.format('@font-face {%s}\n', e);
      }
      return results;
    };

    Fontage.prototype.printInstructions = function() {
      return console.log("Fontage has finished succesfully! Add this to the bottom of your .html file to start playing with your fonts:\n\n <script src=\"//code.jquery.com/jquery-1.10.2.js\"></script>\n <link rel=\"stylesheet\" href=\"fontage.css\" />\n <script src=\"switcher.js\"></script>\n");
    };

    Fontage.prototype.generateCSS = function(font) {
      var css, file, name;
      name = path.basename(font);
      file = font.toString().split('.')[0];
      css = util.format('font-family: "%s"; \nsrc: url("%s");', name, font);
      return css;
    };

    return Fontage;

  })();

  module.exports = Fontage;

}).call(this);
