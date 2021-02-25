// ==UserScript==
// @name        wbfriend
// @namespace   http://userscripts.org/users/
// @match	*://weibo.com/*
// @version     0.3
// @noframes
// @grant none
// @require	utils.js
// @downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/wbfriend.user.js
// ==/UserScript==


function getGroupAPIParamStr()
{
	var dict=parseQueryStringToDictionary(window.location.href);
	var gid=0, page=1, count=30;
	if (dict.hasOwnProperty("gid"))
	{
		gid=dict["gid"];
	}
	else if (dict.hasOwnProperty("ignoreg") && dict["ignoreg"]==1)		//no use, default 0 any way
	{
		gid=0;
	}
	if (dict.hasOwnProperty("Pl_Official_RelationMyfollow__92_page"))
		page=dict["Pl_Official_RelationMyfollow__92_page"];
	if (page<=0) page=1;
	var cursor=(page-1)*count;
	return {source:351354573, list_id: gid, count: count, cursor:cursor};
}


function addInvisibleFollow(uid)
{
	var nodehtml='<li class="member_li S_bg1" node-type="user_item" action-type="user_item" action-data="uid=%uid%&amp;screen_name=%uid%"><a target="_blank" action-type="ignore_list" node-type="screen_name" href="/u/%uid%" class="S_txt1" title="%uid%" usercard="id=%uid%">%uid%</a></li>'.replaceAll("%uid%", uid);
	var formhtml='<form method="post" action="https://api.weibo.com/2/friendships/destroy.json" onsubmit="(function (event){event.target.parentNode.disappear();return true;})(event);"><input type="hidden" name="uid" value="%uid%"><input type="hidden" name="source" value="351354573"><input type="submit" value="取消关注"></form>'.replaceAll("%uid%", uid);
	var grouproot=document.querySelector('ul.member_ul');
	if (grouproot)
	{
		var node=document.createElementHTML(nodehtml);
		grouproot.appendChild(node);
		var theform=document.createElementHTML(formhtml);
		theform.target=hidden_frame_name;
		node.appendChild(theform);
	}
}

const name_visible="follow_visible";

function getVisibleFollowId()
{
	if (window.hasOwnProperty(name_visible)) delete window[name_visible];
	var nodes=document.querySelectorAll("ul.member_ul li.member_li");
	window[name_visible]=Array.prototype.map.call(nodes, function (node){
		var data=node.getAttribute("action-data");
		if (data)
		{
			var param=parseQueryStringToDictionary(data);
			if (param.hasOwnProperty("uid")) return parseInt(param["uid"]);
		}
		else return null;
	});
}

function diff_uids(uids)
{
	Array.prototype.forEach.call(uids, function(uid){
		if (window[name_visible].indexOf(uid)<0)
		{
			addInvisibleFollow(uid);
		}
	});
}


function fire4group()
{
	getVisibleFollowId();
	window.STK.jsonp({
		url : 'https://api.weibo.com/2/friendships/groups/members/ids.json',
		method : 'get', responseType : 'json', timeout : 3e4, isEncode : true,
		//onTraning : STK.funcEmpty, onFail : STK.funcEmpty,
		args : getGroupAPIParamStr(), varkey : 'callback',
		onComplete : function (result) {
			if (result.code==1)
			{
				diff_uids(result.data.users);
			}
			else
				console.log("ajax result error", result);
		},
	});
}

const menuid="cleanfriend";
window.fire4group=fire4group;
const hidden_frame_name="hiddenframe";

function addMenu()
{
	var menubar=document.querySelector('div.opt_bar div.W_fl');
	if (menubar && !document.querySelector('a#'+menuid))
	{
		var menubtn=document.createElementHTML('<a href="javascript:void(0);" class="btn_link S_txt1" onclick="fire4group();" action-data="gid=">清理关注</a>');
		menubtn.id=menuid;
		menubar.appendChild(menubtn);
		//add hidden frame for form submit
		var hframe=document.createElementHTML('<IFRAME style="display:none"></IFRAME>');
		hframe.name=hidden_frame_name;
		document.body.appendChild(hframe);
	}
}

document.body.observe(addMenu);

