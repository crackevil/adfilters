// ==UserScript==
// @name        moresound
// @namespace   http://userscripts.org/users/
// @match     *://moresound.tk/*
// @grant	none
// @version     1
// @run-at      document-start
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/moresound.user.js
// ==/UserScript==

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		isOpen=true;
		clearAllIntervals2();
	}
}
console=null;
