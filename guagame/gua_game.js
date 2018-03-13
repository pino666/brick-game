class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = 50;
        this.images = images;
        this.runCallback = runCallback;
        //
        this.scene = null;
        this.actions = {};
        this.keydowns = {};
        this.canvas = document.querySelector('#id-canvas');
        this.context = this.canvas.getContext('2d');
        //events
        var self = this;
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true;
        });
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false;
        });
        this.init()
    }
    static instance(...args){
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y);

    }

    update ()  {
        this.scene.update();
    };
    draw  (){
        this.scene.draw();
    };

    registerAction (key, callback) {
        this.actions[key] = callback;
    };
    runloop ()  {
        var g = this;
        var actions = Object.keys(g.actions);
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i];
            if (g.keydowns[key]) {
                //如果按键被按下，调用注册的action
                g.actions[key]();
            };
        };
        g.update();

        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);

        g.draw();

        setTimeout(function () {
            g.runloop();
        }, 1000 / window.fps);
    }
    imageByName(name) {
        var g = this;
        var img = g.images[name];
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image;
    }
    runWithSence (scene)  {
        var g = this;
        g.scene = scene;
        //开始运行程序
        setTimeout(function () {
            g.runloop();
        }, 1000 / window.fps);
    };
    replaceScene (scene) {
        var g = this;
        g.scene = scene;
    };

    __start (scene) {
        this.runCallback(this);
    };

    init () {
        var g = this
        var loads = [];
        //预先载入所有图片
        var names = Object.keys(g.images);
        for (var i = 0; i < names.length; i++) {
            let name = names[i];
            var path = g.images[name];
            let img = new Image();
            img.src = path;
            img.onload = function () {
                //存入g.image 中
                g.images[name] = img;
                //所有图片都载入成功后，调用run
                loads.push(1);
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start();
                }
            };
        };
    }
}




// var GuaGame = function (fps, images, runCallback) {
//     //loads是一个对象,里面是图片的引用名字和路径
//     //程序会在所有图片载入完成后运行                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     };
//     var canvas = document.querySelector('#id-canvas');
//     var context = canvas.getContext("2d");
//     g.canvas = canvas;
//     g.context = context;

//     g.drawImage = function (guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y);
//     };

//     window.addEventListener('keydown', function (event) {
//         g.keydowns[event.key] = true;
//     });
//     window.addEventListener('keyup', function (event) {
//         g.keydowns[event.key] = false;
//     });

//     g.update = function () {
//         g.scene.update();
//     };
//     g.draw = function () {
//         g.scene.draw();
//     };

//     g.registerAction = function (key, callback) {
//         g.actions[key] = callback;
//     };

//     //timer
//     window.fps = 30;
//     var runloop = function () {
//         var actions = Object.keys(g.actions);
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i];
//             if (g.keydowns[key]) {
//                 //如果按键被按下，调用注册的action
//                 g.actions[key]();
//             };
//         };
//         g.update();

//         context.clearRect(0, 0, canvas.width, canvas.height);

//         g.draw();

//         setTimeout(function () {
//             runloop();
//         }, 1000 / window.fps);
//     };

//     var loads = [];
//     //预先载入所有图片
//     var names = Object.keys(images);
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i];
//         var path = images[name];
//         let img = new Image();
//         img.src = path;
//         img.onload = function () {
//             //存入g.image 中
//             g.images[name] = img;
//             //所有图片都载入成功后，调用run
//             loads.push(1);
//             log('load images', loads.length, names.length)
//             if (loads.length == names.length) {
//                 log('load images', g.images)
//                 g.__start();
//             }
//         };
//     };
//     g.imageByName = function (name) {
//         var img = g.images[name];
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image;
//     }
//     g.runWithSence = function (scene) {
//         g.scene = scene;
//         //开始运行程序
//         setTimeout(function () {
//             runloop();
//         }, 1000 / fps);
//     };
//     g.replaceScene = function (scene) {
//         g.scene = scene;
//     };

//     g.__start = function (scene) {
//         runCallback(g);
//     };


//     return g;
// };