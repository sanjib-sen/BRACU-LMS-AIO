
const puppeteer = require("puppeteer");
const config = require("./data/config.json");
const cookies = require("./data/cookies.json");


export default async (req, res) =>{
    res.status(200).json({'assesments': await getdata()})
}
// { headless: false }
async function getdata(){
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    const link =
      "https://bux.bracu.ac.bd/courses/course-v1:buX+FRN101+2020_Summer/course/";
    await page.goto("https://bux.bracu.ac.bd/login"), 
    await page.type("#login-email", config.email, { delay: 30 });
    await page.type("#login-password", config.password, { delay: 30 });
  
    await page.click("#login > button");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.goto(link, { waitUntil: "networkidle2" });
    let texts = await page.evaluate(() => {
      data = [];
      const parents = document.getElementsByClassName(
        "localized-datetime subtitle-name"
      );
  
      for (var parent of parents) {
        if (parent.getAttribute("data-datetime") == "") {
          continue;
        }
  
        const childtitle =
          parent.parentElement.parentElement.parentElement.firstElementChild;
        title = childtitle.innerHTML.trim();
  
        if (title == "") {
          const childtitle =
            parent.parentElement.parentElement.parentElement.firstElementChild
              .nextElementSibling;
          title = childtitle.innerHTML.trim().split("\n")[0];
        }
  
        typedate = parent.innerHTML.trim();
  
        assesmenttype = typedate.split("due")[0].trim();
        if (assesmenttype == "") assesmenttype = "Exam";
        date = typedate.split("due")[1].trim();
  
        var assesment = {
          title: title,
          raw: parent.getAttribute("data-datetime"),
          type: assesmenttype,
          date: date,
        };
        data.push(assesment);
      }
      return data;
    });
    browser.close();
    return texts;
    
}