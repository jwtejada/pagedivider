# PageDivider

## Basic Settings
```javascript
//pagedivider defaults
$(".page-divider").tntdivider({
	title:'h2',
	alignBody: false,
	alignHeight:275,
	alignTitles: true
}); 
```

## Options
Option | Description | Adds Class
-------|--------------|-----
title:h2 | HTML tag for title ie. h2, h3 or any selector | .pd-title
alignTitles:false | Moves images before titles to align | none
alignBody:false | If true, moves images away from the body. | .pd-body
alignHeight:275 | If int is less than total body height adds a helper class | .pd-align
alt:null | even, odd to add alternate blocks, also declared with data-attr | .pd-alt
mobileWidth:900 | Nothing yet. | none
callback:function(){} | Executes after everything is done. | none

## Optional Data Attributes
```HTML
<div class="page-divider" data-alt="odd">
	<h2>Title</h2>
	<p><img src="image.jpg" class="elem-left"/></p>
	<p>Text</p>
</div>
```

## Links
[Codepen](https://codepen.io/endeart/pen/YMajve)
