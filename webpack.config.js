const path = require("path");

module.exports = {
  entry: [
     "./js/util.js",
    "./js/stat.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/render.js",
    "./js/dialog.js",
    "./js/move.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
