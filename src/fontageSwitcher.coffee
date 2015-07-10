class FontageSwitcher 
    fonts : []
    element : 'body'

    constructor : ->
        object = @
        fonts  = @getFonts()

        $('body').append('<input type="text" id="fontage" class="awesomplete" data-minchars="0" data-maxitems="100" style="display:none; font-size: 1.2em; padding: 0.2em;"/>')
        $('#fontage').attr('data-list', fonts.join(', '))    
        $('#fontage').on('awesomplete-selectcomplete', (e)->
            font = $('#fontage').val()
            object.applyFont(object.element, "'" + font + "'")
            $("#fontage").hide()
        ).on('focusout', (e)->
            $("#fontage").hide()
        ) 

        $('body').click (event)->
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
        pos      = $(el).offset()
        $('div.awesomplete').css({
            'position' : 'absolute',
            'top' : pos.top + $(el).outerHeight() + 'px', 
            'left' : pos.left + 'px'
        })
        $('#fontage').show()
        $('#fontage').focus()
        
    applyFont : (target, font)->
        $(target).css('font-family', font)


$ ()->           
    new FontageSwitcher()