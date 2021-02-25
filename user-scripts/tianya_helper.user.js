// ==UserScript==
// @name        tianya_helper
// @namespace   http://userscripts.org/users/
// @match     http://*.tianya.cn/*
// @version     0.1
// @grant	none
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/tianya_helper.user.js
// ==/UserScript==

//user-only function in bbs_info.js
//__global is defined in /global/ty/TY.js

if (window.__global && "undefined" != typeof window.__global._isOnline)
{
	window.__global.isOnline=function () {return true};
}

