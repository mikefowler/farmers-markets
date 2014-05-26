// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var os = require('os')
var path = require('path');

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

function set(name, value) {
  if (!(name in process.env)) {
    process.env[name] = value;
  }
}

function load(envPath, env) {
  require(path.join(envPath, env));
}

function loadDev(envPath, env) {
  var hostname = os.hostname().split(/[ ._]/)[0];
  var devConfig = path.join(envPath, env + '.' + hostname);

  try {
    console.log('Attempting to require configuration:', devConfig + '.js');
    require(devConfig);
  } catch (e) {
    console.log(' ↳  No custom configuration found.');
  }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

exports.set = set;
exports.load = load;
exports.loadDev = loadDev;