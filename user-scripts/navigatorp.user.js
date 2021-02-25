// ==UserScript==
// @name        navigator_plugins_spoofing
// @namespace   http://userscripts.org/users/
// @include	*
// @exclude	http://*.cntv.cn/*
// @exclude	https://*.spdbccc.com.cn/*
// @version     0.1
// @run-at      document-start
// @grant	none
// updateURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/navigatorp.user.js
// downloadURL   https://github.com/crackevil/adfilters/raw/content/user-scripts/navigatorp.user.js
// ==/UserScript==


Object.defineProperty(navigator, 'plugins', {
  get: function () {
    return { length: 0 };
  }
});

