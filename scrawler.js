var Crawler = require("simplecrawler"),
    cheerio = require('cheerio'),
    fs = require('fs'),
    toMarkdown = require('to-markdown');

var crawler = new Crawler("http://vnexpress.net/photo/thoi-su/hien-truong-xe-taxi-no-tung-tren-duong-3478068.html");

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    // console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    // console.log("It was a resource of type %s", response.headers['content-type']);

    var $ = cheerio.load(responseBuffer);
    var $content = $('#article_content');
    $content.find('a[href="javascript:void(0)"]').remove();
    var result = toMarkdown($content.html(), {
      converters: [
        {
          filter: 'div',
          replacement: function(content) {
            return '\n' + content + '\n\n';
          }
        }
      ]
    })
    fs.writeFileSync('result.txt' , result, 'utf8');
});

// crawler.discoverResources = function(buffer, queueItem) {
//     var $ = cheerio.load(buffer.toString("utf8"));

//     return $("img").map(function () {
//          return $(this).attr("src");
//     }).get();
// };

crawler.on('fetchstart', function(queueItem, resources) {
   console.log('fetchstart %s', queueItem.url);
});

// crawler.on('fetchcomplete', function(queueItem, responseBody, responseObject) {
//    if(queueItem.stateData.contentType === 'image/jpeg') {
//       var url = queueItem.url;
//       var fileName = 'images/' + url.substring(url.lastIndexOf('/') + 1, url.length);
//       fs.writeFile(fileName, responseBody, function(err){
//            if (err) throw err
//            console.log('File saved.')
//        })
//    }
// });
//

// crawler.discoverResources = function(buffer, queueItem) {
//     var $ = cheerio.load(buffer.toString("utf8"));

//     return $("a[href]").map(function () {
//         return $(this).attr("href");
//     }).get();
// };

crawler.on('discoverycomplete', function(queueItem, resources) {
   console.log('discoverycomplete %s', queueItem.url);
});

crawler.on('queueadd', function(queueItem) {
   console.log('queueadd %s ', queueItem.url);
});

crawler.on('complete', function() {
   console.log('++++++++ complete++++++++++++++');
});



crawler.interval = 10000; // Ten seconds
crawler.maxConcurrency = 3;
crawler.maxDepth = 1; // First page and discovered links from it are fetched
crawler.decodeResponses=true;


crawler.start();
