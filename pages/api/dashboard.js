let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
	// running on the Vercel platform.
	chrome = require("chrome-aws-lambda");
	puppeteer = require("puppeteer-core");
} else {
	// running locally.
	puppeteer = require("puppeteer");
}

export default async (req, res) => {
	res.status(200).json(await getdata(req.body.cookies));
};

async function getdata(cookies) {
	// const browser = await puppeteer.launch();
	try {
		let browser = await puppeteer.launch({
			args: [
				...chrome.args,
				"--hide-scrollbars",
				"--disable-web-security",
			],
			defaultViewport: chrome.defaultViewport,
			executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
	let page = await browser.newPage();
	cookies = JSON.parse(cookies);
	const link = "https://bux.bracu.ac.bd/dashboard";
	await page.setCookie(...cookies);

	await page.goto(link, { waitUntil: "networkidle2" });
	let texts = await page.evaluate(() => {
		data = [];
		const parents = document.getElementsByClassName("action action-more");

		for (var parent of parents) {
			var course = {
				title: parent.getAttribute("data-course-name"),
				course_id: parent.getAttribute("data-course-number"),
				id:
					"https://bux.bracu.ac.bd/courses/" +
					parent.parentNode.getAttribute("data-course-key") +
					"/course/",
				semester: parent.parentNode
					.getAttribute("data-course-key")
					.split("+")[2]
					.split("/")[0],
			};
			data.push(course);
		}
		return data;
	});
	browser.close();
	return texts;
}
