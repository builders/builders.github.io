const fs = require("fs");

module.exports = function(eleventyConfig) {

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404/index.html');
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
