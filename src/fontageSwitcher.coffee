class FontageSwitcher 
    fonts : []
    element : 'body'

    constructor : ->
        object = @
        fonts  = @getFonts()

        document.querySelector('body').insertAdjacentHTML('beforeend', '<input type="text" id="fontage" class="awesomplete" data-minchars="0" data-maxitems="100" style="display:none; font-size: 1.2em; padding: 0.2em;"/>'
        )    
        document.querySelector('#fontage').setAttribute('data-list', fonts.join(', '))    
        document.querySelector('#fontage').addEventListener('awesomplete-selectcomplete', (e)->
            font = document.querySelector('#fontage').value
            object.applyFont(object.element, "'" + font + "'")
            document.querySelector("#fontage").style.display = 'none'
        )
        document.querySelector('#fontage').addEventListener('focusout', (e)->
            document.querySelector("#fontage").style.display = 'none'
        ) 

        document.querySelector('body').addEventListener 'click', (event)->
            if event.ctrlKey == true
                object.toggleOn(event.target)

    getFonts : ()->
        all = []
        #This loop is a bit of a dozzie, so in short: stylesheets -> css rules -> individual rule (ie: document.styleSheets[0].cssRules[0])       
        all.push rule for rule in rules for rules in (@_getStylesheets(sheet) for sheet in document.styleSheets)
        all = all.filter (e)->
            return e.constructor.name == 'CSSFontFaceRule'

        @fonts.push(font.style.fontFamily.replace(/'/g, '')) for font in all   

        return @fonts  

    _getStylesheets : (sheet)->
        return sheet.rules || sheet.cssRules || []        

    toggleOn : (el)->
        @element = el
        offset   = el.getBoundingClientRect()

        document.querySelector('div.awesomplete').style.position = 'absolute' 
        document.querySelector('div.awesomplete').style.top      = offset.top + offset.height + "px"
        document.querySelector('div.awesomplete').style.left     = offset.left + "px"

        document.querySelector('#fontage').style.display = 'block'
        document.querySelector('#fontage').dispatchEvent(new Event('focus'))
        
    applyFont : (target, font)->
        target.style.fontFamily = font

new FontageSwitcher()