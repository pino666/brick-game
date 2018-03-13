var Scene = function (game) {
    var s = {
        game: game,
    };

    //初始化
    var paddle = Paddle(game);
    var ball = Ball(game);

    window.score = 0;

    window.blocks = loadLevel(game, 1);

    game.registerAction('a', function () {
        paddle.moveLeft();
    });
    game.registerAction('d', function () {
        paddle.moveRight();
    });
    game.registerAction('s', function () {
        ball.fire();
    });

    s.draw = function () {
        //游戏背景
        game.context.fillStyle = "#ffffff";
        game.context.fillRect(0, 0, 400, 300);
        //draw
        game.drawImage(paddle);
        game.drawImage(ball);
        //draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = window.blocks[i];
            if (block.alive) {
                game.drawImage(block);
            };
        };
        game.context.font = "12px Arial";
        game.context.fillStyle = '#000000';
        game.context.fillText('分数：' + window.score, 10, 290);
    };

    s.update = function () {
        if (window.paused) {
            return;
        };
        ball.move();
        //判断游戏结束
        if (ball.y > paddle.y) {
            //跳转到游戏结束的场景
            var end = SceneEnd.new(game);
            game.replaceScene(end);
        };
        //判断该两个矩形相撞
        if (paddle.collide(ball)) {
            ball.fantan();
        };
        //判断ball与block
        for (var i = 0; i < window.blocks.length; i++) {
            var block = window.blocks[i];
            if (block.collide(ball)) {
                block.kill();
                ball.fantan();   //相撞
                window.score += 100;             
                if (window.score % 200 == 0) {
                    window.blocks = loadLevel(game, window.j);
                    window.j += 1;
                    log(window.j);
                    if(window.j > 6){
                        window.j = 2;
                    };
                };
            };
        };

    };

    //mouse event
    var enableDrag = false;
    game.canvas.addEventListener('mousedown', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        log(x, y, event);
        //检查是否点中了ball
        if (ball.hasPoint(x, y)) {
            //设置拖拽状态
            enableDrag = true;
        };
    });
    game.canvas.addEventListener('mousemove', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (enableDrag) {
            log(x, y, 'drag');
            ball.x = x;
            ball.y = y;
        }
    });
    game.canvas.addEventListener('mouseup', function (event) {
        var x = event.offsetX;
        var y = event.offsetY;
        log(x, y, 'up');
        enableDrag = false;
    });


    return s;
};