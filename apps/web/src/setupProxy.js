const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: "http://localhost:3001",
      ws: true,
      changeOrigin: true,
    })
  );
  app.use(
    /^\/(icons|sonarr|radarr)/,
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
