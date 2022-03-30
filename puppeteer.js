const puppeteer = require("puppeteer");

async function startBrowser() {
    let browser;
    try {
        console.log('opening the browser.......');
        browser = await puppeteer.launch();
    } catch (err) {
        console.log('could not create a browser instance => ', err);
    }
    return browser;
}

module.exports = {
    startBrowser,
};