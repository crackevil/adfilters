function document_by_url(url)
{
	var response=GM_xmlhttpRequest({
		method: "GET",
		synchronous: true,
		url: url
	});
	var doc = document.implementation.createHTMLDocument("");
	doc.documentElement.innerHTML = response.responseText;
	return doc;
}

//will return url after hack. url will changed if hack succesful
var imagehack={
	rules:[
		{re:new RegExp("(http://ww\\d\\.sinaimg\\.cn)/[^/]+/([^/]+)",'i'), repl:"$1/large/$2"},
		{re:new RegExp("\.*://s\\d+\\.postimg\\.org/([^\\/]+)/\.*",'i'), repl:function (url){
			var repl="http://postimg.org/image/$1/full/";
			var redirect=url.replace(this.re, repl);
			var result=redirect;
			var doc=document_by_url(redirect);
			var img=doc.querySelector("img");
			result=img.src;
			return result;
		}},
		{re:new RegExp("(https?://i\\d+\\.photobucket\\.com/albums/[^~]+)", "i"), repl:"$1~original"},
		{re:new RegExp("https?://p\\d+\\.imageab\\.com/\\d+/\\d+/\\d+/./([^/\\.]+)\\..+","i"), repl:function(url){
			var repl="http://www.imageab.com/image/$1";
			var redirect=url.replace(this.re, repl);
			var result=redirect;
			var doc=document_by_url(redirect);
			var img=doc.querySelector("#imageContainer img[id]");
			result=img.src;
			return result;
		}},
		{re:new RegExp("(https?)://(.+)\\.imgs\\.ck101\\.com/t/\\d+/([^?/]+).*","i"), repl:"$1://$2.imgs.cc/img/$3"},
		[{re:new RegExp("(https?):\/\/igcdn-photos[^\/]+.akamaihd.net/hphotos-[^\/]+/(.*)", "i"), repl:"$1://scontent.cdninstagram.com/$2"}, {re:new RegExp("(https?://scontent.cdninstagram.com/.*)/e\\d+/(.*)", "i"), repl:"$1/$2"}, {re:new RegExp("(https?://scontent.cdninstagram.com/.*)/p\\d[^/]*/(.*)", "i"), repl:"$1/$2"}, {re:new RegExp("(https?://scontent.cdninstagram.com/.*)/s\\d[^/]*/(.*)", "i"), repl:"$1/$2"}, {re:new RegExp("(https?://scontent.cdninstagram.com/.*)/sh\\d[^/]*/(.*)", "i"), repl:"$1/$2"}],
	],
	rule_process:function (rule_pair, url){
		var result=url;
		if (rule_pair.re.test(url))
		{
			if (typeof rule_pair.repl==="function")
				result=url.replace(rule_pair.re, rule_pair.repl.bind(rule_pair));
			else
				result=url.replace(rule_pair.re, rule_pair.repl);
		}
		return result;
	},
	hackimage:function (url){
		var result=url;
		for (var i=0;i<this.rules.length;i++)
		{
			var rule=this.rules[i];
			var temp=Object.prototype.toString.call(rule).indexOf("Array")<0 ? this.rule_process(rule, url) : rule.reduce((function (t){
				return function (prev, curr){
					return t.rule_process(curr, prev);
				};
			})(this), url);
			if (temp!=url)
			{
				result = temp;
				break;
			}
		}
		return result;
	},
};

var image_page={
	get_image_nodes:function (root) {return root.querySelectorAll("img");},
	get_image_inputs:function (root) {return root.querySelectorAll('input[type="image"]');},
	transit_input_elem:function (root){
		if (typeof root==="undefined") root=document.body;
		var inputlist=this.get_image_inputs(root);
		for (var nInput=0;nInput<inputlist.length;nInput++)
		{
			var inputnode=inputlist[nInput];
			var imagenode=document.createElement("img");
			var attrs=inputnode.attributes;
			for (var nAttr=0;nAttr<attrs.length;nAttr++)
			{
				var attr=attrs[nAttr];
				var aName=attr.name;
				if (aName=="type") continue;
				imagenode.setAttribute(aName, attr.value);
			}
			inputnode.parentNode.replaceChild(imagenode, inputnode);
		}
	},
	hack_imagenodes:function (root){
		if (typeof root==="undefined") root=document.body;
		var imginput=this.get_image_inputs(root);
		var imglist=this.get_image_nodes(root);
		var imgnodes=Array.prototype.slice.call(imglist).concat(Array.prototype.slice.call(imginput));
		for (var i=0;i<imgnodes.length;i++)
		{
			var node=imgnodes[i];
			var ourl=node.src;
			var url=imagehack.hackimage(ourl);
			if (url!=ourl)
			{
				node.style.maxWidth=node.width.toString()+"px";
				node.style.maxHeight=node.height.toString()+"px";
				node.src=url;
			}
		}
	},
};

