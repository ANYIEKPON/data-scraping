const request = require ('request-promise');
const cheerio = require('cheerio');

const urls = "https://punchng.com/just-in-gunmen-attack-imo-police-station-injure-two-officers/"  


const scrapeResults = [];

async function scrapeNews() {
    try {
        const htmlResult = await request.get(urls);
        const $ = await cheerio.load(htmlResult);

        $(".entry-content ").each((index, element) => {
            const resultTitle = $(element);
            const title = resultTitle.find("p").text().replace(/\n/g, '');
            const url = resultTitle.attr('href');
            const scrapeResult = { title, url };
            scrapeResults.push(scrapeResult);
          });
          console.log(scrapeResults);

    } catch (err) {
        console.error(err);
    }
    
}
// async function scrapeDescription(newsWithHeaders) {
//     await Promise.all( 
//         newsWithHeaders.map(async news => {
//         const htmlResult = await request.get(news.url);
//         const $ = await cheerio.load(htmlResult);
//         news.description = $(".entry-content").text();
//     })
//     );
// }

// async function scrapeCraigList() {
//     const newsWithHeaders = await scrapeNews();
//     const newsFullData = await scrapeDescription(newsWithHeaders);
// }

scrapeNews();