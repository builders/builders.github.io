require("dotenv").config();

const fs = require("fs");
const ghostContentAPI = require("@tryghost/content-api");

// Init Ghost API
const imagine_api = new ghostContentAPI({
    url: process.env.IMAGINE_API_URL,
    key: process.env.IMAGINE_API_KEY,
    version: "v3"
});

const design_api = new ghostContentAPI({
    url: process.env.DESIGN_API_URL,
    key: process.env.DESIGN_API_KEY,
    version: "v3"
});

const build_api = new ghostContentAPI({
    url: process.env.BUILD_API_URL,
    key: process.env.BUILD_API_KEY,
    version: "v3"
});

const socialarc_api = new ghostContentAPI({
    url: process.env.SOCIALARC_API_URL,
    key: process.env.SOCIALARC_API_KEY,
    version: "v3"
});

module.exports = function(config) {

  // Get all imagine posts
  config.addCollection("imagine_posts", async function(collection) {
      collection = await imagine_api.posts
          .browse({
              include: "tags,authors",
              limit: "all"
          })
          .catch(err => {
              console.error(err);
          });

      return collection;
  });

  // Get all design posts
  config.addCollection("design_posts", async function(collection) {
      collection = await design_api.posts
          .browse({
              include: "tags,authors",
              limit: "all"
          })
          .catch(err => {
              console.error(err);
          });

      return collection;
  });

  // Get all build posts
  config.addCollection("build_posts", async function(collection) {
      collection = await build_api.posts
          .browse({
              include: "tags,authors",
              limit: "all"
          })
          .catch(err => {
              console.error(err);
          });

      return collection;
  });

  // Get all social architecture posts
  config.addCollection("socialarc_posts", async function(collection) {
      collection = await socialarc_api.posts
          .browse({
              include: "tags,authors",
              limit: "all"
          })
          .catch(err => {
              console.error(err);
          });

      return collection;
  });

  config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    passthroughFileCopy: true,
    templateFormats: [
      "css",
      "html",
      "ico",
      "jpg",
      "md",
      "njk",
      "png",
      "svg"
    ]
  }
};
