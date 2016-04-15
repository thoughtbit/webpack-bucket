module.exports = function(config) {
  // add hot-reload related code to entry chunks
  Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ['./build/dev-client'].concat(config.entry[name]);
  });
  return config;
};