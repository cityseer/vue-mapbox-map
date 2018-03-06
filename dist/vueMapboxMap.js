!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vueMapboxMap",[],t):"object"==typeof exports?exports.vueMapboxMap=t():e.vueMapboxMap=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=gl},function(e,t){e.exports=geocoder},function(e,t,n){"use strict";function o(e,t){for(var n=[],o={},r=0;r<t.length;r++){var a=t[r],i=a[0],s={id:e+":"+r,css:a[1],media:a[2],sourceMap:a[3]};o[i]?o[i].parts.push(s):n.push(o[i]={id:i,parts:[s]})}return n}n.r(t),n.d(t,"default",function(){return h});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},i=r&&(document.head||document.getElementsByTagName("head")[0]),s=null,p=0,u=!1,c=function(){},l=null,d="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,n,r){u=n,l=r||{};var i=o(e,t);return m(i),function(t){for(var n=[],r=0;r<i.length;r++){var s=i[r];(p=a[s.id]).refs--,n.push(p)}t?m(i=o(e,t)):i=[];for(r=0;r<n.length;r++){var p;if(0===(p=n[r]).refs){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete a[p.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],o=a[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(g(n.parts[r]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var i=[];for(r=0;r<n.parts.length;r++)i.push(g(n.parts[r]));a[n.id]={id:n.id,refs:1,parts:i}}}}function v(){var e=document.createElement("style");return e.type="text/css",i.appendChild(e),e}function g(e){var t,n,o=document.querySelector("style["+d+'~="'+e.id+'"]');if(o){if(u)return c;o.parentNode.removeChild(o)}if(f){var r=p++;o=s||(s=v()),t=x.bind(null,o,r,!1),n=x.bind(null,o,r,!0)}else o=v(),t=function(e,t){var n=t.css,o=t.media,r=t.sourceMap;o&&e.setAttribute("media",o);l.ssrId&&e.setAttribute(d,t.id);r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function x(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var a=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(1),i=n.n(a),s={name:"VueMapboxMap",data:()=>({map:null}),props:{accessToken:{type:String,required:!0},mapStyle:{type:[String,Object],default:"mapbox://styles/mapbox/light-v9"},interactive:{type:Boolean,default:!0},geocoder:{type:Boolean,default:!1},lng:{type:Number,required:!0},lat:{type:Number,required:!0},zoom:{type:Number,default:13},pitch:{type:Number,default:90},bearing:{type:Number,default:0}},mounted(){r.a.accessToken=this.accessToken,this.map=new r.a.Map({container:this.$refs.vueMapboxMap,style:this.mapStyle,interactive:this.interactive,center:[this.lng,this.lat],zoom:this.zoom,bearing:this.bearing,pitch:this.pitch}),this.geocoder&&this.map.addControl(new i.a({accessToken:this.accessToken,zoom:18,flyTo:!0,proximity:{longitude:this.lng,latitude:this.lat}})),this.map.on("dragend",()=>{this.$emit("dragend")}),this.map.on("zoomend",()=>{this.$emit("zoomend")}),this.$emit("mapboxReady",this.map)},destroyed(){this.$emit("mapboxDestroyed")},watch:{mapStyle:{deep:!0,handler(e){e&&this.map?this.map.setStyle(e):console.error(`NOTE -> Unable to update map style to ${e}.`)}},lng(e){e&&this.map&&this.lat?this.map.jumpTo({center:[this.lng,this.lat]}):console.error(`NOTE -> Unable to update centre to ${this.lng}, ${this.lat}.`)},lat(e){e&&this.map&&this.lng?this.map.jumpTo({center:[this.lng,this.lat]}):console.error(`NOTE -> Unable to update centre to ${this.lng}, ${this.lat}.`)},zoom(e){e&&this.map?this.map.setZoom(e):console.error(`NOTE -> Unable to update zoom to ${e}.`)},pitch(e){e&&this.map?this.map.setPitch(e):console.error(`NOTE -> Unable to update pitch to ${e}.`)},bearing(e){e&&this.map?this.map.setBearing(e):console.error(`NOTE -> Unable to update bearing to ${e}.`)}}},p=function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"vueMapboxMap"})};p._withStripped=!0;var u=!1;var c=function(e,t,n,o,r,a,i,s){var p=typeof(e=e||{}).default;"object"!==p&&"function"!==p||(e=e.default);var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),a&&(c._scopeId=a),i?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=u):r&&(u=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,u):[u]}return{exports:e,options:c}}(s,p,[],!1,function(e){u||n(6)},null,null);c.options.__file="src/VueMapboxMap.vue";t.default=c.exports},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(i=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),a=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(a).concat([r]).join("\n")}var i;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var a=this[r][0];"number"==typeof a&&(o[a]=!0)}for(r=0;r<e.length;r++){var i=e[r];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},function(e,t,n){(t=e.exports=n(4)(!1)).push([e.i,"@import url(https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css);",""]),t.push([e.i,"@import url(https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css);",""]),t.push([e.i,"\n",""])},function(e,t,n){var o=n(5);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n(2).default)("4a4421a4",o,!1,{})}])});