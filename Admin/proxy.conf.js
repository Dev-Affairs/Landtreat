const PROXY_CONFIG = [
  {
    target: "http://localhost:3000",  // The target backend server
    secure: false,  // If the backend is HTTPS, set this to true
    changeOrigin: true,  // Needed for virtual hosted sites
    logLevel: "debug",  // Level of logging for proxy
  }
];

module.exports = PROXY_CONFIG;
