const path = require("path");

const config = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 2000
    },
    module: {
        rules: [{
                test: /\.js/,
                use: ["babel-loader"],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        host: "localhost",
        port: 8888
    }
}

module.exports = config;
