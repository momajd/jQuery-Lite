module.exports = {
  context:__dirname,
  entry: "./main.js",
  output: {
    path: "./js",
    publicPath: "/js/",
    filename: "jquery_lite.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
