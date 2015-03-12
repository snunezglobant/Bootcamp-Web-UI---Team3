var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'searchCtrl',
        templateUrl: 'views/home.html'
    })

    .otherwise({
        redirectTo: '/'
    });
});
app.controller('searchCtrl', function($scope, $http) {
    $(".search").keyup(function() {
        var band = $scope.search;
        $http.get('https://api.spotify.com/v1/search?type=artist&q=' + band)
        .success(function(data) {
            console.log(data);
            $scope.artists = data.artists.items;

        })
        .error(function(err) {
            return err;
        });
        $http.get('https://api.spotify.com/v1/search?type=album&q=' + band)
        .success(function(data) {
            console.log(data);
            $scope.albums = data.albums.items;
        })
        .error(function(err) {
            return err;
        });
    });
});