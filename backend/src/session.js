const puppeteer = require("puppeteer");

exports.start = async function () {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  return page;
}
