// ==UserScript==
// @name        t66y-helper
// @namespace   http://userscripts.org/users/
// @match     *://t66y.com/*
// @match     *://www.t66y.com/*
// @version     0.3
// @grant       GM_xmlhttpRequest
// @require	imagehack.js
// @require	utils.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/t66y-helper.user.js
// ==/UserScript==

//replace viidii link to normal link
//replace image url and click event
//replace image to largest ones

//(function() {


	var viidii_cleaner={
		viidii_flag:/http:\/\/(?:www\.)?viidii\.info\/\?(.*)&z/i,
		//var viidii_flag:new RegExp("http://(?:www\\.)?viidii\\.info/\\?(.*)&z","i"),
		clean:function (url){
			var viidii=this.viidii_flag.exec(url);
			return viidii ? viidii[1].replace(/_{6}(?!_)/ig,".") : url;
		},
		replace:function (text){
			return text.replace(this.viidii_flag, this.clean.bind(this));	//be careful with "this" here
		},
	};

	var cl_helper={
		context:{},
		context_init:function (){
			this.context.bodyroot=document.querySelector(".tpc_content");
			this.context.linklist=this.context.bodyroot.querySelectorAll("a");
			this.context.imginput=this.context.bodyroot.querySelectorAll('input[type="image"]');
			this.context.imglist=this.context.bodyroot.querySelectorAll("img");
		},
		clear_link:function (){
			for (var i=0;i<cl_helper.context.linklist.length;i++)
			{
				var node=cl_helper.context.linklist[i];
				var url1=node.href;
				if (url1)
				{
					var url2=viidii_cleaner.clean(url1);
					node.href=url2;
				}
			}
		},
		clear_img_click:function (){
			var clicknodes=Array.prototype.slice.call(this.context.imglist).concat(Array.prototype.slice.call(this.context.imginput));
			for (var i=0;i<clicknodes.length;i++)
			{
				var node=clicknodes[i];
				var func=node.onclick;
				if (func)
				{
					node.removeAttribute("onclick");
				}
			}
		},
		unfreeze_player:function (){
			var players=this.context.bodyroot.querySelectorAll('embed');
			for (var i=0;i<players.length;i++)
			{
				var iframe = document.createElement('iframe');
				var p=players[i];
				iframe.src = p.src;
				iframe.width = p.width;
				iframe.height = p.height;
				p.parentNode.replaceChild(iframe, p);
			}
		},
	};
	cl_helper.context_init();
	cl_helper.clear_link();
	cl_helper.clear_img_click();
	cl_helper.unfreeze_player();
	image_page.transit_input_elem(cl_helper.context.bodyroot);
	image_page.hack_imagenodes(cl_helper.context.bodyroot);
//})();

