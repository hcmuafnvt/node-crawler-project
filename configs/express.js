var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

module.exports = function(app) {
   app.use(bodyParser.urlencoded({extended: false}));
   app.use(bodyParser.json());
   app.set('view engine', 'html');
   app.engine('html', ejs.renderFile);
   app.use(expressLayouts);
}
