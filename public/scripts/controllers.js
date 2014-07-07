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

    $scope.mapOptions = {
      zoom: 4,
      center: {
        latitude: 38.555474567327686,
        longitude: -95.66499999999996
      },
      options: {
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        panControl: false,
        styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}]
      }
    };

  }

  module.controller('SearchCtrl', ['$scope', 'Search', SearchCtrl]);

}());