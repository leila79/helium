const { pool } = require("./config.js");

const messages = {
  SUCCESS: "درخواست موفقیت آمیز بود!",
  FAILED: "درخواست موفقیت آمیز نبود!",
  FORBBIDEN: "درخواست غیر مجاز است!",
};
const statusCodes = {
  SUCCESS: 200,
  NOTAUTHORIZED: 401,
  FAILED: 400,
};

const contentTypes = {
  JSON: "application/json",
};

function setHeaders(res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

function sendResponse(res, status, message, data = {}) {
  setHeaders(res);
  res.end(
    JSON.stringify({ statuscode: status, messages: message, result: data })
  );
}

async function query(q) {
  const client = await pool.connect();
  let res;
  try {
    await client.query("BEGIN");
    try {
      res = await client.query(q);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
}

module.exports = {
  setHeaders,
  sendResponse,
  query,
  messages,
  statusCodes,
  contentTypes,
};
