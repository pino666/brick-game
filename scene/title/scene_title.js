// var SceneTitle = function (game) {
//     var s = {
//         game: game,
//     };

//     game.registerAction('k', function () {
//         var s = Scene(game);
//         game.replaceScene(s);
//     });

//     s.draw = function () {
    
//         game.context.fillText('按‘k’游戏开始' , 100, 100);
//     };

//     s.update = function () {
       
//     };


//     return s;
// };
class SceneTitle extends GuaScene{
    constructor(game){
        super(game)
        game.registerAction('k',function(){
            var s = Scene(game);
            game.replaceScene(s);
        })
    };
    draw(){
        this.game.context.font = '18px Arial';
        this.game.context.fillStyle = '#000000';        
        this.game.context.fillText('按‘k’进入游戏', 130, 100);
        this.game.context.fillText('按‘s’游戏开始，按‘a’向左移动，按‘d’向右移动', 20, 170);
        
    }
}