var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'searchCtrl',
            templateUrl: 'views/home.html'
        })
        .when('/artist/:idArtist', {
            controller: 'artistCtrl',
            templateUrl: 'views/artist.html'
        })
        .when('/relatedartist/:idArtist', {
            controller: 'relatedCtrl',
            templateUrl: 'views/relatedartist.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
app.controller('searchCtrl', function($scope, $http) {
    $(".search").focus().keyup(function() {
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
app.controller('artistCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var idartist = $routeParams.idArtist;
    //artist
    $http.get('https://api.spotify.com/v1/artists/' + idartist)
        .success(function(data) {
            console.log(data);
            $scope.artist = data;
        })
        .error(function(err) {
            console.log(err);
        });
    //button for hide or show albums list 
    $scope.albumState = {};
    $scope.albumState.show = false;
    $scope.changeState = function() {
        $scope.albumState.show = !$scope.albumState.show;
        //move display to albums
        setTimeout(function() {
            window.scrollBy(0, 700);
        }, 0);
    };
    //albumsartist
    $http.get('https://api.spotify.com/v1/artists/' + idartist + '/albums')
        .success(function(data) {
            console.log(data);
            $scope.albums = data.items;
        })
        .error(function(err) {
            console.log(err);
        });
}]);
app.filter("capitalize", function() {
    return function(text) {
        if (text != null) {
            return text.substring(0, 1).toUpperCase() + text.substring(1);
        }
    }
});
app.controller('relatedCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var idartist = $routeParams.idArtist;
    //related artist  
    $http.get('https://api.spotify.com/v1/artists/' + idartist + '/related-artists')
        .success(function(data) {
            console.log(data);
            $scope.reartists = data.artists;
        })
        .error(function(err) {
            console.log(err);
        });
}]);