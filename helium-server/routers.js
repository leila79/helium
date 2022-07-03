module.exports = {
  "/": sayHello,
  "/posts": showPost,
  "/posts?Id": postDetails,
};

const pg = require("pg");
const url = require("url");

var config = {
  user: "postgres",
  database: "helium1",
  password: "postgres",
  host: "127.0.0.1",
  port: 5432,
  max: 10,
};

const pool = new pg.Pool(config);

async function query(q) {
  const client = await pool.connect();
  let res;
  try {
    await client.query(`SET NAMES 'utf-8'`);
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

function sayHello(req, res) {
  res.statuscode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.end("Welcom to helium project");
}

async function showPost(req, res) {
  res.statuscode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  try {
    let posts = await query("SELECT * FROM posts ORDER BY date ASC LIMIT 3");
    // console.log(`posts is : ${JSON.stringify(posts)}`)
    var data = posts.rows;

    for (let i = 0; i < data.length; i++) {
      let users = await query(
        `SELECT first_name,last_name,profile_image FROM users WHERE user_id=${data[i].user_id}`
      );
      let tags = await query(
        `SELECT titles FROM tags WHERE post_id=${data[i].id}`
      );

      console.log("users:" + users.rows);
      data[i].tags = tags.rows;
      data[i].author = users.rows;
      // console.log(`users is : ${JSON.stringify(users.rows)}`)
    }
    console.log(data);
  } catch (err) {
    console.log("Database " + err);
  }
  res.end(JSON.stringify(data));
}

async function postDetails(req, res) {
  console.log("hellooooooo");
  const parsed = url.parse(req.url);
  const post_id = JSON.parse(JSON.stringify(parsed.query)).split("=")[1];
  res.statuscode = 200;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  try {
    let posts = await query(`SELECT * FROM posts WHERE id=${post_id}`);
    var data = posts.rows;

    let users = await query(
      `SELECT first_name,last_name,profile_image FROM users WHERE user_id=${data[0].user_id}`
    );
    let tags = await query(
      `SELECT title FROM tags WHERE post_id=${data[0].id}`
    );

    data[0].tags = tags.rows;
    data[0].author = users.rows;

    let otherPosts = await query(
      `SELECT * FROM posts WHERE user_id=${data[0].user_id} ORDER BY date ASC LIMIT 3`
    );
    data[0].otherPosts = otherPosts.rows;

    let comments = await query(
      `SELECT * FROM comments WHERE post_id=${post_id} ORDER BY date ASC`
    );

    for (let i = 0; i < comments.rows.length; i++) {
      let replies = await query(
        `SELECT * FROM replies WHERE post_id=${post_id} AND comment_id=${comments.rows[i].id}`
      );

      for (let item = 0; item < replies.rows.length; item++) {
        console.log("id" + replies.rows[item].user_id);
        let user = await query(
          `SELECT first_name,last_name,profile_image FROM users WHERE user_id=${replies.rows[item].user_id}`
        );
        console.log("users is" + JSON.stringify(user.rows));
        replies.rows[item].users = user.rows;
      }

      comments.rows[i].replies = replies.rows;
    }

    data[0].comments = comments.rows;
  } catch (err) {
    console.log("Database " + err);
  }
  res.end(JSON.stringify(data[0]));
}
