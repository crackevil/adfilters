// ==UserScript==
// @name        anti-remover
// @namespace   http://userscripts.org/users/
// @include     http://thisav.com/*
// @include     http://www.thisav.com/*
// @include     http://memeksusu.com/*
// @include	http://iumimi.blogspot.com/*
// @include	http://genbird.com/*
// @include	http://www.xiuren.org/*
// @version     0.1
// @grant	none
// @run-at      document-start
// @updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/anti-remover.user.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/anti-remover.user.js
// ==/UserScript==

// http://www.antiblock.org/
// provide a script can display a nag screen when adblocker detected


function filteringscript(e) {
	if (e.target.text.indexOf("nextFunction")>=0||e.target.text.indexOf("google_ad_client")>=0)
	{
		var suspects=document.querySelectorAll("[id]");
		for (var i=0;i<suspects.length;i++)
		{
			var node=suspects[i];
			var style=window.getComputedStyle(node);
			if (style.position=="fixed" && style.display=="block")
			{
				node.parentNode.removeChild(node);
				break;
			}

		}
		e.preventDefault();//not execute this time
		e.target.parentNode.removeChild(e.target);
		document.removeEventListener("beforescriptexecute", filteringscript, true);
	}
}

document.addEventListener("beforescriptexecute", filteringscript, true);

