!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,t){if(b[e]&&g[e]){for(var n in g[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0==--v&&0===m&&D()}}(e,n),t&&t(e,n)};var n,o=!0,r="91b870d78c700b12ac9a",i=1e4,c={},a=[],s=[];function d(e){var t=x[e];if(!t)return k;var o=function(o){return t.hot.active?(x[o]?-1===x[o].parents.indexOf(e)&&x[o].parents.push(e):(a=[e],n=o),-1===t.children.indexOf(o)&&t.children.push(o)):(console.warn("[HMR] unexpected require("+o+") from disposed module "+e),a=[]),k(o)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return k[e]},set:function(t){k[e]=t}}};for(var i in k)Object.prototype.hasOwnProperty.call(k,i)&&"e"!==i&&Object.defineProperty(o,i,r(i));return o.e=function(e){return"ready"===f&&u("prepare"),m++,k.e(e).then(t,function(e){throw t(),e});function t(){m--,"prepare"===f&&(w[e]||j(e),0===m&&0===v&&D())}},o}var l=[],f="idle";function u(e){f=e;for(var t=0;t<l.length;t++)l[t].call(null,e)}var p,h,y,v=0,m=0,w={},g={},b={};function O(e){return+e+""===e?+e:e}function _(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return o=e,u("check"),(t=i,t=t||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var o=new XMLHttpRequest,i=k.p+""+r+".hot-update.json";o.open("GET",i,!0),o.timeout=t,o.send(null)}catch(e){return n(e)}o.onreadystatechange=function(){if(4===o.readyState)if(0===o.status)n(new Error("Manifest request to "+i+" timed out."));else if(404===o.status)e();else if(200!==o.status&&304!==o.status)n(new Error("Manifest request to "+i+" failed."));else{try{var t=JSON.parse(o.responseText)}catch(e){return void n(e)}e(t)}}})).then(function(e){if(!e)return u("idle"),null;g={},w={},b=e.c,y=e.h,u("prepare");var t=new Promise(function(e,t){p={resolve:e,reject:t}});return h={},j(0),"prepare"===f&&0===m&&0===v&&D(),t});var t}function j(e){b[e]?(g[e]=!0,v++,function(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.charset="utf-8",n.src=k.p+""+e+"."+r+".hot-update.js",t.appendChild(n)}(e)):w[e]=!0}function D(){u("ready");var e=p;if(p=null,e)if(o)Promise.resolve().then(function(){return E(o)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(O(n));e.resolve(t)}}function E(t){if("ready"!==f)throw new Error("apply() is only allowed in ready status");var n,o,i,s,d;function l(e){for(var t=[e],n={},o=t.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var r=o.pop(),i=r.id,c=r.chain;if((s=x[i])&&!s.hot._selfAccepted){if(s.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(s.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var a=0;a<s.parents.length;a++){var d=s.parents[a],l=x[d];if(l){if(l.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([d]),moduleId:i,parentId:d};-1===t.indexOf(d)&&(l.hot._acceptedDependencies[i]?(n[d]||(n[d]=[]),p(n[d],[i])):(delete n[d],t.push(d),o.push({chain:c.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];-1===e.indexOf(o)&&e.push(o)}}t=t||{};var v={},m=[],w={},g=function(){console.warn("[HMR] unexpected require("+j.moduleId+") to disposed module")};for(var _ in h)if(Object.prototype.hasOwnProperty.call(h,_)){var j;d=O(_);var D=!1,E=!1,P=!1,H="";switch((j=h[_]?l(d):{type:"disposed",moduleId:_}).chain&&(H="\nUpdate propagation: "+j.chain.join(" -> ")),j.type){case"self-declined":t.onDeclined&&t.onDeclined(j),t.ignoreDeclined||(D=new Error("Aborted because of self decline: "+j.moduleId+H));break;case"declined":t.onDeclined&&t.onDeclined(j),t.ignoreDeclined||(D=new Error("Aborted because of declined dependency: "+j.moduleId+" in "+j.parentId+H));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(j),t.ignoreUnaccepted||(D=new Error("Aborted because "+d+" is not accepted"+H));break;case"accepted":t.onAccepted&&t.onAccepted(j),E=!0;break;case"disposed":t.onDisposed&&t.onDisposed(j),P=!0;break;default:throw new Error("Unexception type "+j.type)}if(D)return u("abort"),Promise.reject(D);if(E)for(d in w[d]=h[d],p(m,j.outdatedModules),j.outdatedDependencies)Object.prototype.hasOwnProperty.call(j.outdatedDependencies,d)&&(v[d]||(v[d]=[]),p(v[d],j.outdatedDependencies[d]));P&&(p(m,[j.moduleId]),w[d]=g)}var I,M=[];for(o=0;o<m.length;o++)d=m[o],x[d]&&x[d].hot._selfAccepted&&M.push({module:d,errorHandler:x[d].hot._selfAccepted});u("dispose"),Object.keys(b).forEach(function(e){!1===b[e]&&function(e){delete installedChunks[e]}(e)});for(var A,S,q=m.slice();q.length>0;)if(d=q.pop(),s=x[d]){var T={},U=s.hot._disposeHandlers;for(i=0;i<U.length;i++)(n=U[i])(T);for(c[d]=T,s.hot.active=!1,delete x[d],delete v[d],i=0;i<s.children.length;i++){var R=x[s.children[i]];R&&(I=R.parents.indexOf(d))>=0&&R.parents.splice(I,1)}}for(d in v)if(Object.prototype.hasOwnProperty.call(v,d)&&(s=x[d]))for(S=v[d],i=0;i<S.length;i++)A=S[i],(I=s.children.indexOf(A))>=0&&s.children.splice(I,1);for(d in u("apply"),r=y,w)Object.prototype.hasOwnProperty.call(w,d)&&(e[d]=w[d]);var C=null;for(d in v)if(Object.prototype.hasOwnProperty.call(v,d)&&(s=x[d])){S=v[d];var L=[];for(o=0;o<S.length;o++)if(A=S[o],n=s.hot._acceptedDependencies[A]){if(-1!==L.indexOf(n))continue;L.push(n)}for(o=0;o<L.length;o++){n=L[o];try{n(S)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:d,dependencyId:S[o],error:e}),t.ignoreErrored||C||(C=e)}}}for(o=0;o<M.length;o++){var N=M[o];d=N.module,a=[d];try{k(d)}catch(e){if("function"==typeof N.errorHandler)try{N.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:n,originalError:e}),t.ignoreErrored||C||(C=n),C||(C=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:d,error:e}),t.ignoreErrored||C||(C=e)}}return C?(u("fail"),Promise.reject(C)):(u("idle"),new Promise(function(e){e(m)}))}var x={};function k(t){if(x[t])return x[t].exports;var o=x[t]={i:t,l:!1,exports:{},hot:function(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:n!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var o=0;o<e.length;o++)t._acceptedDependencies[e[o]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:_,apply:E,status:function(e){if(!e)return f;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var t=l.indexOf(e);t>=0&&l.splice(t,1)},data:c[e]};return n=void 0,t}(t),parents:(s=a,a=[],s),children:[]};return e[t].call(o.exports,o,o.exports,d(t)),o.l=!0,o.exports}k.m=e,k.c=x,k.d=function(e,t,n){k.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},k.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},k.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return k.d(t,"a",t),t},k.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},k.p="",k.h=function(){return r},d(4)(k.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addLoadEvent=function(e){var t=window.onload;"function"!=typeof window.onload?window.onload=e:window.onload=function(){t(),e()}},t.extend=function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.sup=t.prototype,t.prototype.constructor===Object.prototype.constructor&&(t.prototype.constructor=t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toTest=void 0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=n(0);function c(e){this.cash=e.cash||0,this.seats=e.seats||0,this.staff=e.staff||[]}c.prototype.hire=function(e){for(var t in this.staff)this.staff[t].id==e.id&&(e=null);if(null!=e&&(this.staff.push(e),console.log("雇佣了"+e.name),2==this.staff.length))for(var n in this.staff)"Cook"==this.staff[n].constructor.name?this.staff[n]:"Waiter"==this.staff[n].constructor.name&&this.staff[n]},c.prototype.fire=function(e){var t=[];for(var n in this.staff)this.staff[n].id!=e.id&&t.push(this.staff[n]);console.log("解雇了"+e.name),this.staff=t,"Cook"==this.staff.constructor.name?l.destroy():"Waiter"==this.staff[i].constructor.name&&d.destroy()};var a=1;function s(e,t){this.id=a++,this.name=e||"",this.salary=t||0}s.prototype.finish=function(){console.log("职员工作完毕")};var d=function(){var e=null;function t(e,t){s.call(this,e,t)}return(0,r.extend)(t,s),t.prototype.work=function(e){"object"===(void 0===e?"undefined":o(e))?(console.log("服务员"+this.name+"记录菜品"+e.name),(new l.create).work(e)):(console.log("服务员"+this.name+"上菜"),f[0].eat())},{create:function(n,o){return null===e&&(e=new t(n,o)),e},destroy:function(){e=null}}}(),l=function(){var e=null;function t(e,t){s.call(this,e,t)}return(0,r.extend)(t,s),t.prototype.work=function(t){if(null!=e){console.log("厨师"+this.name+"烹饪菜品"+t.name);var n=new d.create;console.log("=======烹饪中======"),console.log("厨师"+this.name+"烹饪完成"),n.work()}},{create:function(n,o){return null===e&&(e=new t(n,o)),e},destroy:function(){e=null}}}(),f=[];function u(){}function p(e){if(this.list=[],null!=e)for(var t in e)this.add(e[t].name,e[t].cost,e[t].price)}u.prototype.order=function(e){console.log("顾客点了"+e.name+",价格为"+e.price+"元"),(new d.create).work(e)},u.prototype.eat=function(){console.log("=======吃饭中======"),console.log("顾客吃完离开")},p.prototype.add=function(e,t,n){this.list.push(new function(e,t,n){this.name=e||"",this.cost=t||0,this.price=n||0}(e,t,n))},p.prototype.getRandom=function(){var e=Math.floor(Math.random()*this.list.length);return this.list[e]},t.toTest=function(){for(var e=new c({cash:1e6,seats:1,staff:[]}),t=new p([{name:"糖醋排骨",cost:20,price:40},{name:"麻婆豆腐",cost:10,price:20},{name:"老鸭粉丝汤",cost:13,price:26},{name:"蒜枣大黄鱼",cost:18,price:44}]),n=l.create("Tony","10000"),o=d.create("Ben","9000"),r=0;r<5;r++)f.push(new u);e.hire(n),e.hire(o),console.log("假定队伍里有"+f.length+"个客人"),document.querySelector("#app input").onclick=function(){for(console.log("餐馆开张啦！");f.length;){var n=f[0];e.seats-=1,n.order(t.getRandom()),e.seats+=1,f.shift()}console.log("客人没啦")}}},,function(e,t,n){},function(e,t,n){"use strict";n(3);var o=n(0),r=n(1);(0,o.addLoadEvent)((0,r.toTest)())}]);