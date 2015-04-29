#html/jade-b3-sass boilerplate

This is a static website boilerplate, with Node.js, Gulp, Bower, JADE template engine, SASS, and bootstrap3-SASS.


##Templates
The individual web pages are coded in JADE (node template engine) as **.jade** files, and then compiled to the **\dist** folder as **.html** pages.
The page **layout**, **mixins**, and other page **parts** are inside the **\sources\parts\** folder.

The jade template engin also supports Markdown content. [See _Filters_ documentation](http://jade-lang.com/reference/filters/).

##SASS + Bootstrap3
All the styles are located on **\sources\scss\** folder, compiled with **sass**,  anf finaly concatenated to a single files **\dist\css\styles.css**.

**Bootstrap3-SASS** is included in the styles width all its mixins and variables.


###Vendors Styles/Scripts/Fonts
All vendors resources are installed and updated with **Bower** in the **\sources\vendors\** folder.
All the styles and scripts are concatenated in to **\dist\css\vendors.css**, **\dist\js\vendors.js**, and **\dist\fonts\**.

>Note: Bootstrap SASS is include only on styles.css

###Maps file
A **.map** file is generated for each style file for easing developing.

##Automatic components Style Guide
All the site components should be coded following the **Atomic Design Patter**, and have all it styles in it own **.scss** file, in **\sources\scss\components\** folder.

In each style file you can add a description of the component as markdow, and a HTML preview, all inside comment.  
Please see the [Styledocco Documentation](https://jacobrask.github.io/styledocco/) for more information.

>Note: Gulp automaticly add all the components file in this folder into the **_all.scss** file.

This will allow the Style Guide to be automaticly generated.


##Gulp Tasks

There are 3 main tasks to run:

### Default task:
This task will build the files in the **\dist\** folder, create the components documentation in the **\docs\** folder, and finaly start the web server -on the default browser-  using **\dist\** folder as root.
```
	$ gulp
```
### Build task:
This task will build the files in the **\dist\** folder, create the components documentation in the **\docs\** folder.
```
	$ gulp build
```

### Docs task:
This task will start the web server -on the default browser-  using **\docs\** folder as root.
```
	$ gulp
```


##Color Themes
The boilerplate has 5 base colors, and 7 already defined color themes, that you can select uncommenting it _@import_ call in **sources\scss\_colors.scss** file.

```sass
	/******************************
		COLORS
	******************************/
	
	@import "themes/cheer_up_emo_kid"; //Default
	//@import "themes/candy";
	//@import "themes/color_blocking";
	//@import "themes/grape";
	//@import "themes/jean";
	//@import "themes/not_going_back";
	//@import "themes/terra";
````
<a href="http://www.colourlovers.com/palette/1930/cheer_up_emo_kid" target="_blank" ><img src="http://www.colourlovers.com/images/badges/p/1/1930_cheer_up_emo_kid.png" style="width: 240px; height: 120px; border: 0 none;" alt="cheer_up_emo_kid" /></a>
<a href="http://www.colourlovers.com/palette/3747335/Candy" target="_blank"><img src="http://www.colourlovers.com/images/badges/p/3747/3747335_Candy.png" style="width: 240px; height: 120px; border: 0 none;" alt="Candy" /></a>
<a href="http://www.colourlovers.com/palette/2069616/Color_Blocking" target="_blank"><img src="http://www.colourlovers.com/images/badges/p/2069/2069616_Color_Blocking.png" style="width: 240px; height: 120px; border: 0 none;" alt="Color_Blocking" /></a>
<a href="http://www.colourlovers.com/palette/3747333/Grape" target="_blank"><img src="http://www.colourlovers.com/images/badges/p/3747/3747333_Grape.png" style="width: 240px; height: 120px; border: 0 none;" alt="Grape" /></a>
<a href="http://www.colourlovers.com/palette/3747338/Jean" target="_blank"><img src="http://www.colourlovers.com/images/badges/p/3747/3747338_Jean.png" style="width: 240px; height: 120px; border: 0 none;" alt="Jean" /></a>
<a href="http://www.colourlovers.com/palette/3747239/Not_going_back" target="_blank"><img src="http://www.colourlovers.com/images/badges/p/3747/3747239_Not_going_back.png" style="width: 240px; height: 120px; border: 0 none;" alt="Not_going_back" /></a>
<a href="http://www.colourlovers.com/palette/292482/Terra?widths=1" target="_blank"><img src="http://www.colourlovers.com/images/badges/pw/292/292482_Terra.png" style="width: 240px; height: 120px; border: 0 none;" alt="Terra" /></a>


##Technologies
- Node.js
- Gulp
- Bower
- HTML5
- JADE template engine
- SASS
- Official SASS Bootstrap3
- FontAwesome icons
- jQuery
- Slick slider
- Styledocco - For components documentation
- Markdown