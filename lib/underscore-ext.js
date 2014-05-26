var _ = require('underscore');
var fs = require('fs');
var path = require('path');

_.mixin({

  requireDir: function (dir) {
    var required = {};

    fs.readdirSync(dir).forEach(function (filename) {
      if (filename.match(/\.js$/)) {
        required[filename.replace(/\.js$/, '')] = require(path.join(dir, filename));
      }
    });

    return required;
  }

});