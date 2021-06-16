import chromium from "chrome-aws-lambda";

async function getBrowserInstance() {
	const executablePath = await chromium.executablePath;

	if (!executablePath) {
		// running locally
		const puppeteer = require("puppeteer");
		return puppeteer.launch({
			args: chromium.args,
			headless: true,
			ignoreHTTPSErrors: true,
		});
	}

	return chromium.puppeteer.launch({
		args: chromium.args,
		executablePath,
		headless: chromium.headless,
		ignoreHTTPSErrors: true,
	});
}

export default async (req, res) => {
	res.status(200).json(await getdata(req.body.cookies, req.body.link));
};

async function getdata(cookies, link) {
	// const browser = await puppeteer.launch(); //{ headless: false }

	let browser = puppeteer.launch({
		headless: true,
		defaultViewport: null,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--incognito",
			"--single-process",
			"--no-zygote",
		],
	});
	let page = await browser.newPage();
	cookies = JSON.parse(cookies);
	await page.setCookie(...cookies);
	await page.setDefaultNavigationTimeout(0);
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
			title =
				childtitle.innerHTML != "" ? childtitle.innerHTML.trim() : "";

			if (title == "") {
				const childtitle =
					parent.parentElement.parentElement.parentElement
						.firstElementChild.nextElementSibling;
				title = childtitle.innerHTML
					? childtitle.innerHTML.trim().split("\n")[0]
					: " ";
			}

			typedate = parent.innerHTML.trim();

			assesmenttype = typedate.split("due")[0]
				? typedate.split("due")[0].trim()
				: " ";
			if (assesmenttype == "") assesmenttype = "Exam";
			date = typedate.split("due")[1]
				? typedate.split("due")[1].trim()
				: " ";

			var assesment = {
				id: courseid + count.toString(),
				courseID: courseid,
				title: title,
				raw: parent.getAttribute("data-datetime"),
				type: assesmenttype,
				date: date,
			};
			count++;
			data.push(assesment);
		}
		return data;
	});
	browser.close();
	return texts;
}
