
const env = process.env.NODE_ENV;

const config = {
  development: {
    server: {
      port: process.env.PORT || process.env.DB_PORT_DEVELOPMENT,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: process.env.DB_URL_DEVELOPMENT,
    },
  },

  test: {
    server: {
      port: process.env.PORT || 8100,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: 'mongodb://localhost/colab-test',
    },
  },

  production: {
    server: {
      port: process.env.PORT || process.env.DB_PORT_PRODUCTION,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: process.env.DB_URL_PRODUCTION,
    },
  },
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];
