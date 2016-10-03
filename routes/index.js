module.exports = function(app) {
   app.get('/', function(req, res) {
      res.render('index');
   });

   app.get('/contact', function(req, res) {
      res.render('contact');
   });

   app.get('/news', function(req, res) {
      res.render('news/index');
   });

   app.get('/news/health', function(req, res) {
      res.render('news/health');
   });

   app.get('/news/tech', function(req, res) {
      res.render('news/tech');
   });

   app.use(function(req, res) {
      res.end('<h1>404 page</h1>');
   });
};
