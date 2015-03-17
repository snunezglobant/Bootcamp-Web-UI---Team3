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
        .when('/album/:idAlbum', {
            controller: 'albumCtrl',
            templateUrl: 'views/album.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
app.controller('searchHome', function($scope, $http) {
    $(".searchHome").keyup(function() {
        var band = $scope.searchHome;
        if (band.length == 0 || band == 'NULL') {
            $('#sectionView').css({
                'height': '0rem',
                '-webkit-transition': '.3s',
                '-moz-transition': '.3s',
                'transition': '.3s'
            });
        } else {
            $('#sectionView').css({
                'height': '14rem',
                '-webkit-transition': '.3s',
                '-moz-transition': '.3s',
                'transition': '.3s'
            });
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

            $('#listAA2').click(function() {
                $('#sectionView').css({
                    'height': '0rem',
                    '-webkit-transition': '.3s',
                    '-moz-transition': '.3s',
                    'transition': '.3s'
                });
                $(".searchHome").focus();
            });
        }
    });
    $('body').click(function() {
        $('#sectionView').css({
            'height': '0rem',
            '-webkit-transition': '.3s',
            '-moz-transition': '.3s',
            'transition': '.3s'
        });
    });
});
app.controller('searchCtrl', function($scope, $http) {
    $('.hHome').css('display', 'none');
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
    $('.hHome').css('display', 'inline-block');
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
            window.scrollBy(0, 670);
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
    $('.hHome').css('display', 'inline-block');
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
app.controller('albumCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $('.hHome').css('display', 'inline-block');
    var idalbum = $routeParams.idAlbum
    $http.get('https://api.spotify.com/v1/albums/' + idalbum)
        .success(function(data) {
            console.log(data);
            $scope.album = data;
        })
        .error(function(err) {
            console.log(err);
        });
    $http.get('https://api.spotify.com/v1/albums/' + idalbum + '/tracks')
        .success(function(data) {
            console.log(data);
            $scope.tracks = data.items;
        })
        .error(function(err) {
            console.log(err);
        });
}]);