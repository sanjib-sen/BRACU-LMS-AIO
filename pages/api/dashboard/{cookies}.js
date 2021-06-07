
const puppeteer = require("puppeteer");
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage('./scratch');

export default async (req, res) =>{
    res.status(200).json({'courses': await getdata(req.query.cookies)})
}
// { headless: false }

async function getdata(cookies){

    const browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setCookie(...cookies);
    const link =
      "https://bux.bracu.ac.bd/dashboard";
    await page.goto(link, { waitUntil: "networkidle2" });
    let texts = await page.evaluate(() => {
      data = [];
      const parents = document.getElementsByClassName(
        "action action-more"
      );
  
      for (var parent of parents) {
        var course = {
          title: parent.getAttribute("data-course-name"),
          course_id: parent.getAttribute("data-course-number"),
          id: 'https://bux.bracu.ac.bd/courses/'+parent.parentNode.getAttribute('data-course-key')+'/course/',
        };
        data.push(course);
      }
      return data;
    });
    browser.close();
    return texts;
    
}