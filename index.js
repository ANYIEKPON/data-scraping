const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
    const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto("https://punchng.com/ebonyi-community-joins-police-to-unmask-killers-of-35-year-old-lady/");

        
        
        const  latestNews = await page.evaluate(() => {
            const news = document.querySelectorAll(".entry-content p");
            let latNews = [];
            
            news.forEach((tag) => {
                
                
                latNews.push(tag.innerText);
            });
            return latNews;
        });
        console.log(latestNews);
         await browser.close();
})();