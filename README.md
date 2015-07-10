Fontage
==

Fontage (font montage) is a small nodejs script that makes it easier and faster to try out new fonts. Imagine this: you're building a website and you've just downloaded a bunch of fonts you want to try out. The problem - some of them are in zip archives, some of them are several directories deep and then there's all the CSS you have to write...

With Fontage, all you have to do is run `nodejs fontage` in the projects root and all that is taken care.

Installation
--
Just run the following:

`npm install sbacic/fontage`

Instructions
--
+ Get to the root directory of your project. Make sure all the fonts you want to use are already there.
+ Run `nodejs fontage`. 
+ Paste the fontage CSS and JS link/sripts to the bottom of your .html file, just above the body closing tag.
+ Click on an element in your page while holding CTRL. A input field should pop up.
+ Start typing to see all the available fonts. Click on select. 

CLI Flags
--

`--extract` Extract all zip files in directory (default is current directory). This also unzips non-font archives!

`--dir=somedir` Search this directory for fonts and archives. Default is current directory (".").

`--unpackTo=somedir` Unpack zipped files to this directory. Useful if you want to delete it later on.

`--print` Prints the font CSS to stdout instead of writing it to file.

`--silent` Do not print further instructions. Useful if you're automating and only want errors outputed to stdout.

LICENSE
--
MIT

