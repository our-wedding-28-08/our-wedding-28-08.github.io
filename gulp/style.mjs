import {src, dest} from "gulp";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";
import rename from "gulp-rename";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

export const style = () => {
  return src("app/scss/*.scss")
    .pipe(plumber())
    .pipe(sass.sync({
      silenceDeprecations: ["legacy-js-api"],
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(dest("dist/css"));
};
