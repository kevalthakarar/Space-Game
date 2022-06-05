const Entity = require("./Entity");
const alienImage = require('../images/alien.png');

const LEFT = 'left';
const RIGHT = 'right';

module.exports = class Alien extends Entity{
    constructor({x , y , overLappingBullet , removeAlien , removeBullet , addScore}){
        super({tag:'img'});
        this.el.src = alienImage;
        document.body.appendChild(this.el);
        this.setX(x);
        this.setY(y);
        this.SPEED = 1;
        this.overLappingBullet = overLappingBullet;
        this.removeAlien = removeAlien;
        this.removeBullet = removeBullet;
        this.addScore = addScore;
        this.DOWN_SPEED = 1;
        this.direction = LEFT;
    }

    setDirectionLeft(){
        this.direction = LEFT;
    }

    setDirectionRight(){
        this.direction = RIGHT;
    }

    moveDown() {
        this.setY(this.y + this.DOWN_SPEED);
    }

    update(){
        if(this.direction == LEFT){
            this.setX(this.x - this.SPEED);
        }else{
            this.setX(this.x + this.SPEED);
        }
        const bullet = this.overLappingBullet(this);
        if(bullet && !bullet.isAlien){
            this.removeAlien(this);
            this.removeBullet(bullet);
            this.addScore(20);
        }


    }
}