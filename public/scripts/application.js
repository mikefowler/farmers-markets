'use strict';

var app = angular.module('markets', [
  'ngRoute',
  'markets.controllers'
]);

app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'partials/search.html',
    controller: 'SearchCtrl'
  });

}]);