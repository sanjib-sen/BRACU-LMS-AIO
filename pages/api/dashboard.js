
const puppeteer = require("puppeteer");
const config = require("./data/config.json");
const cookies = require("./data/cookies.json");
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('./scratch');

export default async (req, res) =>{
    res.status(200).json({'courses': await getdata()})
}
// { headless: false }

async function getdata(){

    const browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    const link =
      "https://bux.bracu.ac.bd/dashboard";

    await page.goto("https://bux.bracu.ac.bd/login"), 
    await page.type("#login-email", localStorage.getItem('email'), { delay: 30 });
    await page.type("#login-password", localStorage.getItem('password'), { delay: 30 });
  
    await page.click("#login > button");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.goto(link, { waitUntil: "networkidle2" });
    let texts = await page.evaluate(() => {
      data = [];
      const parents = document.getElementsByClassName(
        "action action-more"
      );
  
      for (var parent of parents) {
        var course = {
          title: parent.getAttribute("data-course-name"),
          id: parent.getAttribute("data-course-number"),
          link: 'https://bux.bracu.ac.bd/courses/'+parent.parentNode.getAttribute('data-course-key')+'/course/',
        };
        data.push(course);
      }
      return data;
    });
    browser.close();
    return texts;
    
}