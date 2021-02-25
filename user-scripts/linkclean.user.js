// ==UserScript==
// @name        linkclean
// @namespace   http://userscripts.org/users/
// @match     http://*.gwdang.com/*
// @match     *://*.amazon.cn/*
// @match     *://amazon.cn/*
// @version     0.2
// @grant	none
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/linkclean.user.js
// ==/UserScript==

if (location.host.indexOf("gwdang.com")>=0)
{
	var unions=document.querySelectorAll('a[href*="/union/go/"]');
	for (var i=0;i<unions.length;i++)
	{
		var url=unions[i].href;
		var params=parseQueryStringToDictionary(url);
		var realurl=params.target_url;
		unions[i].href=realurl;
	}
}

if (location.host.indexOf("amazon.cn")>=0)
{
	var opr_amazoncn=function (stub) {
		var strip_tail=function (node) {
			var url=node.href;
			if (url)
			{
				var turl=url.substr(0, url.lastIndexOf('/')+1);
				node.href=turl;
			}
		};
		Array.prototype.forEach.call(document.querySelectorAll('a[href*="/gp/"]'), strip_tail);
		Array.prototype.forEach.call(document.querySelectorAll('a[href*="/dp/"]'), strip_tail);
	};
	opr_amazoncn(true);
	document.body.observe(opr_amazoncn);
}

