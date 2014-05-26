// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var express = require('express');
var _ = require('underscore');
var url = require('url');
var mincer = require('mincer');

require('./lib/underscore-ext');
require('./lib/error-ext');

// ----------------------------------------------------------------------------
// Environment/Configuration
// ----------------------------------------------------------------------------

var config =  require('./lib/config');
var path = require('path');

var environment = process.env.NODE_ENV || 'development';
config.load(path.join(__dirname, 'config', 'environment'), environment);

if (environment === 'development') {
  config.loadDev(path.join(__dirname, 'config', 'environment'), environment);
}

// -----------------------------------------------------------------------------
// Redis
// -----------------------------------------------------------------------------

var redis = require('./db/redis');

if (environment === 'production') {
	var redisURL = url.parse(process.env.REDISCLOUD_URL);
	redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
	redis.client().auth(redisURL.auth.split(":")[1]);
} else {
	redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
}

// -----------------------------------------------------------------------------
// Asset Pipeline
// -----------------------------------------------------------------------------

var pipeline = new mincer.Environment();
pipeline.appendPath('app/assets/javascripts');
pipeline.appendPath('app/assets/stylesheets');
pipeline.appendPath('app/assets/templates');
pipeline.appendPath('vendor/assets/javascripts');
pipeline.appendPath('vendor/bower_components');
pipeline.enable('source_maps');

// -----------------------------------------------------------------------------
// Application
// -----------------------------------------------------------------------------

var app = express();
var port = process.env.PORT || 8080;

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

var morgan = require('morgan');
var errorHandler = require('./app/middleware/error-handler');

if (environment === 'development') {
	app.use(morgan('dev'));
}

app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.set('views', './app/views');
app.set('view engine', 'html');
app.use('/assets', mincer.createServer(pipeline));

var controllers = _.requireDir(path.join(__dirname, 'app', 'controllers'));

app.get('/api/search', controllers.search.index);

app.get('/*', function (req, res) {
	res.render('index');
});

app.use(errorHandler);

// -----------------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------------

app.listen(port);
console.log('Running Express on port ' + port);