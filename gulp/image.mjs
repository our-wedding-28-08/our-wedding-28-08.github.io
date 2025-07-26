import {src, dest} from "gulp";
import tinypng from "gulp-tinypng-extended";
import avif from "gulp-avif";

export const image = () => {
  return src("app/img/**/*.{png,jpg,jpeg}", {
      encoding: false
    })
    .pipe(tinypng({
      key: "rJWzSYkWrPRTXg4yP510jl5dD4YG5VcH",
      sigFile: ".tinypng-sigs",
      log: true
    }))
    .pipe(dest("dist/img"));
};

export const imageSvg = () => {
  return src("app/img/**/*.svg", {
      encoding: false
    })
    .pipe(dest("dist/img"));
};

export const imageToAvif = () => {
  return src("dist/img/**/*.{png,jpg}", {
      encoding: false
    })
    .pipe(avif({
      quality: 80
    }))
    .pipe(dest("dist/img"));
};
