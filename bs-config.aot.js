module.exports = {
  port: 4200,
  server: {
    baseDir: "src",
    routes: {
      "/node_modules": "node_modules"
    },
    middleware: {
      // overrides the fallback middleware to use index-aot
      1: require('connect-history-api-fallback')({ index: '/index-aot.html' })
    }
  }
};