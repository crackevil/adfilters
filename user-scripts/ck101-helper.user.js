// ==UserScript==
// @name        ck101-helper
// @namespace   http://userscripts.org/users/
// @include     *://www.ck101.com/*
// @include     *://ck101.com/*
// @version     0.2
// @noframes
// @grant       GM_xmlhttpRequest
// @require	https://raw.githubusercontent.com/crackevil/adfilters/content/user-scripts/imagehack.js
// @updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/ck101-helper.user.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/ck101-helper.user.js
// ==/UserScript==


(function() {
	var root=document.querySelector("div.article_plc_user");
	if (!root) return;
	var imglist=image_page.get_image_nodes(root);
	for (var i=0;i<imglist.length;i++)
		{
			var node=imglist[i];
			var ourl=node.getAttribute("file");
			var url=imagehack.hackimage(ourl);
			if (url!=ourl)
			{
				node.setAttribute("file",url);
			}
		}

})();

