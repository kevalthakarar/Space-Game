const Entity = require("./Entity");

module.exports = class Bullet extends Entity{
    constructor({x , y , isAlien}){
        super({className : 'bullet'});
        document.body.appendChild(this.el);
        this.setX(x);
        this.setY(y);
        this.SPEED = 5;
        this.isAlien = isAlien;
        if(isAlien == true)
            this.SPEED = -5;
    }

    update() {
        this.setY(this.y - this.SPEED)
    }

}