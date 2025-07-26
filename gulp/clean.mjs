import {rimraf} from "rimraf";

export const clean = () => {
  return rimraf("dist");
};
