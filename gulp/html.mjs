import {src, dest} from "gulp";
import plumber from "gulp-plumber";
import fileInclude from "gulp-file-include";
import prettyHtml from "gulp-pretty-html";
import htmlmin from "gulp-htmlmin";
import through2 from "through2";
import {w3cHtmlValidator} from "w3c-html-validator";

export const html = () => {
  return src(["app/html/**/*.html", "!app/html/includes/**/*.html"])
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(prettyHtml({
      indent_size: 2,
      max_preserve_newlines: 0,
      preserve_newlines: true,
      extra_liners: ["html, head, body"],
    }))
    .pipe(dest("./"));
    /*.pipe(through2.obj((file, enc, callback) => {
      w3cHtmlValidator.validate({filename: file.path})
        .then((result) => {
          w3cHtmlValidator.reporter(result);
          callback(null, file);
        })
        .catch(() => {
          callback(null, file);
        });
    }));*/
};

export const htmlMinify = () => {
  return src(["app/html/**/*.html", "!app/html/includes/**/*.html"])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest("./"))
    .pipe(through2.obj((file, enc, callback) => {
      w3cHtmlValidator.validate({filename: file.path})
        .then((result) => {
          w3cHtmlValidator.reporter(result);
          callback(null, file);
        })
        .catch(() => {
          callback(null, file);
        });
    }));
};
