let puppeteer = require('puppeteer');
let cheerio = require('cheerio');

function Web_scrawler(URL){ 
    let html;
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const cookies = {
            name : "over18",
            value : "1",
            domain : "www.ptt.cc"
        };
        await page.setCookie(cookies);
        

        await page.goto(URL);

        
    
        // 撈出_body
        let body = await page.content();
    
        $ = await cheerio.load(body);
        HTML_Parser($);
        
        await browser.close();
    })();
     
}

function HTML_Parser($){
    
    $('.r-ent').each((i,el)=>{
        // 再用cheerio分析每個區塊
         let $$ = cheerio.load($(el).html());
         var id = $$('nrec').text().trim();
         var title = $$('.title').text().trim();
         console.log(id+" "+title);

         var author = $$('.meta .author').text().trim();
         var date = $$('.meta .date').text().trim();
         console.log("posted on "+date+" by "+author);
         console.log("");

    })
}

 Web_scrawler('https://www.ptt.cc/bbs/Gossiping/index.html');

