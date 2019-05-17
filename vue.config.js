const config = {
  chainWebpack: (cfg) => {
    cfg.module.rules.delete('eslint');
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sunnyday/'
    : '/',
};

module.exports = config;
