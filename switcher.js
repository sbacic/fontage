// Awesomplete - Lea Verou - MIT license
(function(){function m(a,b){for(var c in a){var g=a[c],e=this.input.getAttribute("data-"+c.toLowerCase());this[c]="number"===typeof g?parseInt(e):!1===g?null!==e:g instanceof Function?null:e;this[c]||0===this[c]||(this[c]=c in b?b[c]:g)}}function d(a,b){return"string"===typeof a?(b||document).querySelector(a):a||null}function h(a,b){return k.call((b||document).querySelectorAll(a))}function l(){h("input.awesomplete").forEach(function(a){new Awesomplete(a)})}var f=function(a,b){var c=this;this.input=
d(a);this.input.setAttribute("autocomplete","off");this.input.setAttribute("aria-autocomplete","list");b=b||{};m.call(this,{minChars:2,maxItems:10,autoFirst:!1,filter:f.FILTER_CONTAINS,sort:f.SORT_BYLENGTH,item:function(a,b){return d.create("li",{innerHTML:a.replace(RegExp(d.regExpEscape(b.trim()),"gi"),"<mark>$&</mark>"),"aria-selected":"false"})},replace:function(a){this.input.value=a}},b);this.index=-1;this.container=d.create("div",{className:"awesomplete",around:a});this.ul=d.create("ul",{hidden:"",
inside:this.container});this.status=d.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-relevant":"additions",inside:this.container});d.bind(this.input,{input:this.evaluate.bind(this),blur:this.close.bind(this),keydown:function(a){var b=a.keyCode;if(c.opened)if(13===b&&c.selected)a.preventDefault(),c.select();else if(27===b)c.close();else if(38===b||40===b)a.preventDefault(),c[38===b?"previous":"next"]()}});d.bind(this.input.form,{submit:this.close.bind(this)});
d.bind(this.ul,{mousedown:function(a){a=a.target;if(a!==this){for(;a&&!/li/i.test(a.nodeName);)a=a.parentNode;a&&c.select(a)}}});this.input.hasAttribute("list")?(this.list="#"+a.getAttribute("list"),a.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||b.list||[];f.all.push(this)};f.prototype={set list(a){Array.isArray(a)?this._list=a:"string"===typeof a&&-1<a.indexOf(",")?this._list=a.split(/\s*,\s*/):(a=d(a))&&a.children&&(this._list=k.apply(a.children).map(function(a){return a.textContent.trim()}));
document.activeElement===this.input&&this.evaluate()},get selected(){return-1<this.index},get opened(){return this.ul&&null==this.ul.getAttribute("hidden")},close:function(){this.ul.setAttribute("hidden","");this.index=-1;d.fire(this.input,"awesomplete-close")},open:function(){this.ul.removeAttribute("hidden");this.autoFirst&&-1===this.index&&this.goto(0);d.fire(this.input,"awesomplete-open")},next:function(){this.goto(this.index<this.ul.children.length-1?this.index+1:-1)},previous:function(){var a=
this.ul.children.length;this.goto(this.selected?this.index-1:a-1)},goto:function(a){var b=this.ul.children;this.selected&&b[this.index].setAttribute("aria-selected","false");this.index=a;-1<a&&0<b.length&&(b[a].setAttribute("aria-selected","true"),this.status.textContent=b[a].textContent);d.fire(this.input,"awesomplete-highlight")},select:function(a){if(a=a||this.ul.children[this.index]){var b;d.fire(this.input,"awesomplete-select",{text:a.textContent,preventDefault:function(){b=!0}});b||(this.replace(a.textContent),
this.close(),d.fire(this.input,"awesomplete-selectcomplete"))}},evaluate:function(){var a=this,b=this.input.value;b.length>=this.minChars&&0<this._list.length?(this.index=-1,this.ul.innerHTML="",this._list.filter(function(c){return a.filter(c,b)}).sort(this.sort).every(function(c,d){a.ul.appendChild(a.item(c,b));return d<a.maxItems-1}),0===this.ul.children.length?this.close():this.open()):this.close()}};f.all=[];f.FILTER_CONTAINS=function(a,b){return RegExp(d.regExpEscape(b.trim()),"i").test(a)};
f.FILTER_STARTSWITH=function(a,b){return RegExp("^"+d.regExpEscape(b.trim()),"i").test(a)};f.SORT_BYLENGTH=function(a,b){return a.length!==b.length?a.length-b.length:a<b?-1:1};var k=Array.prototype.slice;d.create=function(a,b){var c=document.createElement(a),g;for(g in b){var e=b[g];"inside"===g?d(e).appendChild(c):"around"===g?(e=d(e),e.parentNode.insertBefore(c,e),c.appendChild(e)):g in c?c[g]=e:c.setAttribute(g,e)}return c};d.bind=function(a,b){if(a)for(var c in b){var d=b[c];c.split(/\s+/).forEach(function(b){a.addEventListener(b,
d)})}};d.fire=function(a,b,c){var d=document.createEvent("HTMLEvents");d.initEvent(b,!0,!0);for(var e in c)d[e]=c[e];a.dispatchEvent(d)};d.regExpEscape=function(a){return a.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")};"undefined"!==typeof Document&&("loading"!==document.readyState?l():document.addEventListener("DOMContentLoaded",l));f.$=d;f.$$=h;"undefined"!==typeof self&&(self.Awesomplete=f);"object"===typeof exports&&(module.exports=f);return f})();
(function() {
  var FontageSwitcher;

  FontageSwitcher = (function() {
    FontageSwitcher.prototype.fonts = [];

    FontageSwitcher.prototype.element = 'body';

    function FontageSwitcher() {
      var fonts, object;
      object = this;
      fonts = this.getFonts();
      $('body').append('<input type="text" id="fontage" class="awesomplete" data-minchars="0" data-maxitems="100" style="display:none; font-size: 1.2em; padding: 0.2em;"/>');
      $('#fontage').attr('data-list', fonts.join(', '));
      $('#fontage').on('awesomplete-selectcomplete', function(e) {
        var font;
        font = $('#fontage').val();
        object.applyFont(object.element, "'" + font + "'");
        return $("#fontage").hide();
      }).on('focusout', function(e) {
        return $("#fontage").hide();
      });
      $('body').click(function(event) {
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
      var pos;
      this.element = el;
      pos = $(el).offset();
      $('div.awesomplete').css({
        'position': 'absolute',
        'top': pos.top + $(el).outerHeight() + 'px',
        'left': pos.left + 'px'
      });
      $('#fontage').show();
      return $('#fontage').focus();
    };

    FontageSwitcher.prototype.applyFont = function(target, font) {
      return $(target).css('font-family', font);
    };

    return FontageSwitcher;

  })();

  $(function() {
    return new FontageSwitcher();
  });

}).call(this);
