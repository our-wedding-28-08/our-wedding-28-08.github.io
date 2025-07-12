import {src, dest} from "gulp";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";

export const font = () => {
  return src("app/fonts/**/*.ttf", {
      encoding: false
    })
    .pipe(ttf2woff({
      clone: true
    }))
    .pipe(ttf2woff2({
      clone: true
    }))
    .pipe(dest("dist/fonts"));
};
