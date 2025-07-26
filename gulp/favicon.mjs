import {src, dest} from "gulp";
import realFavicon from "gulp-real-favicon";
import replace from "gulp-replace";
import {readFile} from "node:fs/promises";

const FAVICON_DATA_FILE = "faviconData.json";

export const generateFavicon = (done) => {
  return realFavicon.generateFavicon({
    masterPicture: "app/favicon/logo-elem.svg",
    dest: "dist",
    iconsPath: "/",
    design: {
      desktop: {
        darkIconTransformation: {
          type: "brightness",
          backgroundColor: "#ffffff",
          backgroundRadius: 0.7,
          imageScale: 0.7,
          brightness: 4.5
        },
        darkIconType: "regular",
        regularIconTransformation: {
          type: "brightness",
          backgroundColor: "#ffffff",
          backgroundRadius: 0,
          imageScale: 0.9,
          brightness: 1
        }
      },
      touch: {
        transformation: {
          type: "background",
          backgroundColor: "#ffffff",
          backgroundRadius: 0,
          imageScale: 0.7,
          brightness: 1
        },
        appTitle: "ALEX Software"
      },
      webAppManifest: {
        transformation: {
          type: "background",
          backgroundColor: "#ffffff",
          backgroundRadius: 0,
          imageScale: 0.7,
          brightness: 1
        },
        name: "ALEX Software",
        shortName: "ALEX Software",
        backgroundColor: "#ffffff",
        themeColor: "#ffffff"
      }
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
};

export const injectFaviconMarkups = async () => {
  const data = await readFile(FAVICON_DATA_FILE, "utf8");
  const markup = JSON.parse(data).favicon.html_code;

  return src("app/html/includes/favicon.html")
    .pipe(realFavicon.injectFaviconMarkups(markup))
    .pipe(replace(/<\/?(html|head|body)[^>]*>/g, ""))
    .pipe(dest("app/html/includes"));
};

export const checkForFaviconUpdate = async (done) => {
  const data = await readFile(FAVICON_DATA_FILE, "utf8");
  const currentVersion = JSON.parse(data).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
    done();
  });
};
