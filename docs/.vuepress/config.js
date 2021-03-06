module.exports = {
  base: '/vue-mapbox-map/', // must match github pages publish URL
  title: 'vue-mapbox-map',
  description: 'A Vue component for dynamic Mapbox GL JS maps!',
  markdown: {
    anchor: true
  },
  themeConfig: {
    lastUpdated: true,
    nav: [],
    displayAllHeaders: false,
    activeHeaderLinks: true,
    sidebarDepth: 1,
    sidebar: 'auto',
    repo: 'benchmark-urbanism/vue-mapbox-map',
    repoLabel: 'github',
    docsRepo: 'benchmark-urbanism/vue-mapbox-map',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'gh-pages',
    serviceWorker: {
      updatePopup: true
    }
  },
  evergreen: true
}
