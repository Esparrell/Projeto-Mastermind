module.exports = {
  "/api": {
    target: process.env.API || "http://localhost:8000/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    },
    logLevel: "debug"
  }
};