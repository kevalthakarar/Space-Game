const Entity = require("./Entity");


module.exports = class Lives extends Entity{
    constructor(){
        super({tag:"div"});
        this.lives = 3;
        this.setX(window.innerWidth / 2);
        this.setY(window.innerHeight - 20);
        this.refreshText();
    }

    removeLife(){
        this.lives--;
        this.refreshText();
    }

    refreshText(){
        this.el.innerText = new Array(this.lives).fill('♡').join(' ');
    }
}