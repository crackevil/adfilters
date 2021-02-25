// ==UserScript==
// @name        jkforum-helper
// @namespace   http://userscripts.org/users/
// @include     *://www.jkforum.net/*
// @include     *://jkforum.net/*
// @version     0.1
// @noframes
// @run-at      document-start
// @grant	none
// @updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/jkforum-helper.user.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/jkforum-helper.user.js
// ==/UserScript==


function filteringscript(e) {
	
	if (e.target.text.indexOf("/style/common/emp.gif")>=0)
	{
		e.preventDefault();//not execute this time
		e.target.parentNode.removeChild(e.target);
	}
}

document.addEventListener("beforescriptexecute", filteringscript, true);

