const {override, addBabelPlugin} = require("customize-cra");

webpack = require("webpack")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  addBabelPlugin(["styled-components", {displayName: true}])

  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
    buffer: require.resolve("buffer"),
  }
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ]
  console.log(config.resolve)
  console.log(config.plugins)

  return config
}