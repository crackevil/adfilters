// ==UserScript==
// @name        imagebam-ad
// @namespace   http://userscripts.org/users/
// @include     http://www.imagebam.com/image/*
// @version     0.1
// @run-at      document-start
// @grant	none
// @noframes
// @updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/imagebam-ad.user.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/imagebam-ad.user.js
// ==/UserScript==


function filteringscript(e) {
	if (e.target.text.indexOf("trw_ad_client")>=0 || e.target.text.indexOf("trw_url")>=0)
	{
		e.preventDefault();//not execute this time
		e.target.parentNode.removeChild(e.target);
	}
}

document.addEventListener("beforescriptexecute", filteringscript, true);
