import type { NitroAppPlugin } from "nitropack";

export default <NitroAppPlugin>function (nitroApp) {
  // todo
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const reqUrl = event.node.req?.url;
    if (reqUrl && !reqUrl.includes("_nuxt")) console.log(`Accessed ${reqUrl}`);
  });
  // nitroApp.hooks.hook("render:response", (response, { event }) => {
  //   console.log("render:response");
  // });
};
