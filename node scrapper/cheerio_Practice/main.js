const html =  '<ul id="fruits">'+
                    '<li class="apple">Apple</li>'+
                    '<li class="orange">Orange</li>'+
                    '<li class="pear">Pear</li> '+
               '</ul>'+
               '<div class="Text">filtered Text</div>';

var cheerio = require('cheerio'),
    $ = cheerio.load(html);

console.log($('.apple').text());
console.log($('#fruits').text());
console.log($('.Text').text());