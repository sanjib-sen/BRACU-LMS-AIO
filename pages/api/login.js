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
	res.status(200).json(await getdata(req.body.email, req.body.password));
};

async function getdata(email, password) {
	// const browser = await puppeteer.launch();
	let browser = await getBrowserInstance();
	let page = await browser.newPage();
	await page.goto("https://bux.bracu.ac.bd/login"),
		await page.type("#login-email", email);
	await page.type("#login-password", password);

	await page.click("#login > button");
	await page.setDefaultNavigationTimeout(9000);

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
