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
	res.status(200).json(await getdata(req.body.email, req.body.password));
};

async function getdata(email, password) {
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
		return "{}";
	}
	let page = await browser.newPage();
	await page.goto("https://bux.bracu.ac.bd/login"),
		await page.type("#login-email", email);
	await page.type("#login-password", password);

	await page.click("#login > button");
	await page.setDefaultNavigationTimeout(12500);

	try {
		await page.waitForNavigation({ waitUntil: "networkidle2" });
	} catch (error) {
		console.log("error asche");
		browser.close();
		return "{}";
	}

	let currentcookies = await page.cookies();
	browser.close();
	return currentcookies;
}
