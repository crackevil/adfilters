// ==UserScript==
// @name           discuz-deconfuse
// @namespace      http://userscripts.org/users/
// @grant none
// @include        */viewthread.php?tid=*
// @include        */thread-*
// @include        */forum.php?mod=viewthread&*
// @updateURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/discuz-deconfuse.user.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/discuz-deconfuse.user.js
// @version	0.1
// ==/UserScript==

clean();

function deconfuse() {
	if(location.href){
		window.ua=navigator.userAgent;
		window.URL = location.href;
		if(ua.match(/Chrom(ium|e)|Iron/)){
			window.addEventListener("load", clean, false);
		} else if(ua.match("Gecko")) {
			window.addEventListener("load", clean, false);
		} else if(ua.match("Opera")) {
			document.addEventListener("DOMContentLoaded", clean, false);
		}
	}
	clean();
}

function removeTrash(node)
{
	if (node)
	{
		node.parentNode.removeChild(node);
	}
}

var bgcolor="";



function clean_by_pagecolor()
{
	Array.prototype.forEach.call(document.querySelectorAll('.jammer'), removeTrash);
	var page_node=document.querySelector(".t_f");
	var nodep=page_node;
	while (nodep && window.getComputedStyle(nodep,null).getPropertyValue("background-color")=="transparent") nodep=nodep.parentNode;
	bgcolor=window.getComputedStyle(nodep,null).getPropertyValue("background-color");
	Array.prototype.forEach.call(page_node.querySelectorAll('*'), function (node)
	{
		if (node)
		{
			if (window.getComputedStyle(node,null).getPropertyValue("color")==bgcolor) removeTrash(node);
		}
	});
}

function clean_by_span()
{
	Array.prototype.forEach.call(document.querySelectorAll("span"), function (node)
			{
				if (node)
				{
					if (window.getComputedStyle(node,null).getPropertyValue("display")=="none" && node.children.length==0) removeTrash(node);
				}
			});

}


function clean() {


	/*
	//find font trash
	var fTags = document.getElementsByTagName("FONT");
	for (var a = 0; a < fTags.length; a++) {
		elem = fTags[a];
		if (elem.style.fontSize=="0px") {
			trash.push(elem);
		}
	}

	*/

	clean_by_pagecolor();
	clean_by_span();
}
