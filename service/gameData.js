angular.module('vngame').factory('gameData', function ($http, $log) {

    var gameData = {};

    gameData.data = undefined;

    gameData.loaded = false;
    gameData.onLoad = angular.noop;

    $http.get('/data/gd.json')
        .success(function (result, a, b) {
            gameData.loaded = true;
            gameData.data = result;
            gameData.onLoad();
        });

    gameData.getScene = function (name) {
        return gameData.data.scenes[name] || {
            text: 'no such scene'
        };
    };

    return gameData;
});