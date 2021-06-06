const { title } = require("process");


exports.get_one = async function (link, page)  {
  page = await page;
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
        title = childtitle.innerHTML.trim().split('\n')[0];
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

  console.log(texts);
}


