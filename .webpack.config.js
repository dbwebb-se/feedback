var path = require("path");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.join(__dirname, "."),
        filename: "webroot/js/feedback.js"
    },
    module: {
        loaders: [
            {
                //test: /\.(js|jsx)$/,
                //exclude: /(node_modules|bower_components)/,
                test: path.join(__dirname, "src/js"),
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve: {
      // tell webpack where to look for required files
      modulesDirectories: [
        "src/js"
      ],
  },
    devtool: "#inline-source-map"
};
