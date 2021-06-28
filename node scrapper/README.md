# NodeJS Crawler note
###### tags: `雲林科技大學`
::: info
專案網址: https://github.com/CodeMachine0121/AWS_Book_Project/tree/main/node%20scrapper
學習網址: https://ithelp.ithome.com.tw/articles/10187616
:::

##  Simple Crawler 
- ### 事件
    - crawlstart
        - 開始跟 restarted 的時候會觸發的事件
        ```javascript=
            crawler.on('crawlstart', function(){
                console.log('Crawl starting');
            });
        ```

    - fetchstart

        ```javascript=
        crawler.on("fetchstart", function(queueItem, requestOptions) {
            console.log('fetchStart', queueItem);
        });
        ``` 
    
    
    - fetchcomplete
        - 抓取完成的時候會觸發的事件，responseBody 預設是 buffer，所以取值時要用responseBody.toString()。
        ```javascript=
            crawler.on('fetchcomplete', function(queueItem, responseBody, responseObject){
                console.log("fetchcomplete", queueItem);
                console.log("body", responseBody.toString())
            });
        ```
            
            
    - fetcherror
        - 抓取出錯發生HTTP error會觸發的事件
        ```javascript=
            crawler.on('fetcherror', function(queueItem, responseObject){
                console.log("fetch error!");
            });
        ```
    - complete
        - 當爬蟲已經沒有東西可以爬，而且 queue 都做完的時候會觸發的事件
        ```javascript=
            crawler.on("complete", function(){
                console.log("Finished!");
            });
        ```
- ### 參數類
    - maxDepth
        - 設定爬蟲深度
        `crawler.maxDepth=3`
    - interval
        - 設定每次request的時間間隔，毫秒為單位
        `crawler.interval=250`
    - maxConcurrency
        - 最大限制的 Concurrency (同時執行發送的行程)
        `crawler.maxConcurrency=5`
    - userAgent
        - 設定發送訊息時是用甚麼發送，預設為
        `crawler.userAgent="Node/simplecrawler <version> (https://github.com/cgiffard/node-simplecrawler)"`
        
- ### 函數類
    - 新增抓取條件
    ```javascript=
        var conditionID = crawler.addFetchCondition(function(queueItem, referrerQueueItem){
            return queueItem.path.indexOf('/news/') > -1
        });
    ```
    or
    ```javascript=
        function condition(queueItem, referrerQueueItem){
            return queueItem.path.indexOf('/news/') > -1
        }
        var conditionID = crawler.addFethCondition(condition);
    ```
    - 移除條件
    `crawler.removeFetchCondition(conditionID);` 
    or
    `crawler.removeFetchCondition(condition);`

- ### fetchcomplete
  在執行**crawler.start()** 後程式會將我們輸入的網址內抓取html回來並自動將hmtl內所有的link再進行一次爬蟲直到該頁面沒有任何links(很符合爬蟲的意思)。當抓取完畢後會觸發**fetchcompplete**這個事件，並且事件中可以接收到 **queuItem** 這個參數跟 **response**，這就是它爬回來的結果了。 
  - queueItem 物件常用屬性
      - id: queue item的編號
      - path: url的路徑(uri)
      - url: url
      - depth: 目前爬行到的深度
      - 真實的queueItem的內容 => 自行run程式就知道了
          
                 
- ### 爬蟲的概念整理
    - #### 爬蟲行為策略
        - 選擇策略：決定所要下載的頁面
        - 重新訪問策略：決定什麼時候檢查頁面的更新變化
        - 平衡禮貌策略：指出怎麼避免站點超載
        - 並行策略：指出怎麼協同達到分散式抓取的效果
    - #### 抓取網頁策略
        - 廣度優先策略
        - 根度優先策略
    - #### 爬蟲種類
        -  **General Purpose Web Crawler**
            爬行對象從一個種子 URL 開始擴大到整個 Web，主要為入口網站搜尋引擎的爬蟲，追求最大覆蓋率。
        -  **Focused Web Crawler**
            根據特定目標抓取，有選擇性的訪問網路上的頁面與相關的連結，獲取所需要的訊息
        -  **Incremental Web Crawler**
            針對已經下載的網頁採取增量式更新，只爬行新產生的網頁或著已經發生變化的網頁的爬蟲，確保資訊是最新的。
        -  **Deep Web Crawler**
            普通搜尋引擎難以發現的網頁，深層頁面中的資訊量比普通的頁面資訊量更多，而且質量更好，但是普通的搜索引擎因技術限制而搜集不到這些訊息。例如必須登入資後才能得到的資訊，或跟頁面有 Javascript 互動後才能取得的資訊。






## Cheerio
用simplecrawler可以簡單地將網頁html撈出來，這屬於raw data如何從裏頭挑選出有用的資料，則使用Cherrio這類的 html parser 進行過濾
[參考文件](https://cnodejs.org/topic/5203a71844e76d216a727d2e)
- Example1 - 改變html值
```javascript=
    var cheerio = require('cheerio'),
        $ = cheerio.load('<h2 class="title">Hello world</h2>');
    // .是class #是ID
    $('h2.title').text('Hello');
    $('h2').addClass('welcome');
    $html();
    // 輸出 => <h2 class="title welcome"> Hello </h2>
```

- Example2 - 搜尋過濾html
```javascript=
    const html = '<ul id="fruits">'+
                    '<li class="apple" id="favorite">Apple</li>'+
                    '<li class="orange">Orange</li>'+
                    '<li class="pear">Pear</li> '+
                '</ul>';
    var cheerio = require('cheerio'),
        $ = cheerio.load(html);
    
    var apple = $('.apple', '#fruits').text(); // => Apple
    var fruit = $('#fruits').text();
```
- **.attr(name, value)** 取值
```javascript=
    $('ul').attr('id')
    // => fruits
    
    $('.apple').attr('id', 'favorite').html()
    // => <li class="apple" id="favorite">Apple</li>
```
