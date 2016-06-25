var requirejs,require,define;!function(global,setTimeout){function commentReplace(a,b,c,d){return d||""}function isFunction(a){return"[object Function]"===ostring.call(a)}function isArray(a){return"[object Array]"===ostring.call(a)}function each(a,b){if(a){var c;for(c=0;c<a.length&&(!a[c]||!b(a[c],c,a));c+=1);}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1&&(!a[c]||!b(a[c],c,a));c-=1);}}function hasProp(a,b){return hasOwn.call(a,b)}function getOwn(a,b){return hasProp(a,b)&&a[b]}function eachProp(a,b){var c;for(c in a)if(hasProp(a,c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){(c||!hasProp(a,e))&&(!d||"object"!=typeof b||!b||isArray(b)||isFunction(b)||b instanceof RegExp?a[e]=b:(a[e]||(a[e]={}),mixin(a[e],b,c,d)))}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(a){throw a}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function q(a){var b,c;for(b=0;b<a.length;b++)if(c=a[b],"."===c)a.splice(b,1),b-=1;else if(".."===c){if(0===b||1===b&&".."===a[2]||".."===a[b-1])continue;b>0&&(a.splice(b-1,2),b-=2)}}function r(a,b,c){var d,e,f,h,i,j,k,l,m,n,o,p,r=b&&b.split("/"),s=g.map,t=s&&s["*"];if(a&&(a=a.split("/"),k=a.length-1,g.nodeIdCompat&&jsSuffixRegExp.test(a[k])&&(a[k]=a[k].replace(jsSuffixRegExp,"")),"."===a[0].charAt(0)&&r&&(p=r.slice(0,r.length-1),a=p.concat(a)),q(a),a=a.join("/")),c&&s&&(r||t)){f=a.split("/");a:for(h=f.length;h>0;h-=1){if(j=f.slice(0,h).join("/"),r)for(i=r.length;i>0;i-=1)if(e=getOwn(s,r.slice(0,i).join("/")),e&&(e=getOwn(e,j))){l=e,m=h;break a}!n&&t&&getOwn(t,j)&&(n=getOwn(t,j),o=h)}!l&&n&&(l=n,m=o),l&&(f.splice(0,m,l),a=f.join("/"))}return d=getOwn(g.pkgs,a),d?d:a}function s(a){isBrowser&&each(scripts(),function(b){return b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===d.contextName?(b.parentNode.removeChild(b),!0):void 0})}function t(a){var b=getOwn(g.paths,a);return b&&isArray(b)&&b.length>1?(b.shift(),d.require.undef(a),d.makeRequire(null,{skipMap:!0})([a]),!0):void 0}function u(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function v(a,b,c,e){var f,g,h,i,j=null,k=b?b.name:null,m=a,n=!0,q="";return a||(n=!1,a="_@r"+(o+=1)),i=u(a),j=i[0],a=i[1],j&&(j=r(j,k,e),g=getOwn(l,j)),a&&(j?q=g&&g.normalize?g.normalize(a,function(a){return r(a,k,e)}):-1===a.indexOf("!")?r(a,k,e):a:(q=r(a,k,e),i=u(q),j=i[0],q=i[1],c=!0,f=d.nameToUrl(q))),h=!j||g||c?"":"_unnormalized"+(p+=1),{prefix:j,name:q,parentMap:b,unnormalized:!!h,url:f,originalName:m,isDefine:n,id:(j?j+"!"+q:q)+h}}function w(a){var b=a.id,c=getOwn(h,b);return c||(c=h[b]=new d.Module(a)),c}function x(a,b,c){var d=a.id,e=getOwn(h,d);!hasProp(l,d)||e&&!e.defineEmitComplete?(e=w(a),e.error&&"error"===b?c(e.error):e.on(b,c)):"defined"===b&&c(l[d])}function y(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=getOwn(h,b);c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function z(){globalDefQueue.length&&(each(globalDefQueue,function(a){var b=a[0];"string"==typeof b&&(d.defQueueMap[b]=!0),k.push(a)}),globalDefQueue=[])}function A(a){delete h[a],delete i[a]}function B(a,b,c){var d=a.map.id;a.error?a.emit("error",a.error):(b[d]=!0,each(a.depMaps,function(d,e){var f=d.id,g=getOwn(h,f);!g||a.depMatched[e]||c[f]||(getOwn(b,f)?(a.defineDep(e,l[f]),a.check()):B(g,b,c))}),c[d]=!0)}function C(){var a,c,e=1e3*g.waitSeconds,h=e&&d.startTime+e<(new Date).getTime(),j=[],k=[],l=!1,m=!0;if(!b){if(b=!0,eachProp(i,function(a){var b=a.map,d=b.id;if(a.enabled&&(b.isDefine||k.push(a),!a.error))if(!a.inited&&h)t(d)?(c=!0,l=!0):(j.push(d),s(d));else if(!a.inited&&a.fetched&&b.isDefine&&(l=!0,!b.prefix))return m=!1}),h&&j.length)return a=makeError("timeout","Load timeout for modules: "+j,null,j),a.contextName=d.contextName,y(a);m&&each(k,function(a){B(a,{},{})}),h&&!c||!l||!isBrowser&&!isWebWorker||f||(f=setTimeout(function(){f=0,C()},50)),b=!1}}function D(a){hasProp(l,a[0])||w(v(a[0],null,!0)).init(a[1],a[2])}function E(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function F(a){var b=a.currentTarget||a.srcElement;return E(b,d.onScriptLoad,"load","onreadystatechange"),E(b,d.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}function G(){var a;for(z();k.length;){if(a=k.shift(),null===a[0])return y(makeError("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));D(a)}d.defQueueMap={}}var b,c,d,e,f,g={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},h={},i={},j={},k=[],l={},m={},n={},o=1,p=1;return e={require:function(a){return a.require?a.require:a.require=d.makeRequire(a.map)},exports:function(a){return a.usingExports=!0,a.map.isDefine?a.exports?l[a.map.id]=a.exports:a.exports=l[a.map.id]={}:void 0},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return getOwn(g.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}},c=function(a){this.events=getOwn(j,a.id)||{},this.map=a,this.shim=getOwn(g.shim,a.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},c.prototype={init:function(a,b,c,d){d=d||{},this.inited||(this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check())},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0,d.startTime=(new Date).getTime();var a=this.map;return this.shim?void d.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()})):a.prefix?this.callPlugin():this.load()}},load:function(){var a=this.map.url;m[a]||(m[a]=!0,d.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id,e=this.depExports,f=this.exports,g=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(g)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{f=d.execCb(c,g,e,f)}catch(h){a=h}else f=d.execCb(c,g,e,f);if(this.map.isDefine&&void 0===f&&(b=this.module,b?f=b.exports:this.usingExports&&(f=this.exports)),a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",y(this.error=a)}else f=g;if(this.exports=f,this.map.isDefine&&!this.ignore&&(l[c]=f,req.onResourceLoad)){var i=[];each(this.depMaps,function(a){i.push(a.normalizedMap||a)}),req.onResourceLoad(d,this.map,i)}A(c),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(d.defQueueMap,c)||this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,c=v(a.prefix);this.depMaps.push(c),x(c,"defined",bind(this,function(c){var e,f,i,j=getOwn(n,this.map.id),k=this.map.name,l=this.map.parentMap?this.map.parentMap.name:null,m=d.makeRequire(a.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(c.normalize&&(k=c.normalize(k,function(a){return r(a,l,!0)})||""),f=v(a.prefix+"!"+k,this.map.parentMap),x(f,"defined",bind(this,function(a){this.map.normalizedMap=f,this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),i=getOwn(h,f.id),void(i&&(this.depMaps.push(f),this.events.error&&i.on("error",bind(this,function(a){this.emit("error",a)})),i.enable()))):j?(this.map.url=d.nameToUrl(j),void this.load()):(e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(h,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&A(a.map.id)}),y(a)}),e.fromText=bind(this,function(c,f){var h=a.name,i=v(h),j=useInteractive;f&&(c=f),j&&(useInteractive=!1),w(i),hasProp(g.config,b)&&(g.config[h]=g.config[b]);try{req.exec(c)}catch(k){return y(makeError("fromtexteval","fromText eval for "+b+" failed: "+k,k,[b]))}j&&(useInteractive=!0),this.depMaps.push(i),d.completeLoad(h),m([h],e)}),void c.load(a.name,m,e,g))})),d.enable(c,this),this.pluginMaps[c.id]=c},enable:function(){i[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,f,g;if("string"==typeof a){if(a=v(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[b]=a,g=getOwn(e,a.id))return void(this.depExports[b]=g(this));this.depCount+=1,x(a,"defined",bind(this,function(a){this.undefed||(this.defineDep(b,a),this.check())})),this.errback?x(a,"error",bind(this,this.errback)):this.events.error&&x(a,"error",bind(this,function(a){this.emit("error",a)}))}c=a.id,f=h[c],hasProp(e,c)||!f||f.enabled||d.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=getOwn(h,a.id);b&&!b.enabled&&d.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),"error"===a&&delete this.events[a]}},d={config:g,contextName:a,registry:h,defined:l,urlFetched:m,defQueue:k,defQueueMap:{},Module:c,makeModuleMap:v,nextTick:req.nextTick,onError:y,configure:function(a){if(a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/"),"string"==typeof a.urlArgs){var b=a.urlArgs;a.urlArgs=function(a,c){return(-1===c.indexOf("?")?"?":"&")+b}}var c=g.shim,e={paths:!0,bundles:!0,config:!0,map:!0};eachProp(a,function(a,b){e[b]?(g[b]||(g[b]={}),mixin(g[b],a,!0,!0)):g[b]=a}),a.bundles&&eachProp(a.bundles,function(a,b){each(a,function(a){a!==b&&(n[a]=b)})}),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),!a.exports&&!a.init||a.exportsFn||(a.exportsFn=d.makeShimExports(a)),c[b]=a}),g.shim=c),a.packages&&each(a.packages,function(a){var b,c;a="string"==typeof a?{name:a}:a,c=a.name,b=a.location,b&&(g.paths[c]=a.location),g.pkgs[c]=a.name+"/"+(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(h,function(a,b){a.inited||a.map.unnormalized||(a.map=v(b,null,!0))}),(a.deps||a.callback)&&d.require(a.deps||[],a.callback)},makeShimExports:function(a){function b(){var b;return a.init&&(b=a.init.apply(global,arguments)),b||a.exports&&getGlobal(a.exports)}return b},makeRequire:function(b,c){function f(g,i,j){var k,m,n;return c.enableBuildCallback&&i&&isFunction(i)&&(i.__requireJsBuild=!0),"string"==typeof g?isFunction(i)?y(makeError("requireargs","Invalid require call"),j):b&&hasProp(e,g)?e[g](h[b.id]):req.get?req.get(d,g,b,f):(m=v(g,b,!1,!0),k=m.id,hasProp(l,k)?l[k]:y(makeError("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+a+(b?"":". Use require([])")))):(G(),d.nextTick(function(){G(),n=w(v(null,b)),n.skipMap=c.skipMap,n.init(g,i,j,{enabled:!0}),C()}),f)}return c=c||{},mixin(f,{isBrowser:isBrowser,toUrl:function(a){var c,e=a.lastIndexOf("."),f=a.split("/")[0],g="."===f||".."===f;return-1!==e&&(!g||e>1)&&(c=a.substring(e,a.length),a=a.substring(0,e)),d.nameToUrl(r(a,b&&b.id,!0),c,!0)},defined:function(a){return hasProp(l,v(a,b,!1,!0).id)},specified:function(a){return a=v(a,b,!1,!0).id,hasProp(l,a)||hasProp(h,a)}}),b||(f.undef=function(a){z();var c=v(a,b,!0),e=getOwn(h,a);e.undefed=!0,s(a),delete l[a],delete m[c.url],delete j[a],eachReverse(k,function(b,c){b[0]===a&&k.splice(c,1)}),delete d.defQueueMap[a],e&&(e.events.defined&&(j[a]=e.events),A(a))}),f},enable:function(a){var b=getOwn(h,a.id);b&&w(a).enable()},completeLoad:function(a){var b,c,e,f=getOwn(g.shim,a)||{},i=f.exports;for(z();k.length;){if(c=k.shift(),null===c[0]){if(c[0]=a,b)break;b=!0}else c[0]===a&&(b=!0);D(c)}if(d.defQueueMap={},e=getOwn(h,a),!b&&!hasProp(l,a)&&e&&!e.inited){if(!(!g.enforceDefine||i&&getGlobal(i)))return t(a)?void 0:y(makeError("nodefine","No define call for "+a,null,[a]));D([a,f.deps||[],f.exportsFn])}C()},nameToUrl:function(a,b,c){var e,f,h,i,j,k,l,m=getOwn(g.pkgs,a);if(m&&(a=m),l=getOwn(n,a))return d.nameToUrl(l,b,c);if(req.jsExtRegExp.test(a))j=a+(b||"");else{for(e=g.paths,f=a.split("/"),h=f.length;h>0;h-=1)if(i=f.slice(0,h).join("/"),k=getOwn(e,i)){isArray(k)&&(k=k[0]),f.splice(0,h,k);break}j=f.join("/"),j+=b||(/^data\:|^blob\:|\?/.test(j)||c?"":".js"),j=("/"===j.charAt(0)||j.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+j}return g.urlArgs&&!/^blob\:/.test(j)?j+g.urlArgs(a,j):j},load:function(a,b){req.load(d,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=F(a);d.completeLoad(b.id)}},onScriptError:function(a){var b=F(a);if(!t(b.id)){var c=[];return eachProp(h,function(a,d){0!==d.indexOf("_@r")&&each(a.depMaps,function(a){return a.id===b.id?(c.push(d),!0):void 0})}),y(makeError("scripterror",'Script error for "'+b.id+(c.length?'", needed by: '+c.join(", "):'"'),a,[b.id]))}}},d.require=d.makeRequire(),d}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(a){return"interactive"===a.readyState?interactiveScript=a:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.2.0",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}"undefined"==typeof require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return isArray(a)||"string"==typeof a||(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=getOwn(contexts,g),e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},req.nextTick="undefined"!=typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(a){req[a]=function(){var b=contexts[defContextName];return b.require[a].apply(b,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(a,b,c){var d=a.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return d.type=a.scriptType||"text/javascript",d.charset="utf-8",d.async=!0,d},req.load=function(a,b,c){var e,d=a&&a.config||{};if(isBrowser)return e=req.createNode(d,b,c),e.setAttribute("data-requirecontext",a.contextName),e.setAttribute("data-requiremodule",b),!e.attachEvent||e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0||isOpera?(e.addEventListener("load",a.onScriptLoad,!1),e.addEventListener("error",a.onScriptError,!1)):(useInteractive=!0,e.attachEvent("onreadystatechange",a.onScriptLoad)),e.src=c,d.onNodeCreated&&d.onNodeCreated(e,d,b,c),currentlyAddingScript=e,baseElement?head.insertBefore(e,baseElement):head.appendChild(e),currentlyAddingScript=null,e;if(isWebWorker)try{setTimeout(function(){},0),importScripts(c),a.completeLoad(b)}catch(f){a.onError(makeError("importscripts","importScripts failed for "+b+" at "+c,f,[b]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(a){return head||(head=a.parentNode),dataMain=a.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(a,b,c){var d,e;"string"!=typeof a&&(c=b,b=a,a=null),isArray(b)||(c=b,b=null),!b&&isFunction(c)&&(b=[],c.length&&(c.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(1===c.length?["require"]:["require","exports","module"]).concat(b))),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),e?(e.defQueue.push([a,b,c]),e.defQueueMap[a]=!0):globalDefQueue.push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this,setTimeout);


// FFZX CONFIG

var PATH_BASE = '/' + window.location.pathname.split('/')[1] + '/asset/v2';

// Dev
var currHost = window.location.host;
if (currHost == '192.168.1.195:8077' || currHost == 'static.ffzx.com') {
	PATH_BASE = '/v2';
} else if (window.location.pathname == '/superstarui/') {
	PATH_BASE = '/superstarui';
}

var PATH_JQUI_JS = PATH_BASE + '/lib/jquery-ui/js';
var PATH_JQUI_CSS = PATH_BASE + '/lib/jquery-ui/css';
var PATH_JQUI_EFFECT = PATH_JQUI_JS + '/effects';
var PATH_JQUI_WIDGET = PATH_JQUI_JS + '/widgets';
var LOAD_JQUI_CSS = 'css!' + PATH_BASE + '/lib/jquery-ui/css/core_and_theme.css';

// DataTable options
var OPT_DATATABLE = {
	//"ordering": false,
	//"info": false,
	"processing": true,
    "serverSide": true,
	"searching": false,
	"ordering": false,
	"scrollX": true,
	//"sDom": 'Rfrtlip',
	"dom":'<"top">rt<"bottom"iflp><"clear">',
	"language": {
		"loadingRecords": "正在加载...",
		"processing": "正在处理...",
		"lengthMenu": "每页 _MENU_ 行",
		"zeroRecords": "没有符合条件的数据",
		"info": "第 _PAGE_/_PAGES_ 页，",
		"infoEmpty": "没有有效的数据",
		"infoFiltered": "（从 _MAX_ 条数据中筛选）",
		"paginate": {
			"first":"第一页",
			"last":"最后一页",
			"next":"下一页",
			"previous":"上一页"
		}
	}
};

// Datepicker options
var OPT_DATEPICKER = {
	showOtherMonths: true,
	selectOtherMonths: true,
	dateFormat: 'yy-mm-dd',
	showButtonPanel: true,
	closeText: '清空'
};

// iCheck options
var OPT_ICHECK = {
	checkboxClass: 'icheckbox_minimal-blue',
	radioClass: 'iradio_minimal-blue'
}

// WebUploader options
var OPT_WEBUPLOADER = {
	
	// 自动上传。
	auto: true,

	// swf文件路径
	swf: PATH_BASE + '/lib/webuploader/uploader.swf',

	// 文件接收服务端。
	server: 'http://webuploader.duapp.com/server/fileupload.php',

	// 选择文件的按钮。可选。
	// 内部根据当前运行是创建，可能是input元素，也可能是flash.
	pick: '#filePicker',

	// 图片不压缩
	compress: false,
	
	// 只允许选择文件，可选。
	accept: {
		//extensions: 'gif,jpg,jpeg,bmp,png' // 英文逗号前后不要有空格！
		//mimeTypes: 'image/*'
	}
};


requirejs.config({
	baseUrl: PATH_BASE,
	paths: {
		// Vendor
		'avalon': 'js/avalon/avalon-1.5.6.shim.min',
		'text': 'js/require/text',
		'css': 'js/require/css',
		
		// Bootstrap
		'bs': 'lib/bootstrap/js',
		
		// jQuery UI
		'jq/accordion': PATH_JQUI_WIDGET + '/accordion',
		'jq/autocomplete': PATH_JQUI_WIDGET + '/autocomplete',
		'jq/button': PATH_JQUI_WIDGET + '/button',
		'jq/checkboxradio': PATH_JQUI_WIDGET + '/checkboxradio',
		'jq/controlgroup': PATH_JQUI_WIDGET + '/controlgroup',
		'jq/datepicker_core': PATH_JQUI_WIDGET + '/datepicker',
		'jq/datepicker': PATH_JQUI_JS + '/i18n/datepicker-zh-CN',
		'jq/dialog': PATH_JQUI_WIDGET + '/dialog',
		'jq/draggable': PATH_JQUI_WIDGET + '/draggable',
		'jq/droppable': PATH_JQUI_WIDGET + '/droppable',
		'jq/menu': PATH_JQUI_WIDGET + '/menu',
		'jq/mouse': PATH_JQUI_WIDGET + '/mouse',
		'jq/progressbar': PATH_JQUI_WIDGET + '/progressbar',
		'jq/resizable': PATH_JQUI_WIDGET + '/resizable',
		'jq/selectmenu': PATH_JQUI_WIDGET + '/selectmenu',
		'jq/slider': PATH_JQUI_WIDGET + '/slider',
		'jq/spinner': PATH_JQUI_WIDGET + '/spinner',		
		'jq/selectable': PATH_JQUI_WIDGET + '/selectable',
		'jq/sortable': PATH_JQUI_WIDGET + '/sortable',
		'jq/tabs': PATH_JQUI_WIDGET + '/tabs',
		'jq/tooltip': PATH_JQUI_WIDGET + '/tooltip',
		'form-reset-mixin': PATH_JQUI_JS + '/form-reset-mixin',
		'escape-selector': PATH_JQUI_JS + '/escape-selector',
		'data': PATH_JQUI_JS + '/data',
		'disable-selection': PATH_JQUI_JS + '/disable-selection',
		'focusable': PATH_JQUI_JS + '/focusable',
		'form': PATH_JQUI_JS + '/form',
		'ie': PATH_JQUI_JS + '/ie',
		'labels': PATH_JQUI_JS + '/labels',
		'plugin': PATH_JQUI_JS + '/plugin',
		'position': PATH_JQUI_JS + '/position',
		'safe-active-element': PATH_JQUI_JS + '/safe-active-element',
		'safe-blur': PATH_JQUI_JS + '/safe-blur',
		'scroll-parent': PATH_JQUI_JS + '/scroll-parent',
		'tabbable': PATH_JQUI_JS + '/tabbable',
		'version': PATH_JQUI_JS + '/version',
		'keycode': PATH_JQUI_JS + '/keycode',
		'unique-id': PATH_JQUI_JS + '/unique-id',
		'widget': PATH_JQUI_JS + '/widget',
		
		// Other plugin
		'ff/dialog': 'lib/artdialog/js/dialog-plus',
		'frontEngineDialog': 'lib/artdialog/js/dialogUtils',
		'ff/select2': 'lib/select2/js/select2.full.min',
		'ff/cookie': 'js/jquery/jquery.cookie',
		
		// jQuery Validation
		'ff/validate_core': 'lib/validation/jquery.validate.min',
		'ff/messages_zh': 'lib/validation/localization/messages_zh',
		'ff/validationSetDefaults': 'lib/validation/validationSetDefaults',
		'ff/additionalMethods': 'lib/validation/additionalMethods',
		'ff/validate': 'lib/validation/validationUtils',
		
		'ff/treetable': 'lib/treetable/js/jquery.treeTable',
		'ff/ztree': 'lib/ztree/js/jquery.ztree.all.min',
		'ff/datatable_core': 'lib/datatable/js/jquery.dataTables.min',
		'ff/datatable': 'lib/datatable/js/dataTables.bootstrap.min',
		'ff/icheck': 'lib/icheck/js/icheck.min',
		'ff/webuploader_core': 'lib/webuploader/js/webuploader.min',
		'ff/webuploader': 'lib/webuploader/js/webuploader_ssui',
		
		//UEditor
		'ZeroClipboard': 'lib/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
		'ff/ueditor_config': 'lib/ueditor/ueditor.config',
		'ff/ueditor_core': 'lib/ueditor/ueditor.all.min',
		'ff/ueditor': 'lib/ueditor/lang/zh-cn/zh-cn'
	},
	priority: ['css', 'text'],
	shim: {
		'avalon': {exports: 'avalon'},
		
		// Bootstrap
		'bs/affix': {exports: '$.fn.bsAffix'},
		'bs/alert': {deps:['bs/transition'], exports: '$.fn.bsAlert'},
		'bs/button': {exports: '$.fn.bsButton'},
		'bs/carousel': {deps:['bs/transition'], exports: '$.fn.bsCarousel'},
		'bs/collapse': {deps:['bs/transition'], exports: '$.fn.bsCollapse'},
		'bs/dropdown': {exports: '$.fn.bsDropdown' },
		'bs/modal': {exports: '$.fn.bsModal'},
		'bs/popover': {deps:['bs/tooltip'], exports: '$.fn.bsPopover'},
		'bs/scrollspy': {exports: '$.fn.bsScrollspy'},
		'bs/tab': {deps:['bs/transition'], exports: '$.fn.bsTab'},
		'bs/tooltip': {deps:['bs/transition'], exports: '$.fn.bsTooltip'},
		'bs/transition': {exports: '$.support.bsTransition'},
		
		// jQuery UI
		'jq/accordion': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/accordion.css']},
		'jq/autocomplete': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/autocomplete.css']},
		'jq/checkboxradio': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/checkboxradio.css']},
		'jq/controlgroup': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/controlgroup.css']},
		'jq/button': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/button.css']},
		'jq/datepicker': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/datepicker.css']},
		'jq/dialog': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/dialog.css']},
		'jq/draggable': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/draggable.css']},
		'jq/menu': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/menu.css']},
		'jq/progressbar': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/progressbar.css']},
		'jq/selectable': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/selectable.css']},
		'jq/selectmenu': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/selectmenu.css']},
		'jq/slider': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/slider.css']},
		'jq/sortable': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/sortable.css']},
		'jq/spinner': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/spinner.css']},
		'jq/resizable': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/resizable.css']},
		'jq/tabs': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/tabs.css']},
		'jq/tooltip': {deps: [LOAD_JQUI_CSS, 'css!'+ PATH_JQUI_CSS +'/tooltip.css']},
		
		// Other
		'ff/dialog': {deps: ['css!' + PATH_BASE + '/lib/artdialog/css/ui-dialog.css'],exports:'dialog'},
		'frontEngineDialog': {deps: ['ff/dialog']},
		'ff/select2': {deps: ['css!' + PATH_BASE + '/lib/select2/css/select2.css']},
		'ff/validate': {deps: ['css!' + PATH_BASE + '/lib/validation/css/validation.css']},
		'ff/treetable': {deps: ['css!' + PATH_BASE + '/lib/treetable/css/jquery.treeTable.css'], exports:'$.fn.treeTable'},
		'ff/ztree': {deps: ['css!' + PATH_BASE + '/lib/ztree/css/metro/metro.css','css!' + PATH_BASE + '/lib/ztree/css/pageleft.css'], exports:'$.fn.zTree'},
		'ff/datatable': {deps: ['css!' + PATH_BASE + '/lib/datatable/css/dataTables.bootstrap.min.css']},
		'ff/icheck': {deps: ['css!' + PATH_BASE + '/lib/icheck/css/minimal/blue.css'], exports:'$.fn.iCheck'},
		'ff/webuploader_core': {deps: ['css!' + PATH_BASE + '/lib/webuploader/css/webuploader.css']},
		'ff/webuploader': {deps: ['css!' + PATH_BASE + '/css/font-awesome.min.css', 'ff/webuploader_core']},
		'ZeroClipboard': {deps:['ff/ueditor_core']},
		'ff/ueditor': {deps:['ff/ueditor_config','ZeroClipboard']}
	},
	enforceDefine: true,

	// Avoid cache by RequireJS
	urlArgs: "bust=" +  (new Date()).getTime()
});
// END: requirejs.config