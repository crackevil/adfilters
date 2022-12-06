// ==UserScript==
// @name        微博灰色恢复彩色页面
// @description  Disable grayscale on weibo.com
// @match        https://weibo.com/*
// @grant       none
// @version     1
// @run-at       document-end
// @namespace https://weibo.com/
// @icon         https://weibo.com/favicon.ico
// ==/UserScript==

(function(){
    document.getElementById('plc_frame').querySelector('style').remove();
    
})();