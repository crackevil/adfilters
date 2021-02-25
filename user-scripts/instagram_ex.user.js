// ==UserScript==
// @name        instagram_ex
// @namespace   http://userscripts.org/users/
// @match     https://www.instagram.com/*
// @version     0.2
// @grant	none
// @require	utils.js
// @require	imagehack.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/instagram_ex.user.js
// ==/UserScript==

var instagram_mode={
	get isPicture () {
		return /https:\/\/www.instagram.com\/p\//i.test(location.href);
	},
	get isProfile () {
		return /https:\/\/www.instagram.com\/[^\/]+\/[^\/]*$/i.test(location.href);
	},
	get isHomePage () {
		return 'https://www.instagram.com/'==location.href;
	},
};


document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		ondomchange();
		if (document.body) document.body.observe(ondomchange);
	}
}

function clean_insta()
{
	var pimg=document.querySelectorAll('article > div img[src^="http"]');
	Array.prototype.forEach.call(pimg, function(node){
		//node.killElementAttribute("*", "srcset");
		node.style="";
		var pnode=node.parentNode;
		while (pnode.nextElementSibling)
		{
			//if (pnode.nextElementSibling.tagName.toLowerCase()=="div")
			{
				//console.log(pnode.nextElementSibling);
				pnode.nextElementSibling.removeSelf();
			//	break;
			}
			//else
				//pnode=pnode.nextElementSibling;
		}
	});
}

function enlarge()
{
	if (!instagram_mode.isPicture) return;
	var pimg=document.querySelectorAll('article > div img[src^="http"]');
	Array.prototype.forEach.call(pimg, function(node){
		var kurl=imagehack.hackimage(node.src);
		if (kurl!=node.src) node.src=kurl;
	});
}

function ondomchange()
{
	clean_insta();
	enlarge();
}

if (instagram_mode.isPicture)
{
	var user = _sharedData.entry_data.ProfilePage[0].graphql.user;
	var timeline = user.edge_owner_to_timeline_media.edges;
	var post = __additionalData[location.pathname].data.graphql.shortcode_media;
	var end_cursor = user.edge_owner_to_timeline_media.page_info.end_cursor;
	var profile_url = document.querySelector('header a').href;
	var position_node = document.querySelector('section > a > time').parentNode;
	var node = document.createElement('a');
	node.href = profile_url;
	node.search = '?max_id=' + post.id;

	node.className = position_node.className;
	node.text = 'GoAsTop';

	position_node.parentNode.insertBefore(node, position_node);
}
