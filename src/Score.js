const Entity = require("./Entity");


module.exports = class Score extends Entity{
    constructor(){
        super({tag:"div"});
        this.score = 0;
        this.setX(window.innerWidth / 2);
        this.setY(20);
        this.el.innerText = `Score : ${this.score}`;
    }

    addScore(amount){
        this.score += amount;
        this.el.innerText = `Score : ${this.score}`;
    }
}