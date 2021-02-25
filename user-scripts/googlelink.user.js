// ==UserScript==
// @name           google_link
// @namespace      http://userscripts.org/users/
// @version	0.2
// @grant none
// @match        https://www.google.com/*
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/googlelink.user.js
// ==/UserScript==


var interval = 300; // ms
var url=window.location.href;

//if (url.indexOf("q=")>=0 || url.indexOf("/search")>=0)
{
	window.rwt=1;
	var ts;
	ts=window.setTimeout(function() {
		if (window.rwt===undefined || window.rwt === null) {
			window.setTimeout(arguments.callee, interval);
		} else {
			window.rwt=null;
			window.clearTimeout(ts);
		}
	}, interval);
}



document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		var anchors=document.querySelectorAll("a[target='_blank']");
		for (var i=0;i<anchors.length;i++)
		{
			var anch=anchors[i];
			if (anch.hasAttribute("onmousedown")) anch.removeAttribute("onmousedown");
		}
	}
}




