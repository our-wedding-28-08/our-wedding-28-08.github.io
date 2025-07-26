import {series, parallel} from "gulp";
import {clean} from "./gulp/clean.mjs";
import {font} from "./gulp/font.mjs";
import {image, imageSvg, imageToAvif} from "./gulp/image.mjs";
import {html, htmlMinify} from "./gulp/html.mjs";
import {style} from "./gulp/style.mjs";
import {script} from "./gulp/script.mjs";
import {generateFavicon, injectFaviconMarkups, checkForFaviconUpdate} from "./gulp/favicon.mjs";
import {serve} from "./gulp/serve.mjs";
import {sprite} from "./gulp/sprite.mjs";
import {clone} from "./gulp/clone.mjs";

export const start = series(
  parallel(
    font,
    series(image, /*imageToAvif,*/ imageSvg),
    style,
    series(sprite, html),
    script,
    clone
  ),
  serve
);

export const build = series(
  clean,
  series(generateFavicon, injectFaviconMarkups, checkForFaviconUpdate),
  parallel(
    font,
    series(image, imageToAvif, imageSvg),
    style,
    series(sprite, htmlMinify),
    script,
    clone
  )
);

export const favicon = series(generateFavicon, injectFaviconMarkups, checkForFaviconUpdate);
