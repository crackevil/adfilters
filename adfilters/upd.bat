call d:\programs\python27_env\scripts\activate.bat
setlocal
setlocal EnableDelayedExpansion
set cmmd=python ..\adputil.py add
%cmmd% baidu.txt
%cmmd% combo_exception.txt
%cmmd% elemhide.txt
%cmmd% general_exception.txt
%cmmd% sites_host.txt
%cmmd% urlfilters.txt
%cmmd% weibo.txt
%cmmd% wp_plugins_filter.txt
%cmmd% thirdparty.txt
