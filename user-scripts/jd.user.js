// ==UserScript==
// @name        jd
// @namespace   http://userscripts.org/users/
// @match     *://*.jd.com/*
// @version     0.1
// @grant	none
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/jd.user.js
// ==/UserScript==


function remove_adclick()
{
	var nodes=document.querySelectorAll('a[href*="//c-nfa.jd.com/adclick"]');
	Array.prototype.forEach.call(nodes, function(node){
		var url=node.href;
		var parsed=parseQueryStringToDictionary(url);
		if (parsed.url)
			node.href=parsed.url;
	});
}

remove_adclick();
document.body.observe(remove_adclick);
