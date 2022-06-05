const shipImage = require('../images/ship.png');
const Entity = require('./Entity');

module.exports = class Ship extends Entity{
    constructor({ removeLife , overLappingBullet}){
        super({tag : "img"});
        this.el.src = shipImage;
        this.setX((window.innerWidth)/ 2);
        this.setY(window.innerHeight - 80);
        this.canFire = true;
        this.SPEED = 4;
        this.SHIP_IMAGE_WIDTH = 50;
        this.removeLife = removeLife;
        this.overLappingBullet = overLappingBullet;
        document.body.appendChild(this.el);
    }

    moveRight() {
        this.setX(this.x + this.SPEED);
    }

    moveLeft() {
        this.setX(this.x - this.SPEED);
    }

    fire({createBullet}) {
        if(this.canFire){
            this.canFire = false;
            createBullet({
                x:this.x + this.SHIP_IMAGE_WIDTH/2,
                y:this.y
            })
            setTimeout(() => {this.canFire = true;}, 100)
        }
    }

    update() {
        //debugger;
        const bullet = this.overLappingBullet(this);
        if(bullet && bullet.isAlien){
            // this.removeAlien(this);
            // this.removeBullet(bullet);
            // this.addScore(20);
            this.removeLife(); 
            this.setX((window.innerWidth)/ 2);
            this.setY(window.innerHeight - 80);          
        }
    }
}