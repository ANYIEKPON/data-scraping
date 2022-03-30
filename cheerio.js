const { startBrowser } = require("./puppeteer");
const cheerio = require("cheerio");
const { get, index } = require("cheerio/lib/api/traversing");


async function scrapeData(url) {
    const browser = await startBrowser();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle0"});
    await page.waitForSelector(".entry-title a");
    const content = await page.content();
    const links = await getNewsData(content);
    for (let link of links ) {
        await page.goto(link);
        await page.waitForSelector('.entry-main');
        const pageContent = await page.content();
        await getCurrentPageNewsData(pageContent);

    }
    await page.waitForSelector(".entry-title");
    const newsTitle = await page.content();
    await getNewsTitle(newsTitle);

    await browser.close();
}

async function getNewsData(html) {
    const linkso = [];
    const $ = cheerio.load(html);
    $('.entry-title a').each((index, element) => {
       linkso.push($(element).attr('href'));
    });
    return linkso;
}

    async function getCurrentPageNewsData(html) {
        const description = [];
        const $ = cheerio.load(html);
        $('.entry-content').each((index, element) => {
           const descript = $(element).find("p").text().replace(/\n/g, '');
               description.push(descript);
           return description; 
        })
        }

        async function getNewsTitle(html) {
            title = [];
            const $ = cheerio.load(html);
            $('.entry-title ').each((index, element) => {
               title.push(($(element).text()));
               console.log(title);
            });
            
        }

        async function allNews(html) {
            title = [];
            const $ = cheerio.load(html);
            $('.entry-title ').each((index, element) => {
               title.push(($(element).text()));
               console.log(title);
            });
            
        }
        
        

scrapeData("https://punchng.com/");