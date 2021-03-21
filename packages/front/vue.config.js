const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    config.plugin("copy").tap(([pathConfigs]) => {
      const to = pathConfigs[0].to;
      pathConfigs[0].force = true; // so the original `/public` folder keeps priority

      // add other locations.
      pathConfigs.unshift({
        from: "*.js",
        to: to + "/js",
        context: "node_modules/core/lib"
      });
      return [pathConfigs];
    });
  }
};
