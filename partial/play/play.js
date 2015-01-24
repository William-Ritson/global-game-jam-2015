angular.module('vngame').controller('PlayCtrl', function ($scope, $routeParams, $log, $location, gameData, sound) {
    var init = function () {
        $scope.scene = gameData.getScene($routeParams.id);
        $log.log('init', $routeParams.id, $scope.scene);
        $scope.loading = false;

        if ($scope.scene.text) {
            $scope.unrenderedParagraphs = $scope.scene.text.split('\n');
            $scope.nextParagraph();
        }


        sound.play('theme');
        sound.savePos();
    };

    //$scope.theme = ngAudio.load('sounds/theme.mp3');

    $scope.unrenderedParagraphs = [];
    $scope.paragraphs = [];

    $scope.renderParagraphs = function (text) {
        return text.split("\n");
    };

    $scope.nextParagraph = function () {
        sound.savePos();

        if ($scope.unrenderedParagraphs.length < 1) {
            location.hash = '#/play/' + $scope.scene.next;
        } else {
            $scope.paragraphs.push($scope.unrenderedParagraphs.splice(0, 1)[0]);
        }
        sound.play('theme');

        //$scope.theme.play();
    };

    if (gameData.loaded) {
        init();
    } else {
        $scope.loading = true;
        $log.log('trigger load');
        gameData.onLoad = function () {
            init();
        };
    }
});