<template>
  <div ref='mapboxMapDiv'></div>
</template>

<script>
// imports are dynamic, see below

export default {
  name: 'VueMapboxMap',
  data () {
    return {
      map: null
    }
  },
  props: {
    // mapbox requires an access token
    'access-token': {
      type: String,
      required: false
    },
    // target map style, you can also load a local map style configuration
    'map-style': {
      type: [String, Object],
      default: 'mapbox://styles/mapbox/light-v9'
    },
    // whether to display the attribution control
    // this is required by mapbox unless you fulfill this requirement elsehow
    'attribution-control': {
      type: Boolean,
      default: true
    },
    // whether map can be interacted with
    interactive: {
      type: Boolean,
      default: true
    },
    // whether to instance the geocoder
    geocoder: {
      type: Boolean,
      default: false
    },
    // whether to jump, ease, or fly for transitions
    transitionMode: {
      type: String,
      required: false,
      default: 'jump',
      validator: function (value) {
        return ['jump', 'ease', 'fly'].indexOf(value) !== -1
      }
    },
    // longitude (dynamic)
    lng: {
      type: [Number, String],
      required: true
    },
    // latitude (dynamic)
    lat: {
      type: [Number, String],
      required: true
    },
    // zoom (dynamic)
    zoom: {
      type: [Number, String],
      default: 13
    },
    // pitch (dynamic)
    pitch: {
      type: [Number, String],
      default: 60
    },
    // bearing (dynamic)
    bearing: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    instanceMap () {
      if (this.accessToken) {
        window.mapboxgl.accessToken = this.accessToken
      } else {
        console.warn('NOTE -> No access token has been provided. If using Mapbox hosted tiles then this omission may break your map.')
      }
      this.map = new window.mapboxgl.Map({
        container: this.$refs.mapboxMapDiv,
        style: this.mapStyle,
        interactive: this.interactive,
        center: [
          this.lng,
          this.lat
        ],
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch,
        attributionControl: this.attributionControl
      })
      if (this.geocoder) {
        this.map.addControl(new window.MapboxGeocoder({
          accessToken: this.accessToken,
          zoom: 18,
          flyTo: true,
          // bias results closer to starting point
          proximity: {
            longitude: this.lng,
            latitude: this.lat
          }
        }))
      }
      // return the map for reference from parent component
      this.map.on('load', () => { this.$emit('mapbox-ready', this.map) })
      this.map.on('remove', () => { this.$emit('mapbox-destroyed') })
    }
  },
  mounted () {
    // check if the mapbox and geocoder variables are available in the window
    // e.g. using from web browser, in which case the scripts should be loaded in the head
    // if using from a static SSR site such as vuepress then provide the relevant config.js head section
    // this pattern prevents issues, e.g. with vuepress, where mapboxgl attempts to access the window scope before ready
    if (typeof window.mapboxgl !== 'undefined') {
      if (!this.geocoder || window.MapboxGeocoder !== 'undefined') {
        this.instanceMap()
      } else {
        import('@mapbox/mapbox-gl-geocoder').then(MapboxGeocoder => {
          window.MapboxGeocoder = MapboxGeocoder
          this.instanceMap()
        })
      }
    } else {
      import('mapbox-gl').then(MapboxModule => {
        window.mapboxgl = MapboxModule.default
      })
      if (!this.geocoder || window.MapboxGeocoder !== 'undefined') {
        this.instanceMap()
      } else {
        import('@mapbox/mapbox-gl-geocoder').then(MapboxGeocoder => {
          window.MapboxGeocoder = MapboxGeocoder
          this.instanceMap()
        })
      }
    }
  },
  computed: {
    mapScene () {
      return {
        center: [this.lng, this.lat],
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch
      }
    }
  },
  watch: {
    mapStyle: {
      deep: true,
      handler (val) {
        if (val && this.map) {
          // TODO: currently custom data layers are lost, but probably option to save them in future per
          // https://github.com/mapbox/mapbox-gl-js/issues/4006
          // currently this means that updating the style will undo any custom feature collections...
          this.map.setStyle(val)
        } else {
          console.error(`NOTE -> Unable to update map style to ${val}.`)
        }
      }
    },
    mapScene (val) {
      if (val) {
        if (!this.map) {
          console.error('NOTE -> Map object not set')
          return
        }
        if (val.pitch < 0 || val.pitch > 60) {
          console.error(`NOTE -> Unable to update pitch to ${val.pitch}. Exceeds permitted range.`)
          return
        }
        if (val.bearing < 0 || val.bearing > 360) {
          console.error(`NOTE -> Unable to update bearing to ${val.bearing}. Exceeds permitted range.`)
          return
        }
        if (this.transitionMode === 'jump') {
          this.map.jumpTo(val)
        } else if (this.transitionMode === 'ease') {
          this.map.easeTo(val)
        } else if (this.transitionMode === 'fly') {
          this.map.flyTo(val)
        }
      }
    }
  }
}
</script>