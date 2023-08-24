# nuxt3-winston-log

nuxt3-winston-log is a Nuxt 3.x modules to add winston-powered logging to your Nuxt application

## Introductions:

By default the following events are captured:

1. error level
2. info level

just simple use **console.log** to log info level and **console.error** to log error level

## Installation:

1. Install npm package

```sh
$ yarn add nuxt3-winston-log # or npm i nuxt3-winston-log
```

2. Edit your `nuxt.config.js` file to add module

```js
{
  modules: ["nuxt3-winston-log"];
}
```

3. Change options using the `nuxt3WinstonLog` key as needed. See Usage section for details.

# Usage

1.  By default, `nuxt3-winston-log` exposes some basic options for common needs.

    The default values are:

    ```js
    // ...
    {
      // Maximum size of the file after which it will log
      // This can be a number of bytes, or units of kb, mb, and gb
      // If using the units, add 'k', 'm', or 'g' as the suffix. The units need to directly follow the number
      maxSize: "1024m",

      // Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days
      // If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format
      // It won't delete any file not contained in it. It can be a number of files or number of days
      maxFiles: "14d",

      // Path that info log files will be created in.
      // Change this to keep things neat.
      infoLogPath: `./logs`,

      // Name of info log file.
      // Change this to keep things tidy.
      infoLogName: `%DATE%-${process.env.NODE_ENV}-info.log`,

      // Path that error log files will be created in.
      // Change this to keep things neat.
      errorLogPath: `./logs`,

      // Name of error log file.
      // Change this to keep things tidy.
      errorLogName: `%DATE%-${process.env.NODE_ENV}-error.log`,

    }
    // ...
    ```

    Example in your apps `~/nuxt.config.js` file:

    ```js
    export default defineNuxtConfig({
      modules: ["nuxt3-winston-log"],
      nuxt3WinstonLog: {
        maxSize: "2048m",
        maxFiles: "30d",
      },
    });
    ```
