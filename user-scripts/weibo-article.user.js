// ==UserScript==
// @name        weibo-article
// @namespace   http://userscripts.org/users/
// @match	*://weibo.com/ttarticle/*
// @version     0.1
// @noframes
// @require	utils.js
// @grant none
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/weibo-article.user.js
// ==/UserScript==

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		unmaskShield();
		unmaskContent();
	}
}


function unmaskShield()
{
	var shieldNode=document.querySelector('div.WB_editor_iframe');
	if (shieldNode)
	{
		shieldNode.oncontextmenu = null;
		if (shieldNode.hasAttribute('unselectable')) shieldNode.removeAttribute('unselectable');
		var style = shieldNode.style;
		var shields = [];
		for (var i=0;i<style.length;i++)
		{
			var style_string = style[i].toLowerCase();
			if (style_string.includes('user') && style_string.includes('select')) shields.push(style[i]);
		}
		shields.forEach(function (x){style.removeProperty(x)});
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
