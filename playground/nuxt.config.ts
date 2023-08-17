export default defineNuxtConfig({
  modules: ["../src/module"],
  nuxt3WinstonLog: {
    maxSize: "30m",
    maxFiles: "",
  },
  devtools: { enabled: true },
});
