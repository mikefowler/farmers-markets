// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var express = require('express');
var _ = require('underscore');

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
redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

// -----------------------------------------------------------------------------
// Application
// -----------------------------------------------------------------------------

var app = express();
var port = process.env.PORT || 8080;

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

var morgan = require('morgan');

app.use(morgan());
app.use(express.static(__dirname + '/.tmp'));
app.use(express.static(__dirname + '/app/assets'));

// -----------------------------------------------------------------------------
// Router + routes
// -----------------------------------------------------------------------------

var router = express.Router();
var controllers = _.requireDir(path.join(__dirname, 'app', 'controllers'));

router.get('/search', controllers.search.index);
app.use('/api', router);

// -----------------------------------------------------------------------------
// Start
// -----------------------------------------------------------------------------

app.listen(port);
console.log('Running Express on port ' + port);