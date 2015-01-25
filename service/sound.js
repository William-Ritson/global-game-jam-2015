angular.module('vngame').factory('sound', function ($log) {

    var sound = {},
        buzz = window.buzz,
        sounds = {
            theme: new buzz.sound("sounds/theme", {
                formats: ["mp3"]
            })
        };
    
    sound.current = {};

    var saved = {
        name: '',
        pos: 0
    };
    
    sound.play = function (name) {
        sound.current = sounds[name];
        sound.current.play().loop();
    };

    sound.stop = function () {
        $log.log('stop');
        sound.current.stop();
    };

    sound.playSfx = function () {
        $log.log('playSfx');

    };

    return sound;
});