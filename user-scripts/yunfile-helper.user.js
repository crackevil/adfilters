// ==UserScript==
// @name        yunfile-helper
// @namespace   http://userscripts.org/users/
// @include     http://*.yunfile.com/*
// @include     http://yunfile.com/*
// @version     0.2
// @grant       none
// @updateURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/77pan-helper.user.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/77pan-helper.user.js
// ==/UserScript==

var url=window.location.href;
var path=window.location.pathname;
var path_step2="/file/down/";

function opr_step1()
{
	clearInterval(timer1);
	redirectDownPage();
}

if (url.indexOf("dl")<0 && path.indexOf(path_step2)<0)
{
	var node1=document.querySelector("div#skyblue_dlg2");
	if (node1) node1.parentNode.removeChild(node1);
	var node1=document.querySelector("div#login_registBox2");
	if (node1) node1.parentNode.removeChild(node1);
	//operation button
	var basement=document.querySelector("div.operation");
	var thebtn=document.createElement("button");
	thebtn.innerHTML="quick";
	thebtn.onclick=opr_step1;
	basement.appendChild(thebtn);

	//operation link
	var linkelem=document.createElement("a");
	linkelem.id="yfquick";
	linkelem.target="_new";
	//basement.appendChild(linkelem);

	//var fncbody=redirectDownPage.toString();
	//linkelem.innerHTML="new";
	if (show_vcode) show_vcode();
}


if (path.indexOf(path_step2)>=0)
{
	var theform=document.querySelector("form.tform");
	Array.prototype.forEach.call(theform.childNodes, function (child) {
					var tname=child.tagName;
					if (tname && tname.toLowerCase()=="input" && child.type=="hidden")
					{
						child.type="text";
					}
				});
}

