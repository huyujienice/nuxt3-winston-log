import type { NitroAppPlugin } from "nitropack";

export default <NitroAppPlugin>function (nitroApp) {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    console.log(`Accessed ${event.node.req.url}`);
  });
  // nitroApp.hooks.hook("render:response", (response, { event }) => {
  //   console.log("render:response");
  // });
};
