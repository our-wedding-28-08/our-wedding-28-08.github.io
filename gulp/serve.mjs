import {watch, series} from "gulp";
import browserSync from "browser-sync";
import {html} from "./html.mjs";
import {font} from "./font.mjs";
import {style} from "./style.mjs";
import {script} from "./script.mjs";
import {image, imageSvg, imageToAvif} from "./image.mjs";
import {sprite} from "./sprite.mjs";
import {clone} from "./clone.mjs";

const server = browserSync.create();

function reload(cb) {
  server.reload();
  cb();
}

export const serve = (cb) => {
  server.init({
    port: 80,
    server: "dist",
    notify: false,
    open: true,
    cors: true
  });

  watch("app/html/**/*.html", series(html, reload));
  watch("app/fonts/**/*.ttf", series(font, reload));
  watch("app/scss/**/*.scss", series(style, reload));
  watch("app/js/**/*.js", series(script, reload));
  watch("app/img/svg/icon-*.svg", series(sprite, reload));
  watch("app/img/**/*.*", series(series(image, imageToAvif, imageSvg), reload));
  watch(["app/**/*", "!app/favicon/**", "!app/fonts/**", "!app/html/**", "!app/img/**", "!app/js/**", "!app/scss/**"], series(clone, reload));

  return cb();
};
