const request = require ('request-promise');
const cheerio = require('cheerio');

const urls = "https://punchng.com/"  


const scrapeResults = [];

async function scrapeNews() {
    try {
        const htmlResult = await request.get(urls);
        const $ = await cheerio.load(htmlResult);

        $(".entry-title a ").each((index, element) => {
            const resultTitle = $(element);
            const title = resultTitle.text();
            const url = resultTitle.attr('href');
            const scrapeResult = { title, url };
            scrapeResults.push(scrapeResult);
          });
          return scrapeResults;

    } catch (err) {
        console.error(err);
    }
    
}
async function scrapeDescription(newsWithHeaders) {
    return await Promise.all( 
        newsWithHeaders.map(async news => {
        const htmlResult = await request.get(news.url);
        const $ = await cheerio.load(htmlResult);
        news.description =$(".entry-content").find("p").text();
        return news;
    })
    );
}

async function scrapeCraigList() {
    const newsWithHeaders = await scrapeNews();
    const newsFullData = await scrapeDescription(newsWithHeaders);
    console.log(newsFullData);
}

scrapeCraigList();