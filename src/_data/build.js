require("dotenv").config();

const ghostContentAPI = require("@tryghost/content-api");

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.BUILD_API_URL,
  key: process.env.BUILD_API_KEY,
  version: "v3"
});

// Get all site information
module.exports = async function() {
  const siteData = await api.settings
    .browse({
      include: "icon,url"
    })
    .catch(err => {
      console.error(err);
    });

  return siteData;
};
