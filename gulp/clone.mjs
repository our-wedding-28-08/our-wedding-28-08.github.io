import {src, dest} from "gulp";
import plumber from "gulp-plumber";

export const clone = () => {
  return src(["app/**/*", "!app/favicon/**", "!app/fonts/**", "!app/html/**", "!app/img/**", "!app/js/**", "!app/scss/**"], {
      encoding: false
    })
    .pipe(plumber())
    .pipe(dest("dist"));
};
