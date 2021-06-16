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
	await page.setDefaultNavigationTimeout(12500);

	try {
		await page.waitForNavigation({ waitUntil: "networkidle2" });
	} catch (error) {
		console.log("error asche");
		browser.close();
		return "{}";
	}

	// var success = true;
	// console.log(page.url());
	// if (page.url() == "https://bux.bracu.ac.bd/dashboard") {
	// 	success = true;
	// }
	// if (success == false) {
	// 	browser.close();
	// 	console.log("error asche");
	// 	return "";
	// }
	// try {
	// 	await page.$x(
	// 		"/html/body/div[2]/header/div[1]/div[2]/div/div/div[1]/a/span[1]",
	// 	);
	// } catch (error) {
	// 	console.log("error asche");
	// 	return "";
	// }

	let currentcookies = await page.cookies();
	browser.close();
	return currentcookies;
}
