import {src, dest} from "gulp";
import plumber from "gulp-plumber";
import webpack from "webpack-stream";
import CircularDependencyPlugin from "circular-dependency-plugin";
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";

export const script = () => {
  return src("app/js/main.js")
    .pipe(plumber())
    .pipe(webpack({
      mode: "production",
      output: {
        publicPath: "./dist/js/",
        filename: "[name].min.js",
      },
      optimization: {
        usedExports: true,
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
              options: {
                "presets" : [
                  ["@babel/preset-env", {"modules": false}]
                ]
              }
            }
          }
        ]
      },
      plugins: [
        new CircularDependencyPlugin(),
        new DuplicatePackageCheckerPlugin()
      ],
      performance : {
        hints : false
      }
    }))
    .pipe(dest("dist/js"));
};
