const puppeteer = require("puppeteer");

export default async (req, res) => {
	res.status(200).json(await getdata(req.body.email, req.body.password));
};

async function getdata(email, password) {
	const browser = await puppeteer.launch();
	let page = await browser.newPage();
	await page.goto("https://bux.bracu.ac.bd/login"),
		await page.type("#login-email", email);
	await page.type("#login-password", password);

	await page.click("#login > button");
	await page.waitForNavigation({ waitUntil: "networkidle0" });

	try {
		await page.$x(
			"/html/body/div[2]/header/div[1]/div[2]/div/div/div[1]/a/span[1]",
		);
	} catch (error) {
		return undefined;
	}

	let currentcookies = await page.cookies();
	browser.close();
	return currentcookies;
}
