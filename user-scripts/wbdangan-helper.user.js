// ==UserScript==
// @name        wbdangan-helper
// @namespace   http://userscripts.org/users/
// @include     *://*.weibodangan.com/*
// @include     *://weibo.wbdacdn.com/*
// @version     0.2
// @grant       none
// @require	utils.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/wbdangan-helper.user.js
// ==/UserScript==
/*
Array.prototype.forEach.call(document.querySelectorAll("div.image_hide"), function(node){
	node.classList.remove("image_hide");
});
*/
/*
Array.prototype.forEach.call(document.querySelectorAll("div.no_vip"), function(node){
	node.classList.remove("no_vip");
});
*/
$.cookie("vip_user", 1);
window.is_vip=function (){};
if (location.protocol == 'http:' && location.host == 'sinacn.weibodangan.com')
    {
      //location.href = location.href.replace('http', 'https');
    }

window.weibos_is_delete=function(){};
document.removeClass("is_delete");
document.removeClass("user_delete");
document.removeClass("image_hide");

