export default defineNuxtConfig({
  modules: ["../src/module"],
  nuxt3WinstonLog: {
    maxSize: "100m",
  },
  devtools: { enabled: true },
});
