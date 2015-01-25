angular.module('vngame').factory('gameData', function ($http, $log) {

    var gameData = {};
    var _ = window._;

    gameData.data = undefined;

    gameData.loaded = false;
    gameData.onLoad = angular.noop;

    var preloadImages = function (data) {
        var scenes = data.scenes,
            unique = _.map(_.uniq(_.compact(_.pluck(scenes, 'imgAlternate').concat(_.pluck(scenes, 'img')))), function (item) {
                return 'images/' + item;
            });
        $log.log('data', scenes);
        $log.log('unqiues', _.pluck(scenes, 'imgAlternate'), unique);

        function preLoad(paths) {
            for (var i = 0; i < paths.length; i++) {
                var img = new Image();
                img.src = paths[i];
            }
        }

        preLoad(unique);
    };

    $http.get('data/gd.json')
        .success(function (result, a, b) {
            gameData.loaded = true;
            gameData.data = result;
            preloadImages(result);
            gameData.onLoad();
        });

    gameData.getScene = function (name) {
        return gameData.data.scenes[name] || {
            text: 'no such scene'
        };
    };

    return gameData;
});