// ==UserScript==
// @name        weibo-other
// @namespace   http://userscripts.org/users/
// @match	*://weibo.com/*
// @version     0.1
// @noframes
// @grant none
// @require	utils.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/weibo-other.user.js
// ==/UserScript==

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		unmaskContent();
	}
}


function unmaskContent()
{
	var maskNode=document.querySelector('[node-type="maskContent"]');
	if (maskNode) maskNode.removeSelf();

	var bodyNode=document.querySelector('[node-type="contentBody"]');
	if (bodyNode)
	{
		bodyNode.style.height=null;
		bodyNode.style.overflow="visible";
	}
}
