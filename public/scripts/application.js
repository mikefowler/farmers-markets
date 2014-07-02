(function () {

  'use strict';

  var app = angular.module('markets', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'markets.controllers',
    'markets.resources'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    });

  }]);

}());