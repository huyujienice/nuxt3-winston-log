import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
function judgeIfStatus(params: any) {
  if (!params) {
    return false;
  }
  if (params === "null") {
    return false;
  }
  if (params === "undefined") {
    return false;
  }
  //匹配任何空白字符，包括空格、制表符、换页符等等
  if (typeof params === "string") {
    if (params.replace(/(^s*)|(s*$)/g, "").length === 0) {
      return false;
    }
  }
  return true;
}

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt3WinstonLog",
    configKey: "nuxt3WinstonLog",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options: any, nuxt: any) {
    const defaultOptions = {
      maxSize: "1024m",
      maxFiles: "14d",
      infoFileName: `logs/%DATE%-${process.env.NODE_ENV}-info.log`,
      errorFileName: `logs/%DATE%-${process.env.NODE_ENV}-error.log`,
    };
    const mergeOptions = {
      maxSize: judgeIfStatus(options?.maxSize)
        ? options.maxSize
        : defaultOptions.maxSize,
      maxFiles: judgeIfStatus(options?.maxFiles)
        ? options.maxFiles
        : defaultOptions.maxFiles,
      infoFileName: judgeIfStatus(options?.infoFileName)
        ? options.infoFileName
        : defaultOptions.infoFileName,
      errorFileName: judgeIfStatus(options?.errorFileName)
        ? options.errorFileName
        : defaultOptions.errorFileName,
    };
    nuxt.options.runtimeConfig.public.nuxt3WinstonLog = mergeOptions;
    const resolver = createResolver(import.meta.url);
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin.server"));
    nuxt.options.nitro.plugins = nuxt.options.nitro.plugins || [];
    nuxt.options.nitro.plugins.push(
      resolver.resolve("./runtime/consoleRoute.server")
    );
  },
});
