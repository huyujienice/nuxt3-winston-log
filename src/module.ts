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
      infoLogPath: `./logs`,
      infoLogName: `%DATE%-${process.env.NODE_ENV}-info.log`,
      errorLogPath: `./logs`,
      errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`,
    };
    const mergeOptions = {
      maxSize: judgeIfStatus(options?.maxSize)
        ? options.maxSize
        : defaultOptions.maxSize,
      maxFiles: judgeIfStatus(options?.maxFiles)
        ? options.maxFiles
        : defaultOptions.maxFiles,
      infoLogPath: judgeIfStatus(options?.infoLogPath)
        ? options.infoLogPath
        : defaultOptions.infoLogPath,
      infoLogName: judgeIfStatus(options?.infoLogName)
        ? options.infoLogName
        : defaultOptions.infoLogName,
      errorLogPath: judgeIfStatus(options?.errorLogPath)
        ? options.errorLogPath
        : defaultOptions.errorLogPath,
      errorLogName: judgeIfStatus(options?.errorLogName)
        ? options.errorLogName
        : defaultOptions.errorLogName,
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
