angular.module('vngame').controller('PlayCtrl', function ($scope, $routeParams, $log, $location, gameData, sound) {
    var init = function () {
        $scope.scene = gameData.getScene($routeParams.id);
        $log.log('init', $routeParams.id, $scope.scene);
        $scope.loading = false;

        if ($scope.scene.text) {

            if (typeof $scope.scene.text === 'string') {
                $scope.unrenderedParagraphs = $scope.scene.text.split('\n');
            } else {
                $scope.unrenderedParagraphs = angular.copy($scope.scene.text);
            }
        }

        $scope.img = $scope.scene.img;
        sound.play('theme');
    };

    $scope.unrenderedParagraphs = [];
    $scope.paragraphs = [];

    $scope.nextParagraph = function () {
        if ($scope.unrenderedParagraphs.length > 0) {
            var nextParagraph = $scope.unrenderedParagraphs.splice(0, 1)[0];

            $scope.paragraphs.push(nextParagraph);
            if ($scope.scene.imgAlternate) {
                if ($scope.img === $scope.scene.imgAlternate) {
                    $scope.img = $scope.scene.img;
                } else {
                    $scope.img = $scope.scene.imgAlternate;
                }
            }
            if ($scope.paragraphs.length > 5) {
                $scope.paragraphs.splice(0, 1);
            }
        }
    };

    if (gameData.loaded) {
        init();
    } else {
        $scope.loading = true;
        gameData.onLoad = function () {
            init();
        };
    }
});