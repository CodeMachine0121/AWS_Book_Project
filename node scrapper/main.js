var ROOT_URL = 'https://ithelp.ithome.com.tw/';

var Crawler = require('simplecrawler');
var crawler = new Crawler(ROOT_URL);
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

crawler.interval = 6 * 1000;
crawler.maxConcurrency = 1;

crawler.on('crawlstart', function(){
    console.log('Crawler starting ', ROOT_URL);
});

crawler.addFetchCondition(function(queueItem, referrerQueueItem){
    return queueItem.path.indexOf('/questions/') > -1
})

crawler.on('fetchcomplete', function(queueItem, responseBuffer, response){
    if (ROOT_URL == queueItem.url) return;

    console.log('url: ', queueItem.url);
    $ = cheerio.load(responseBuffer);
    var title = $(".qa-header__title").text();
    console.log('new title: ', title);
    //console.log(queueItem);
});

crawler.on('complete', function(){
    console.log('Finished!', ROOT_URL)
});

crawler.start()

