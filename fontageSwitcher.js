(function() {
  var FontageSwitcher, foobar;

  FontageSwitcher = (function() {
    FontageSwitcher.prototype.element = 'body';

    function FontageSwitcher() {
      var fonts, object;
      object = this;
      fonts = this.getFonts();
      document.querySelector('body').insertAdjacentHTML('beforeend', '<input type="text" id="fontage" class="awesomplete" data-minchars="0" data-maxitems="100" style="display:none; font-size: 1.2em; padding: 0.2em;"/>');
      document.querySelector('#fontage').setAttribute('data-list', fonts.join(', '));
      document.querySelector('#fontage').addEventListener('awesomplete-selectcomplete', function(e) {
        var font;
        font = document.querySelector('#fontage').value;
        object.applyFont(object.element, "'" + font + "'");
        return document.querySelector("#fontage").style.display = 'none';
      });
      document.querySelector('#fontage').addEventListener('focusout', function(e) {
        return document.querySelector("#fontage").style.display = 'none';
      });
      document.querySelector('body').addEventListener('click', function(event) {
        if (event.ctrlKey === true) {
          return object.toggleOn(event);
        }
      });
    }

    FontageSwitcher.prototype.getFonts = function() {
      var all, font, fonts, i, j, k, len, len1, len2, ref, rule, rules, sheet;
      all = [];
      fonts = [];
      ref = (function() {
        var j, len, ref, results;
        ref = document.styleSheets;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          sheet = ref[j];
          results.push(this._getStylesheets(sheet));
        }
        return results;
      }).call(this);
      for (i = 0, len = ref.length; i < len; i++) {
        rules = ref[i];
        for (j = 0, len1 = rules.length; j < len1; j++) {
          rule = rules[j];
          all.push(rule);
        }
      }
      all = all.filter(function(e) {
        return e.constructor.name === 'CSSFontFaceRule';
      });
      for (k = 0, len2 = all.length; k < len2; k++) {
        font = all[k];
        fonts.push(font.style.fontFamily.replace(/'/g, ''));
      }
      fonts = fonts.filter((function(_this) {
        return function(item, pos) {
          return fonts.indexOf(item) === pos;
        };
      })(this));
      return fonts.sort();
    };

    FontageSwitcher.prototype._getStylesheets = function(sheet) {
      return sheet.rules || sheet.cssRules || [];
    };

    FontageSwitcher.prototype.toggleOn = function(e) {
      this.element = e.target;
      document.querySelector('div.awesomplete').style.zIndex = '99';
      document.querySelector('div.awesomplete').style.position = 'fixed';
      document.querySelector('div.awesomplete').style.top = e.clientY + "px";
      document.querySelector('div.awesomplete').style.left = e.clientX + "px";
      document.querySelector('#fontage').style.display = 'block';
      return document.querySelector('#fontage').dispatchEvent(new Event('focus'));
    };

    FontageSwitcher.prototype.applyFont = function(target, font) {
      return target.style.fontFamily = font;
    };

    return FontageSwitcher;

  })();

  foobar = new FontageSwitcher();

}).call(this);
