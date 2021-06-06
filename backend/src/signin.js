const fs = require("fs");
const config = require("../data/config.json");
const cookies = require("../data/cookies.json");

exports.login = async function (page) {
  page = await page;
  if (Object.keys(cookies).length) {
    await page.setCookie(...cookies);
  } else {
    await page.goto("https://bux.bracu.ac.bd/login", {
      waitUntil: "networkidle2",
    });
    await page.type("#login-email", config.email, { delay: 30 });
    await page.type("#login-password", config.password, { delay: 30 });

    await page.click("#login > button");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    try {
      await page.$x(
        "/html/body/div[2]/header/div[1]/div[2]/div/div/div[1]/a/span[1]"
      );
    } catch (error) {
      console.log("Failed to Login");
      process.exit(0);
    }

    let currentcookies = await page.cookies();
    fs.writeFileSync("./data/cookies.json", JSON.stringify(currentcookies));
    await page.setCookie(...currentcookies);
  }
  return page;
}
