// ==UserScript==
// @name        unshort
// @namespace   http://userscripts.org/users/
// @match     *://linkis.com/*
// @version     0.1
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/unshort.user.js
// ==/UserScript==

if (window.location.host=='linkis.com')
{
	if (window.LinkData && window.LinkData.longUrl)
	{
		window.location = window.LinkData.longUrl
	}
}
