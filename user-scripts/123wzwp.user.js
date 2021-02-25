// ==UserScript==
// @name        wzwp
// @namespace   http://userscripts.org/users/
// @match     http://*.123wzwp.com/*
// @version     0.1
// @grant	GM_registerMenuCommand
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/123wzwp.user.js
// ==/UserScript==


var p=window.location.pathname;
var fid=p.match(/-(\d+)\./i)[1];
function go4down()
{
	if (p.startsWith('/down-'))
	{
		document.getElementById('down_box').style.display ='';

		var anode=document.querySelector('a#dnode_3');
		anode.href=anode.getAttribute('data-url');
		anode.onclick="";
	}
}

GM_registerMenuCommand("go4down", go4down, "g");

if (p.startsWith('/file-'))
{
	var anode=document.createElement("a");
	anode.href='/down2-'+fid+'.html';
	document.body.appendChild(anode);
	anode.click();
}

if (p.startsWith('/down2-'))
{
	var anode=document.querySelector('div#down_link a.down_now');
	if (anode) anode.click();
}




