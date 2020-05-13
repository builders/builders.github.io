module.exports = function(eleventyConfig) {

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
