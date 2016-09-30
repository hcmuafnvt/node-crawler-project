var Crawler = require("simplecrawler");

var crawler = new Crawler("http://stag.expat.la/");

// crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
//     console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
//     console.log("It was a resource of type %s", response.headers['content-type']);
// });

crawler.on('queueadd', function(queueItem) {
   console.log(queueItem.url);
});

crawler.interval = 10000; // Ten seconds
crawler.maxConcurrency = 3;

crawler.maxDepth = 2; // First page and discovered links from it are fetched


crawler.start();
