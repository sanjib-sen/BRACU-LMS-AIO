const puppeteer = require("puppeteer");

export default async (req, res) => {
	res.status(200).json(await getdata(req.body.cookies, req.body.link));
};

async function getdata(cookies, link) {
	const browser = await puppeteer.launch({ headless: false });
	let page = await browser.newPage();
	cookies = JSON.parse(cookies);
	await page.setCookie(...cookies);
	await page.goto(link, { waitUntil: "networkidle2" });
	let texts = await page.evaluate(() => {
		data = [];
		const parents = document.getElementsByClassName(
			"localized-datetime subtitle-name",
		);
		const courseid =
			document.getElementsByClassName("course-number")[0].innerHTML;
		count = 0;
		for (var parent of parents) {
			if (parent.getAttribute("data-datetime") == "") {
				continue;
			}

			const childtitle =
				parent.parentElement.parentElement.parentElement
					.firstElementChild;
			title = childtitle.innerHTML.trim();

			if (title == "") {
				const childtitle =
					parent.parentElement.parentElement.parentElement
						.firstElementChild.nextElementSibling;
				title = childtitle.innerHTML.trim().split("\n")[0];
			}

			typedate = parent.innerHTML.trim();

			assesmenttype = typedate.split("due")[0].trim();
			if (assesmenttype == "") assesmenttype = "Exam";
			date = typedate.split("due")[1].trim();

			var assesment = {
				id: count++,
				courseID: courseid,
				title: title,
				raw: parent.getAttribute("data-datetime"),
				type: assesmenttype,
				date: date,
			};
			console.log(courseid);
			data.push(assesment);
		}
		return data;
	});
	browser.close();
	return texts;
}
