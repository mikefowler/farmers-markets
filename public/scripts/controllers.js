(function () {
 
  'use strict';

  var module = angular.module('markets.controllers', []);

  function SearchCtrl ($scope, Search) {

    $scope.loading = false;

    $scope.$watch('zip', function (zip) {
        
      // If the zip code isn't valid, hide any previous results
      // and do not perform additional queries.
      if (!zip || zip.length !== 5) {
        $scope.results = [];
        return;
      }

      // Cancel existing requests
      if ($scope.results.$promise) {
        $scope.results.$promise.reject();
      }

      // With a valid zip code, search for markets
      $scope.results = Search.query({ zip: zip });
      $scope.loading = true;

      $scope.results.$promise.then(function () {
        $scope.loading = false;
      });

    });

  }

  module.controller('SearchCtrl', ['$scope', 'Search', SearchCtrl]);

}());