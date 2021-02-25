// ==UserScript==
// @name        youtubedl
// @namespace   http://userscripts.org/users/
// @match     https://www.youtube.com/watch?v=*
// @version     0.6
// @grant       GM_registerMenuCommand
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/youtubedl.user.js
// ==/UserScript==

function split_fmts(s)
{
	return s.split(",").map(parseQueryStringToDictionary);
}

var Js = {
Sp: function (a, b) {
a.splice(0, b)
},
Ay: function (a, b) {
var c = a[0];
a[0] = a[b % a.length];
a[b] = c
},
jv: function (a) {
a.reverse()
}
},
Ks = function (a) {
a = a.split('');
Js.Sp(a, 1);
Js.Ay(a, 68);
Js.jv(a, 2);
Js.Ay(a, 17);
Js.Ay(a, 3);
Js.Sp(a, 1);
Js.Ay(a, 48);
Js.jv(a, 60);
Js.Sp(a, 2);
return a.join('')
};


function prepare_youtube_data()
{
	var cfg_arr=[];
	var cfg_args=unsafeWindow.ytplayer.config.args;
	var make_url = function(plobj)
	{
		var sig = plobj['s'];
		return sig?plobj['url']+'&signature='+Ks(sig):plobj['url'];
	};
	if (cfg_args)
	{
		if (cfg_args.hasOwnProperty("adaptive_fmts"))
		{
			var cfg_objs=split_fmts(cfg_args.adaptive_fmts);
			var make_label = function (plobj)
			{
				var lb1 = 'quality_label', lb2 = 'bitrate';
				var label;
				if (plobj.hasOwnProperty(lb1))
					label = plobj[lb1];
				else if (plobj.hasOwnProperty(lb2))
				{
					label = plobj[lb2]
				}
				else
					label = 'Unkown'
			}
			var col1a=cfg_objs.map(returnProperty("quality_label"));
			var col1b=cfg_objs.map(returnProperty("bitrate"));
			var col1=[];
			for (var i=0;i<col1a.length;i++)
			{
				col1.push(col1a[i]?col1a[i]:col1b[i]);
			}
			var col2=cfg_objs.map(returnProperty("type"));
			
			var col3=cfg_objs.map(make_url);
			cfg_arr.push([col1,col2,col3]);
		}
		if (cfg_args.hasOwnProperty("url_encoded_fmt_stream_map"))
		{
			var cfg_objs=split_fmts(cfg_args.url_encoded_fmt_stream_map);
			var col1=cfg_objs.map(returnProperty("quality"));
			var col2=cfg_objs.map(returnProperty("type"));
			var col3=cfg_objs.map(make_url);
			cfg_arr.push([col1,col2,col3]);
		}
	}
	else
	{
		alert("ytplayer.config.args NOT FOUND");
	}
	return cfg_arr;
}

function generate_table_view(data)	//just for one table, return a <TABLE> element
{
	var nRows=data[0].length;
	var nCols=data.length;
	var ttable=document.createElement("table");
	for (var i=0;i<nRows;i++)
	{
		var row=ttable.insertRow(-1);
		for (var j=0;j<nCols;j++)
		{
			var cell=row.insertCell(j);
			var cellValue=data[j][i];
			if (j<nCols-1)
				cell.innerHTML=cellValue;
			else
			{
				var tinput=document.createElementHTML('<input type="text">');
				tinput.value=cellValue;
				cell.appendChild(tinput);
			}
		}
	}
	return ttable;
}

function prepare_dlbtn()	//panel not work
{
	var actionbar=document.querySelector("div#watch8-secondary-actions");
	var downbtn=document.createElementHTML('<button data-tooltip-text="Download" class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity action-panel-trigger action-panel-trigger-download yt-uix-tooltip" type="button" onclick=";return false;" title="Download" data-trigger-for="action-panel-download" data-button-toggle="true"><span class="yt-uix-button-content">Download</span></button>');
	actionbar.appendChild(downbtn);

	var closebtn=document.querySelector("button#action-panel-dismiss");
	var downpanel=document.createElementHTML('<div id="action-panel-download" class="action-panel-content hid"></div>');
	closebtn.parentNode.insertBefore(downpanel, closebtn);
}

function dltest()
{
	var afterplayer=document.querySelector("div#watch7-container");
	var id_dl="youtubedl";
	var div1=document.querySelector("#"+id_dl);
	if (div1) div1.parentNode.removeChild(div1);
	div1=document.createElement("div");
	div1.id=id_dl;

	var tables=prepare_youtube_data().map(generate_table_view);
	var elements=tables.map(function (table){
		var pelement=document.createElement("p");
		pelement.appendChild(table);
		return pelement;
	});
	elements.forEach(function (elem){
		div1.appendChild(elem);
	});
	afterplayer.parentNode.insertBefore(div1, afterplayer);
}

function dldebug()
{
	var cfg_args = unsafeWindow.ytplayer.config.args;

	var afterplayer=document.querySelector("div#watch7-container");
	var tbox1=document.createElement("textarea");
	afterplayer.parentNode.insertBefore(tbox1, afterplayer);
	if (cfg_args.hasOwnProperty("adaptive_fmts"))
	{
		var cfg_str1=cfg_args.adaptive_fmts;
		var objs1=split_fmts(cfg_str1);
		tbox1.innerHTML=JSON.stringify(objs1);
	}
	var tbox2=document.createElement("textarea");
	afterplayer.parentNode.insertBefore(tbox2, afterplayer);
	if (cfg_args.hasOwnProperty("url_encoded_fmt_stream_map"))
	{
		var cfg_str2=unsafeWindow.ytplayer.config.args.url_encoded_fmt_stream_map;
		var objs2=split_fmts(cfg_str2);
		tbox2.innerHTML=JSON.stringify(objs2);
	}
}

GM_registerMenuCommand("dltest", dltest, "d");
GM_registerMenuCommand("dldebug", dldebug, "g");
