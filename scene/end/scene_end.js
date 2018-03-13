// var SceneEnd = function (game) {
//     var s = {
//         game: game,
//     };

//     game.registerAction('r', function () {
//         var s = SceneTitle.new(game);
//         game.replaceScene(s);
//     });

//     s.draw = function () {

//         game.context.fillText('游戏结束，按‘r’返回首页~' , 100, 290);
//     };

//     s.update = function () {

//     };


//     return s;
// };
class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function () {
            var s = SceneTitle.new(game);
            game.replaceScene(s);
        });
    };
    draw() {
        this.game.context.font = '18px Arial';        
        this.game.context.fillStyle = '#000000';
        this.game.context.fillText('游戏结束，按‘r’返回首页~', 100, 150);
        this.game.context.fillText('您的得分为：' + window.score + '分', 120, 200);
        

    }
}
window.j = 2;


