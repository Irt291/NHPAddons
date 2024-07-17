const TerserPlugin = require("terser-webpack-plugin");

module.exports =  {
    entry: "./dist/js/Main.js",
    mode: "production", 
    output: {
        filename: "./bundle.user.js",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(
                {
                    minify: TerserPlugin.uglifyJsMinify,
                    parallel: true,
                    terserOptions: {
                        annotations: false,
                    }

                }
            )
        ],
        concatenateModules: true,
    }
}