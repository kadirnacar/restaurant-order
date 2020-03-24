module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@components": "./src/components",
            "@models": "./src/models",
            "@reducers": "./src/reducers",
            "@services": "./src/services",
            "@store": "./src/store/",
            "@config": "./src/config.ts",
            "@utils": "./src/utils.ts",
            "@tools": "./src/tools",
          }
        }
      ]
    ]
  };
};
