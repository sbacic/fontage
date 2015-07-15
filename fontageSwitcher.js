(function() {
  var FontageSwitcher;

  FontageSwitcher = (function() {
    FontageSwitcher.prototype.fonts = [];

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
          return object.toggleOn(event.target);
        }
      });
    }

    FontageSwitcher.prototype.getFonts = function() {
      var all, font, i, j, k, len, len1, len2, ref, rule, rules, sheet;
      all = [];
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
        this.fonts.push(font.style.fontFamily.replace(/'/g, ''));
      }
      return this.fonts;
    };

    FontageSwitcher.prototype._getStylesheets = function(sheet) {
      return sheet.rules || sheet.cssRules || [];
    };

    FontageSwitcher.prototype.toggleOn = function(el) {
      var offset;
      this.element = el;
      offset = el.getBoundingClientRect();
      document.querySelector('div.awesomplete').style.position = 'absolute';
      document.querySelector('div.awesomplete').style.top = offset.top + offset.height + "px";
      document.querySelector('div.awesomplete').style.left = offset.left + "px";
      document.querySelector('#fontage').style.display = 'block';
      return document.querySelector('#fontage').dispatchEvent(new Event('focus'));
    };

    FontageSwitcher.prototype.applyFont = function(target, font) {
      return target.style.fontFamily = font;
    };

    return FontageSwitcher;

  })();

  new FontageSwitcher();

}).call(this);
