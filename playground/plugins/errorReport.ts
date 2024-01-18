import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    console.log("error", error);
    console.error("error", error);
    console.log("context", context);
    console.error("context", context);
    console.log("********************************************");
  };
});
