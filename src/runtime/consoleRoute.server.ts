import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.hook("render:response", () => {
    console.log("render:response");
  });
  nuxtApp.hook("render:html", () => {
    console.log("render:html");
  });
});
