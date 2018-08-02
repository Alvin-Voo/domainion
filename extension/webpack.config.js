var webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

var options = {
  mode: env.NODE_ENV === "development"? "development" : "production",
  devtool: env.NODE_ENV === "development"? "cheap-module-eval-source-map" : "",
  entry: {
    popup: path.join(__dirname, "src/js", "popup/popup.js"),
    options: path.join(__dirname, "src/js", "options/options.js"),
    background: path.join(__dirname, "src/js", "background/background.js"),
    content: path.join(__dirname, "src/js", "content/content.js"),
    script: path.join(__dirname, "src/js", "script/script.js")
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["content","script"]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: 'url-loader?limit=100000'
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias,
    modules: ['node_modules', path.resolve(__dirname,'src')],
    extensions: ['.js', '.jsx','.json']
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"]),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname,"src","manifest.json"),
      transform: function (content, path) {
        // generates the manifest file using the package.json informations
        return Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }))
      }
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/html", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/html", "options.html"),
      filename: "options.html",
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/html", "background.html"),
      filename: "background.html",
      chunks: ["background"]
    }),
    new WriteFilePlugin()
  ]
};

module.exports = options;
