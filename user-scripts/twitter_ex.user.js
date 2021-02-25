// ==UserScript==
// @name        twitter_ex
// @description  twitter web enhanced
// @namespace   http://userscripts.org/users/
// @match     https://twitter.com/*
// @match     https://www.twitter.com/*
// @version     0.4
// @grant	none
// @require	utils.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/twitter_ex.user.js
// ==/UserScript==

function new_topbar()
{
	var glbnav=document.querySelector("ul#global-actions");
	if (glbnav)
	{
		var html_fav='<li id="global-nav-fav" data-global-action="fav"> <a data-original-title="" class="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="/i/likes" data-nav="favorites"> <span class="text">Favorites</span> </a> </li>';
		var html_adv_search='<li id="global-nav-advsearch" data-global-action="advsearch"> <a data-original-title="" class="js-nav js-tooltip js-dynamic-tooltip" data-placement="bottom" href="/search-advanced" data-nav="advsearch"> <span class="text">Advanced Search</span> </a> </li>';
		glbnav.appendChild(document.createElementHTML(html_fav));
		glbnav.appendChild(document.createElementHTML(html_adv_search));
	}
	var mmt=document.querySelector(".js-moments-tab");
	if (mmt) mmt.removeSelf();
}

function unshort_links()
{
	Array.prototype.forEach.call(document.querySelectorAll('a[data-expanded-url]'), function (link){
		link.href=link.getAttribute('data-expanded-url');
		link.removeAttribute("data-expanded-url");
	});
}

/*
var path=window.location.pathname.toLowerCase();
if (path.indexOf("/i/likes")>=0)
{
	var favbtn=glbnav.querySelector("#global-nav-fav");
	if (favbtn)
	{
		favbtn.classList.add("active");
	}
}
*/



new_topbar();
unshort_links();
document.body.observe(unshort_links);
