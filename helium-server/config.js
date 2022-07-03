const pg = require("pg");

const appsDirectory = "./apps";

const routerConfig = {
  eventEmitter: null,
};

const serverConfig = {
  hostname: "127.0.0.1",
  port: 5000,
  eventEmitter: null,
};

const dbConfig = {
  user: "postgres",
  database: "helium1",
  password: "postgres",
  host: "127.0.0.1",
  port: 5432,
  max: 10,
  eventEmitter: null,
};

const pool = new pg.Pool(dbConfig);

module.exports = {
  pool,
  serverConfig,
  dbConfig,
  routerConfig,
  appsDirectory,
};
