const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments AS c")
    .join("users AS u", "c.commenter_id", "=", "u.user_id")
    .select("u.user_email AS commenter_email")
    .count("c.comment")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  return knex("posts AS p")
    .join("comments AS c", "p.post_id", "=", "c.post_id")
    .join("users AS u", "c.commenter_id", "=", "u.user_id")
    .select(
      "c.comment",
      "c.comment_id",
      "u.user_email AS commenter_email",
      "p.post_body AS commented_post"
    )
    .where({ "c.comment_id": commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
