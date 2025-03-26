const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/ws/**',
    createProxyMiddleware({
      target: 'https://fit-conf.shop',
      changeOrigin: true,
      secure: false, // SSL 인증서 무시 (필요 시)
      ws: true,       // 🔥 WebSocket 프록시 필수
      logLevel: 'debug', // 🔍 디버깅용 로그 (개발 중에만)
    })
  );
};
