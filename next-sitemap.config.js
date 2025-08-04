/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://easytoolspace.vercel.app", // no trailing slash
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [], // optionally exclude routes
  changefreq: 'daily',
  priority: 0.7,
};
