import mapboxgl from"mapbox-gl";import MapboxGeocoder from"@mapbox/mapbox-gl-geocoder";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),o='@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css"); @import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css"); ';t.type="text/css",t.styleSheet?t.styleSheet.cssText=o:t.appendChild(document.createTextNode(o)),e.appendChild(t)}}();var VueMapboxMap={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{ref:"mapboxMapDiv"})},staticRenderFns:[],name:"VueMapboxMap",data:function(){return{map:null}},props:{accessToken:{type:String,required:!0},mapStyle:{type:[String,Object],default:"mapbox://styles/mapbox/light-v9"},interactive:{type:Boolean,default:!0},geocoder:{type:Boolean,default:!1},lng:{type:Number,required:!0},lat:{type:Number,required:!0},zoom:{type:Number,default:13},pitch:{type:Number,default:90},bearing:{type:Number,default:0}},mounted:function(){var e=this;mapboxgl.accessToken=this.accessToken,this.map=new mapboxgl.Map({container:this.$refs.mapboxMapDiv,style:this.mapStyle,interactive:this.interactive,center:[this.lng,this.lat],zoom:this.zoom,bearing:this.bearing,pitch:this.pitch}),this.geocoder&&this.map.addControl(new MapboxGeocoder({accessToken:this.accessToken,zoom:18,flyTo:!0,proximity:{longitude:this.lng,latitude:this.lat}})),this.map.on("dragend",function(){e.$emit("dragend")}),this.map.on("zoomend",function(){e.$emit("zoomend")}),this.$emit("mapboxReady",this.map)},destroyed:function(){this.$emit("mapboxDestroyed")},watch:{mapStyle:{deep:!0,handler:function(e){e&&this.map?this.map.setStyle(e):console.error("NOTE -> Unable to update map style to "+e+".")}},lng:function(e){e&&this.map&&this.lat?this.map.jumpTo({center:[this.lng,this.lat]}):console.error("NOTE -> Unable to update centre to "+this.lng+", "+this.lat+".")},lat:function(e){e&&this.map&&this.lng?this.map.jumpTo({center:[this.lng,this.lat]}):console.error("NOTE -> Unable to update centre to "+this.lng+", "+this.lat+".")},zoom:function(e){e&&this.map?this.map.setZoom(e):console.error("NOTE -> Unable to update zoom to "+e+".")},pitch:function(e){e&&this.map?this.map.setPitch(e):console.error("NOTE -> Unable to update pitch to "+e+".")},bearing:function(e){e&&this.map?this.map.setBearing(e):console.error("NOTE -> Unable to update bearing to "+e+".")}}};export default VueMapboxMap;
