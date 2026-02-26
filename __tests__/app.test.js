const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET METHODS", () => {
  describe("/api/topics", () => {
    test("200: Returns all topics i.e slug, description.", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(typeof topic.img_url).toBe("string");
          });
        });
    });
  });

  describe("/api/articles", () => {
    test("200: Returns all articles, with props: author, title, article_id, topic, created_at, votes, article_img_url.", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
          });
        });
    });
    test("200 : articles should have prop: comment_count.", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(typeof article.comment_count).toBe("number");
          });
        });
    });
    test("articles should be descending order.", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("articles should not have a body property.", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(typeof article.body).toBe("undefined");
          });
        });
    });
  });

  describe("/api/users", () => {
    test("200: return all users.", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
        });
    });
  });

  describe("/api/articles/:article_id", () => {
    test("200: return article by its id .", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(article.article_id).toBe(1);
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("number");
          });
        });
    });
    test("404: return 404 when article id is invalid.", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Article not found!");
        });
    });
    test("400: return bad request when passed in invalid input typej.", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    test("200: get all comments for an article via id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          comments.forEach((comment) => {
            expect(comment.article_id).toBe(1);
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.article_id).toBe("number");
          });
        });
    });
    test("comments should be accending order via article_id.", () => {
      return request(app)
        .get("/api/articles/4/comments")
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("404: return 404 when sorting comments by an invalid article_id.", () => {
      return request(app)
        .get("/api/articles/1234/comments")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Article not found!");
        });
    });
    test("400: return bad request when passed in invalid article_id type.", () => {
      return request(app)
        .get("/api/articles/banana/comments")
        .expect(400)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Bad request!");
        });
    });
  });
});

describe("POST METHODS", () => {
  describe("/api/articles/:article_id/comments", () => {
    test("201: add a comment for an article.", () => {
      const newComment = {
        username: "icellusedkars",
        body: "new test comment!",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;

          expect(comment.article_id).toBe(2);
          expect(comment.author).toBe(newComment.username);
          expect(comment.body).toBe(newComment.body);
        });
    });
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    //  should be about 8 error handling cases to test for !!!!!!!!!! TO-DO
  });
});

describe("PATCH METHODS", () => {
  describe("/api/articles/:article_id", () => {
    test("200: updates an article by updating votes and return updated article. ", () => {
      const newVotes = { inc_votes: 1 };
      return request(app)
        .patch("/api/articles/4")
        .send(newVotes)
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.article_id).toBe(4);
          expect(article.votes).toBe(1);
        });
    });
  });
});

describe("DELETE METHODS", () => {
  describe("/api/comments/:comment_id", () => {
    test("204: deletes the given comment by comment id", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
  });
});
