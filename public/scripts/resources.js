(function () {

  'use strict';

  var module = angular.module('markets.resources', []);

  function Search ($resource) {
    return $resource('/api/search');
  }

  function Market ($resource) {
    return $resource('/api/market');
  }

  module.factory('Market', ['$resource', Market]);
  module.factory('Search', ['$resource', Search]);

}());