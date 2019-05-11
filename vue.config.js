const config = {
  chainWebpack: (cfg) => {
    cfg.module.rules.delete('eslint');
  },
};

module.exports = config;
