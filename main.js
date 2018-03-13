var loadLevel = function (game, n) {
    n = n - 1;
    var level = levels[n];
    var blocks = [];
    for (var i = 0; i < level.length; i++) {
        var p = level[i];
        var b = Block(game, p);
        blocks.push(b);
    }
    return blocks;
};

window.blocks = [];
//为了debug增加的游戏关卡代码
var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    };
    // log('1212121')
    window.paused = false;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (k == 'p') {
            window.paused = !window.paused;
        } else if ('1234567'.includes(k)) {
            window.blocks = loadLevel(game, Number(k));
        };
        // if (event.key == '1') {
        //     blocks = loadLevel(1);
        // } else if (event.key == '2') {
        //     blocks = loadLevel(2);
        // } else if (event.key == '3') {
        //     blocks = loadLevel(3);
        // }
    });
    //控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target;
        window.fps = Number(input.value);
    })
};

var _main = function () {

    var images = {
        ball: 'img/3.jpg',
        block: 'img/4.PNG',
        paddle: 'img/2.jpg',
    };


    var game = GuaGame.instance(60, images,function(g){
        var s = SceneTitle.new(g);
        // var s = Scene(g);
        g.runWithSence(s);
    });
    enableDebugMode(game, true);
}
_main();