// ==UserScript==
// @name        filmvz
// @namespace   http://userscripts.org/users/
// @include     http://filmvz.com/*
// @include     http://www.filmvz.com/*
// @version     0.1
// @grant	none
// updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/filmvz.user.js
// downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/filmvz.user.js
// ==/UserScript==



var imgnodes=document.body.querySelectorAll("img");
//console.log("haha");
//console.log(imgnodes);
for (var i=0;i<imgnodes.length;i++)
{
	var img=imgnodes[i];
	var url=img.src;
	var pos=url.indexOf("%22,");
	if (pos>=0)
	{
		var url1=url.substring(0,pos);
		//console.log(img.src);
		//console.log(url1);
		img.src=url1;
	}
	
}
