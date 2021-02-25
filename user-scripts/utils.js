function parseQueryStringToDictionary(queryString)
{
	var dictionary = {};

	var pos=queryString.indexOf('?');
	if (pos>=0) queryString = queryString.substr(pos+1);

	pos=queryString.indexOf('#');
	if (pos>=0) queryString = queryString.substr(0, pos);
	var parts = queryString.split('&');

	for(var i = 0; i < parts.length; i++)
	{
		var keyValuePair = parts[i].split('=');
		var key = keyValuePair[0];
		var value = keyValuePair[1];

		value = decodeURIComponent(value);
		value = value.replace(/\+/g, ' ');

		dictionary[key] = value;
	}

	return dictionary;
}

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.unique = function()
{
	return this.filter(function() {
		var seen = {};
		return function(element, index, array) {
			return !(element in seen) && (seen[element] = 1);
		};
	}());
}

function disableHTTPS()
{
	if (window.location.protocol=="https:")
	{
		window.location.protocol="http";
	}
}


function returnProperty(propertyName)
{
	return function (obj) {
		try
		{
			return obj[propertyName];
		}
		catch (e)
		{
			return null;
		}
	};
}

HTMLElement.prototype.removeSelf=function()
{
	this.parentNode.removeChild(this);
}

HTMLElement.prototype.disappear=function()
{
	this.style.display="none";
}

HTMLElement.prototype.removeSelectorAll=function (sel)
{
	var sep=sel.indexOf("##");
	var selector=sep>=0 ? sel.substr(sep+2) : sel;
	Array.prototype.forEach.call(this.querySelectorAll(selector), function(node){
		if (node) node.removeSelf();
	});
}

HTMLDocument.prototype.removeSelectorAll=function (sel)
{
	this.documentElement.removeSelectorAll(sel);
}

HTMLElement.prototype.killElementAttribute=function (selector, attrname)
{
	nodes = Array.from(this.querySelectorAll(selector));
	nodes.push(this);
	Array.prototype.forEach.call(nodes, function(node){
		if (node.hasAttribute(attrname)) node.removeAttribute(attrname);
	});
}

HTMLDocument.prototype.killElementAttribute=function (selector, attrname)
{
	this.documentElement.killElementAttribute(selector, attrname);
}

HTMLDocument.prototype.createElementHTML=function (content)
{
	var mock=this.createElement("div");
	mock.innerHTML=content;
	return mock.firstChild;
}

HTMLElement.prototype.removeClass=function(className)
{
	Array.prototype.forEach.call(this.querySelectorAll("."+className), function (node){
		node.classList.remove(className);
	});
}

HTMLDocument.prototype.removeClass=function(className)
{
	this.documentElement.removeClass(className);
}

HTMLElement.prototype.observe_timed=function (func)
{
	var ts=this;
	var trigger={
		timer : null,
		callback : func,
		ontrig : function(){
			var t=this;
			if (!t.timer)
			{
				t.timer=setTimeout(function(){
					clearTimeout(t.timer);
					t.timer=null;
					t.callback();
				}, 300, false);
			}
		},
	};
	var obs=new (window.MutationObserver||window.WebKitMutationObserver)(trigger.ontrig.bind(trigger));
	window.addEventListener("unload", function(event){
		obs.disconnect();
	});
	obs.observe(ts, {attributes: true, childList: true, subtree: true});
}


HTMLElement.prototype.observe=function (func)
{
	var ts=this;
	var obs_config={attributes: true, childList: true, subtree: true};
	var observer=null;
	var masked=function (){obs.disconnect();func();obs.observe(ts,obs_config);};
	obs=new (window.MutationObserver||window.WebKitMutationObserver)(masked);
	ts.addEventListener("unload", function(event){
		obs.disconnect();
	});
	obs.observe(ts, obs_config);
}


function clearAllIntervals()
{
	(function(w){w = w || window; var i = w.setInterval(function(){},100000); while(i>=0) { w.clearInterval(i--); }})(/*window*/);
}

function clearAllIntervals2()
{
	(function(w){w = w || unsafeWindow; var i = 100; while(i>=0) { w.clearInterval(i--); }})(/*window*/);
}

