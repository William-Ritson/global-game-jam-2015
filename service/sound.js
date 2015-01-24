angular.module('vngame').factory('sound', function (ngAudio, $log) {

    var sounds = {
        theme: 'sounds/theme.mp3'
    };


    var sound = {};
    sound.current = {};

    var saved = {
        name: '',
        pos: 0
    };
    sound.play = function (name) {
        $log.log('play', name);
        sound.current = ngAudio.load(sounds[name]);
        sound.current.play();
        sound.current.looping = true;
        if (saved.name === name) {
            sound.current.position = saved.pos;
        }
        saved.name = name;
    };

    sound.savePos = function () {
        saved.pos = sound.current.position;
    };

    sound.stop = function () {
        $log.log('stop');
        sound.current.stop();
    };

    sound.playSfx = function () {
        $log.log('playSfx');

        sounds[name].looping = false;
        sounds[name].play();
    };

    return sound;
});