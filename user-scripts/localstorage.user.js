// ==UserScript==
// @name        localstorage_spoofing
// @namespace   http://userscripts.org/users/
// @match	http://*/*
// @match	https://*/*
// @exclude	*://y.qq.com/*
// @version     0.1
// @run-at      document-start
// @grant	none
// downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/localstorage.user.js
// ==/UserScript==

var mockStorage={
	length:0,
	clear:function (){},
	getItem:function (){return null;},
	key:function (){return null;},
	removeItem:function (){},
	setItem:function (){},
};

//unsafeWindow.localStorage=mockStorage;


Object.defineProperty(unsafeWindow, 'localStorage', {
  get: function () {
    return mockStorage;
  }
});

