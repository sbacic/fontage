glob   = require('glob')
AdmZip = require('adm-zip');
path   = require('path')
util   = require('util')
fs     = require('fs')

class Fontage 
    dir      : '.'
    unzipDir : 'unpacked'

    constructor : ->
        args = process.argv.slice(0)

        if ('--extract' in args)
            @extractArchives()

        #Custom unzip dir?
        for param in args.slice(2, args.length)
            if (param.match(/--unpackTo=/, param) != null)
                @unzipDir = param.replace('--unpackTo=', '')
                break

        for param in args.slice(2, args.length)
            if (param.match(/--dir=/, param) != null)
                @dir = param.replace('--dir=', '')
                break        

        if ('--print' in args)
            console.log "\n" + @globFonts() + "\n" #only prints CSS font styles
        else 
            css = @globFonts() + fs.readFileSync(path.join(__dirname, 'src/awesomplete/awesomplete.css'), "utf8") 
            js  = fs.readFileSync(path.join(__dirname, 'src/awesomplete/awesomplete.min.js'), "utf8") + fs.readFileSync(path.join(__dirname, 'fontageSwitcher.js'), "utf8")       
            fs.writeFileSync(path.join('.', 'fontage.css'), css) 
            fs.writeFileSync(path.join('.', 'switcher.js'), js)

        if ('--silent' not in args)
            @printInstructions()   


    extractArchives : ->
        archives = glob.sync(@dir + '/**/*.zip')
        @unpack(archive) for archive in archives
     
    unpack : (archive)->
        zip = new AdmZip(archive)
        zip.extractAllTo(@unzipDir, false)
        
    globFonts : ->    
        fonts   = glob.sync(@dir + '/**/*.{otf,ttf}')
        css     = ( @generateCSS(font) for font in fonts )
        results = ''

        for e, i in css
            results += util.format('@font-face {%s}\n', e)

        return results

    printInstructions : ()->
        console.log "Fontage has finished succesfully! Add this to the bottom of your .html file to start playing with your fonts:\n\n
        <link rel=\"stylesheet\" href=\"fontage.css\" />\n
        <script src=\"switcher.js\"></script>\n
        "

    generateCSS : (font)->
        name = path.basename(font)
        file = font.toString().split('.')[0]
        css  = util.format('font-family: "%s"; \nsrc: url("%s");', name, font)
        return css

module.exports = Fontage