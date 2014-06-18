'use strict';

angular.module('markets.controllers', [])

  .controller('SearchCtrl', ['$scope', function ($scope) {

    $scope.$watch('zip', function (zip) {
      if (!zip || zip.length !== 5) return;
      console.log('search for ' + zip);
    });

  }]);