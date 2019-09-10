(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{22:function(e,t,i){},47:function(e,t,i){"use strict";var n=i(22);i.n(n).a},51:function(e,t,i){"use strict";i.r(t);var n={name:"VueMapboxMap",props:{accessToken:{type:String,required:!1,default:""},mapStyle:{type:[String,Object],default:"mapbox://styles/mapbox/light-v9"},attributionControl:{type:Boolean,default:!0},interactive:{type:Boolean,default:!0},transitionMode:{type:String,required:!1,default:"jump",validator:function(e){return-1!==["jump","ease","fly"].indexOf(e)}},lng:{type:[Number,String],required:!0},lat:{type:[Number,String],required:!0},zoom:{type:[Number,String],default:13},pitch:{type:[Number,String],default:60},bearing:{type:[Number,String],default:0}},data:()=>({map:null}),computed:{mapScene(){return{center:[this.lng,this.lat],zoom:this.zoom,bearing:this.bearing,pitch:this.pitch}}},watch:{mapStyle:{deep:!0,handler(e){e&&this.map?this.map.setStyle(e):console.error(`NOTE -> Unable to update map style to ${e}.`)}},mapScene(e){if(e){if(!this.map)return void console.error("NOTE -> Map object not set");if(e.pitch<0||e.pitch>60)return void console.error(`NOTE -> Unable to update pitch to ${e.pitch}. Exceeds permitted range.`);if(e.bearing<0||e.bearing>360)return void console.error(`NOTE -> Unable to update bearing to ${e.bearing}. Exceeds permitted range.`);"jump"===this.transitionMode?this.map.jumpTo(e):"ease"===this.transitionMode?this.map.easeTo(e):"fly"===this.transitionMode&&this.map.flyTo(e)}}},mounted(){void 0!==window.mapboxgl?this.instanceMap():i.e(7).then(i.t.bind(null,49,7)).then(e=>{window.mapboxgl=e.default,this.instanceMap()})},methods:{instanceMap(){this.accessToken?window.mapboxgl.accessToken=this.accessToken:console.warn("NOTE -> No access token has been provided. If using Mapbox hosted tiles then this omission may break your map."),this.map=new window.mapboxgl.Map({container:this.$refs.mapboxMapDiv,style:this.mapStyle,interactive:this.interactive,center:[this.lng,this.lat],zoom:this.zoom,bearing:this.bearing,pitch:this.pitch,attributionControl:this.attributionControl}),this.map.on("load",()=>{this.$emit("mapbox-ready",this.map)}),this.map.on("remove",()=>{this.$emit("mapbox-destroyed")})}}},o=i(0),a={name:"VueMapboxMapDemo",components:{VueMapboxMap:Object(o.a)(n,function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"mapboxMapDiv"})},[],!1,null,null,null).exports},data:()=>({computing:!1,accessToken:"pk.eyJ1Ijoic2hvbmdvbG9sbyIsImEiOiJjazBkdDQ1bW0wYXEyM2RyejB4eW02a2xwIn0.IzZDyzAlR1sHwDvnEv7ouw",lng:-73.982,lat:40.768,baseZoom:13,basePitch:20,baseBearing:0,offset:0}),methods:{handleScroll(){this.computing||(window.requestAnimationFrame(()=>{let e=Math.round(window.document.documentElement.scrollTop||document.body.scrollTop);(e/=2e3-window.innerHeight)>1&&(e=1),this.offset=e,this.computing=!1}),this.computing=!0)}},computed:{zoom(){return this.baseZoom+5*this.offset},pitch(){return this.basePitch+30*this.offset},bearing(){return this.baseBearing+100*this.offset}},mounted(){window.addEventListener("scroll",this.handleScroll)},destroyed(){window.removeEventListener("scroll",this.handleScroll)}},s=(i(47),Object(o.a)(a,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("vue-mapbox-map",{attrs:{id:"map-container","access-token":e.accessToken,interactive:!1,lng:e.lng,lat:e.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing}}),e._v(" "),i("div",[i("p",[e._v("\n      Zoom: "+e._s(e.zoom.toLocaleString())+"\n    ")]),e._v(" "),i("p",[e._v("\n      Pitch: "+e._s(e.pitch.toLocaleString())+"\n    ")]),e._v(" "),i("p",[e._v("\n      Bearing: "+e._s(e.bearing.toLocaleString())+"\n    ")])])],1)},[],!1,null,"3d3a7f30",null));t.default=s.exports}}]);