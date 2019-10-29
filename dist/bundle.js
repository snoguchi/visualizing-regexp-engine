!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=16)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.CHARACTER="CHARACTER",e.OPE_UNION="OPE_UNION",e.OPE_STAR="OPE_STAR",e.LPAREN="LPAREN",e.RPAREN="RPAREN",e.EOF="EOF"}(t.TokenKind||(t.TokenKind={}));t.default=class{constructor(e,t){this.value=e,this.kind=t}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(3)),i={compile:e=>new o.default(e)};t.default=i},function(e,t,n){e.exports=n.p+"8f1068bacff9731fe54c62ea63dbf625.js"},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(4)),i=r(n(6)),s=r(n(7)),a=r(n(8)),u=r(n(9)),c=e=>{const t=e.epsilonExpand(new Set([e.start])),n=new i.default(e.accepts);return new o.default((t,n)=>{let r=new Set;for(const o of t)r=new Set([...r,...e.transition(o,n)]);return e.epsilonExpand(r)},t,n)};t.default=class{constructor(e){this.regexp=e,this.ast=null,this.nfaFragment=null,this.nfa=null,this.dfa=null,this.compile()}compile(){const e=new s.default(this.regexp),t=new u.default(e);this.ast=t.expression(),this.nfaFragment=this.ast.assemble(new a.default),this.nfa=this.nfaFragment.build(),this.dfa=c(this.nfa)}matches(e){return this.dfa.getRuntime().doesAccept(e)}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(5));t.default=class{constructor(e,t,n){this.transition=e,this.start=t,this.accepts=n}getRuntime(){return new o.default(this)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.dfa=e,this.curState=e.start}doTranstion(e){this.curState=this.dfa.transition(this.curState,e)}isAcceptState(){return this.dfa.accepts.has(this.curState)}doesAccept(e){for(const t of e)this.doTranstion(t);return this.isAcceptState()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r extends Set{constructor(e){super(),this.sub=e}has(e){return[...this.sub].some(t=>e.has(t))}}t.default=r},function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(0));t.default=class{constructor(e){this.stringList=e.split("")}scan(){if(0===this.stringList.length)return new o.default(null,o.TokenKind.EOF);const e=this.stringList.shift();return"\\"===e?new o.default(this.stringList.shift(),o.TokenKind.CHARACTER):"|"===e?new o.default(e,o.TokenKind.OPE_UNION):"("===e?new o.default(e,o.TokenKind.LPAREN):")"===e?new o.default(e,o.TokenKind.RPAREN):"*"===e?new o.default(e,o.TokenKind.OPE_STAR):new o.default(e,o.TokenKind.CHARACTER)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(){this.stateCount=0}newState(){return this.stateCount++,this.stateCount}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),i=r(n(10)),s=r(n(13)),a=r(n(14)),u=r(n(15));t.default=class{constructor(e){this.lexer=e,this.move()}match(e){if(this.look.kind!==e)throw new SyntaxError(`expected ${e} but ${this.look.kind}`);this.move()}move(){this.look=this.lexer.scan()}factor(){if(this.look.kind===o.TokenKind.LPAREN){this.match(o.TokenKind.LPAREN);const e=this.subexpr();return this.match(o.TokenKind.RPAREN),e}{const e=new i.default(this.look.value);return this.match(o.TokenKind.CHARACTER),e}}star(){let e=this.factor();return this.look.kind===o.TokenKind.OPE_STAR&&(this.match(o.TokenKind.OPE_STAR),e=new a.default(e)),e}seq(){return this.look.kind===o.TokenKind.LPAREN||this.look.kind===o.TokenKind.CHARACTER?this.subseq():new i.default("")}subseq(){const e=this.star();if(this.look.kind===o.TokenKind.LPAREN||this.look.kind===o.TokenKind.CHARACTER){const t=this.subseq();return new s.default(e,t)}return e}subexpr(){const e=this.seq();if(this.look.kind===o.TokenKind.OPE_UNION){this.match(o.TokenKind.OPE_UNION);const t=this.subexpr();return new u.default(e,t)}return e}expression(){const e=this.subexpr();return this.match(o.TokenKind.EOF),e}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(11));t.default=class{constructor(e){this.char=e}assemble(e){const t=new o.default,n=e.newState(),r=e.newState();return t.connect(n,this.char,r),t.start=n,t.accepts=new Set([r]),t}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(n(12));class i{constructor(){this.start=null,this.accepts=null,this.map=new Map}connect(e,t,n){const r=JSON.stringify([e,t]);let o=this.map.get(r);o||this.map.set(r,o=new Set),o.add(n)}newSkeleton(){const e=new i;return e.map=new Map([...this.map]),e}__or__(e){const t=this.newSkeleton();for(const[n,r]of e.map)t.map.set(n,new Set([...r]));return t}build(){return new o.default((e,t)=>{const n=JSON.stringify([e,t]);return new Set(this.map.get(n))},this.start,this.accepts)}}t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,n){this.transition=e,this.start=t,this.accepts=n}epsilonExpand(e){const t=new Set(e),n=new Set;for(;t.size>0;){const e=t.values().next().value;t.delete(e);const r=this.transition(e,"");n.add(e);for(const e of r)n.has(e)||t.add(e)}return n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.operand1=e,this.operand2=t}assemble(e){const t=this.operand1.assemble(e),n=this.operand2.assemble(e),r=t.__or__(n);for(const e of t.accepts)r.connect(e,"",n.start);return r.start=t.start,r.accepts=n.accepts,r}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.operand=e}assemble(e){const t=this.operand.assemble(e),n=t.newSkeleton(),r=e.newState();for(const e of t.accepts)n.connect(e,"",t.start);return n.connect(r,"",t.start),n.start=r,n.accepts=new Set([...t.accepts,r]),n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t){this.operand1=e,this.operand2=t}assemble(e){const t=this.operand1.assemble(e),n=this.operand2.assemble(e),r=t.__or__(n),o=e.newState();return r.connect(o,"",t.start),r.connect(o,"",n.start),r.start=o,r.accepts=new Set([...t.accepts,...n.accepts]),r}}},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=function(){function e(t){var n=this;s(this,e),this.worker=t,this.listeners=[],this.nextId=0,this.worker.addEventListener("message",(function(e){var t=e.data.id,r=e.data.error,o=e.data.result;n.listeners[t](r,o),delete n.listeners[t]}))}return a(e,[{key:"render",value:function(e,t){var n=this;return new Promise((function(r,o){var i=n.nextId++;n.listeners[i]=function(e,t){e?o(new Error(e.message,e.fileName,e.lineNumber)):r(t)},n.worker.postMessage({id:i,src:e,options:t})}))}}]),e}(),l=function e(t,n){s(this,e);var r=t();this.render=function(e,t){return new Promise((function(o,i){try{o(n(r,e,t))}catch(e){i(e)}}))}};function d(){return"devicePixelRatio"in window&&window.devicePixelRatio>1?window.devicePixelRatio:1}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.scale,r=void 0===n?d():n,o=t.mimeType,i=void 0===o?"image/png":o,s=t.quality,a=void 0===s?1:s;return new Promise((function(t,n){var o=new Image;o.onload=function(){var e=document.createElement("canvas");e.width=o.width*r,e.height=o.height*r,e.getContext("2d").drawImage(o,0,0,e.width,e.height),e.toBlob((function(e){var n=new Image;n.src=URL.createObjectURL(e),n.width=o.width,n.height=o.height,t(n)}),i,a)},o.onerror=function(e){var t;t="error"in e?e.error:new Error("Error loading SVG"),n(t)},o.src="data:image/svg+xml;base64,"+btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode("0x"+t)})))}))}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.scale,r=void 0===n?d():n,o=t.mimeType,i=void 0===o?"image/png":o,s=t.quality,a=void 0===s?1:s,u=r,c=void 0;return"image/jpeg"==i?c="jpeg":"image/png"==i&&(c="png"),new Promise((function(t,n){fabric.loadSVGFromString(e,(function(e,r){0==e.length&&n(new Error("Error loading SVG with Fabric"));var o=document.createElement("canvas");o.width=r.width,o.height=r.height;var i=new fabric.Canvas(o,{enableRetinaScaling:!1}),s=fabric.util.groupSVGElements(e,r);i.add(s).renderAll();var l=new Image;l.src=i.toDataURL({format:c,multiplier:u,quality:a}),l.width=r.width,l.height=r.height,t(l)}))}))}var p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.workerURL,r=t.worker,o=t.Module,i=t.render;if(s(this,e),void 0!==n)this.wrapper=new c(new Worker(n));else if(void 0!==r)this.wrapper=new c(r);else if(void 0!==o&&void 0!==i)this.wrapper=new l(o,i);else{if(void 0===e.Module||void 0===e.render)throw new Error("Must specify workerURL or worker option, Module and render options, or include one of full.render.js or lite.render.js after viz.js.");this.wrapper=new l(e.Module,e.render)}}return a(e,[{key:"renderString",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.format,r=void 0===n?"svg":n,o=t.engine,i=void 0===o?"dot":o,s=t.files,a=void 0===s?[]:s,u=t.images,c=void 0===u?[]:u,l=t.yInvert,d=void 0!==l&&l,f=t.nop,h=void 0===f?0:f,p=0;p<c.length;p++)a.push({path:c[p].path,data:'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="'+c[p].width+'" height="'+c[p].height+'"></svg>'});return this.wrapper.render(e,{format:r,engine:i,files:a,images:c,yInvert:d,nop:h})}},{key:"renderSVGElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.renderString(e,u({},t,{format:"svg"})).then((function(e){return(new DOMParser).parseFromString(e,"image/svg+xml").documentElement}))}},{key:"renderImageElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.scale,r=t.mimeType,o=t.quality;return this.renderString(e,u({},t,{format:"svg"})).then((function(e){return"object"===("undefined"==typeof fabric?"undefined":i(fabric))&&fabric.loadSVGFromString?h(e,{scale:n,mimeType:r,quality:o}):f(e,{scale:n,mimeType:r,quality:o})}))}},{key:"renderJSONObject",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.format;return"json"===n&&"json0"===n||(n="json"),this.renderString(e,u({},t,{format:n})).then((function(e){return JSON.parse(e)}))}}]),e}(),m=n(2);const v=new p({workerURL:n.n(m).a}),g=async()=>{const e=document.getElementById("regexp").value;try{const t=(e=>{const t=o.a.compile(e).nfaFragment,n=[];n.push(`start -> ${t.start}`);for(const[e,r]of t.map){const[t,o]=JSON.parse(e);for(const e of r)n.push(`${t} -> ${e} [label=${o||"ε"}]`)}for(const e of t.accepts)n.push(`${e} [shape = doublecircle]`);return`digraph NFA {\nnode [shape = circle]\nedge [arrowhead = vee]\nstart [shape = none]\n${n.join("\n")}\n}`})(e);console.log(t);const n=await v.renderSVGElement(t);document.getElementById("error").innerHTML="",document.getElementById("nfa").innerHTML="",document.getElementById("nfa").append(n)}catch(e){document.getElementById("error").innerHTML=e.toString(),document.getElementById("nfa").innerHTML=""}};document.getElementById("regexp").addEventListener("input",e=>{e.target.value=e.target.value.replace(/\s/g,""),g()}),g()}]);