var Ball = function (game) {
    // var image = imageFromPath('3.jpg');
    var o = game.imageByName('ball');
    
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 200,
    //     speedX: 10,
    //     speedY: 10,
    //     fired: false,
    // };
    o.x = 100;
    o.y = 200;
    o.speedX = 5;
    o.speedY = 5;
    o.fired = false;
    o.fire = function () {
        o.fired = true;
    };
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 380) {
                o.speedX = -o.speedX;
            };
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY;
            }
            o.x += o.speedX;
            o.y += o.speedY;
        };

    };
    o.fantan = function () {
        o.speedY *= -1;    //反弹
    };

    o.hasPoint = function(x,y){
        var xIn = x >= o.x && x <= o.x + o.w;
        var yIn = y >= o.y && y <= o.y + o.h;
        return xIn && yIn;
    };

    return o;
};