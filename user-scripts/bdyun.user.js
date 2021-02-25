// ==UserScript==
// @name        bdyun
// @namespace   http://userscripts.org/users/
// @match     *://pan.baidu.com/disk/home*
// @match     *://yun.baidu.com/disk/home*
// @version     0.3
// @grant       GM_registerMenuCommand
// @require	utils.js
// @downloadURL		https://github.com/crackevil/adfilters/raw/content/user-scripts/bdyun.user.js
// ==/UserScript==

document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		main();
	}
}





function test_upload()
{
	var uppath=encodeURIComponent("/"+document.getElementById("apath").value);
	var fsize=document.getElementById("asize").value;
	var fmd5=document.getElementById("amd5").value;
	var formurl="/api/create?a=commit&bdstoken="+unsafeWindow.yunData.MYBDSTOKEN+"&web=1&app_id=250528";

	var data="path="+uppath+"&isdir=0&size="+fsize+"&block_list=%5B%22"+fmd5+"%22%5D&method=post";
	var $=$ || unsafeWindow.$;

	$.post(formurl, data);
}



function main()
{
	GM_registerMenuCommand("md5upload", test_upload, "m");
	var thebar=document.querySelector("div.bar");
	var pnode=thebar.parentNode;
	var uploadUI=document.createElementHTML('<div>path:<input type="text" id="apath">size:<input type="text" id="asize">md5:<input type="text" id="amd5"></div>');
	pnode.insertBefore(uploadUI, thebar);
}
