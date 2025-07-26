import {src, dest} from "gulp";
import plumber from "gulp-plumber";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import svgSprite from "gulp-svg-sprite";
import replace from "gulp-replace";

export const sprite = () => {
  return src("app/img/svg/icon-*.svg")
    .pipe(plumber())
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $("[data-name]").removeAttr("data-name");
        $("[fill]").removeAttr("fill");
        $("[class]").removeAttr("class");
        $("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
        $("[xmlns]").removeAttr("xmlns");
        $("[id]").removeAttr("id");
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.html",
        }
      }
    }))
    .pipe(replace('<?xml version="1.0" encoding="utf-8"?>', ''))
    .pipe(dest("app/html/includes"));
};
