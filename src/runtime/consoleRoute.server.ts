import type { NitroAppPlugin } from "nitropack";

export default <NitroAppPlugin>function (nitroApp) {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    console.log("render:html");
  });

  nitroApp.hooks.hook("render:response", (response, { event }) => {
    console.log("render:response");
  });
};
