// ==UserScript==
// @name        youtube_ex
// @namespace   http://userscripts.org/users/
// @match     https://www.youtube.com/*
// @version     0.1
// @grant	none
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/youtube_ex.user.js
// ==/UserScript==


function trackless()
{
	var make_trackless=function(){
		document.killElementAttribute("*", "data-sessionlink");
		document.killElementAttribute("*", "data-visibility-tracking");
	};
	make_trackless();
	document.body.observe(make_trackless);
}


trackless();

function norecommend()
{
	Array.prototype.filter.call(document.querySelectorAll("span.view-count"), function (node){
		return /Recommended for you/i.test(node.innerHTML);
	}).forEach(function (node){
		var pnode=node.parentNode;
		while (pnode.tagName.toLowerCase()!="a" || Array.prototype.slice.call(pnode.classList).indexOf("content-link")<0){
			if (pnode==document.body) return;
			pnode=pnode.parentNode;
		}
		var recommend_link=pnode.href;
		while (pnode.tagName.toLowerCase()!="li" || Array.prototype.slice.call(pnode.classList).indexOf("video-list-item")<0){
			if (pnode==document.body) return;
			pnode=pnode.parentNode;
		}
		pnode.parentNode.removeChild(pnode);
		var vid=parseQueryStringToDictionary(recommend_link).v;
		//Array.prototype.slice.call(document.querySelectorAll('a#ytp-suggestion-set[href*="'+vid+'"]'));
	});
}

norecommend();
