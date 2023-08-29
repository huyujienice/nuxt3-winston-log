import type { NitroAppPlugin } from "nitropack";
import * as url from "node:url";
import { getRequestURL, getMethod } from "h3";

export default <NitroAppPlugin>function (nitroApp) {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const urlName = String(getRequestURL(event));
    const { pathname, path } = url.parse(urlName);
    const headers = event.node.req.headers;
    const method = getMethod(event);
    if (pathname && !pathname.includes("_nuxt")) {
      console.log(`Accessed ${pathname}`);
      console.log(`url=${path}`);
      console.log(`method=${method}`);
      console.log(`headers=${JSON.stringify(headers)}`);
    }
  });
  // nitroApp.hooks.hook("render:response", (response, { event }) => {
  //   console.log("render:response");
  // });
};
