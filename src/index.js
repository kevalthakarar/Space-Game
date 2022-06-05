const Alien = require('./Alien');
const Bullet = require('./Bullet');
const Ship = require('./Ship');
const Score = require('./Score');
const Lives = require('./Lives');

const scoreTitle = new Score();
const livesTitle = new Lives();
const ALIEN_ROWS = 5;
const ALIEN_COLS = 15;

const key = {
    "ArrowUp" : false,
    "ArrowDown" : false,
    [' '] : false
}

document.addEventListener('keydown' , (event) => {
    key[event.key] = true;
})

document.addEventListener('keyup' , (event) => {
    key[event.key] = false;
    //console.log(key);
})

const bullets = [];
const aliens = [];
const aliensGrid = [];

const removeAlien = (alien) => {
    aliens.splice(aliens.indexOf(alien) , 1);
    alien.remove();
    for(let row = 0; row < aliensGrid.length ; row++){
        for(let col = 0; col <aliensGrid[row].length; col++){
            if(alien == aliensGrid[row][col]){
                aliensGrid[row][col] = null;
            }
        }
    }
}

const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet) , 1);
    bullet.remove();
}

const isOverLapping = (entity1 , entity2) => {
    //debugger;
    const rect1 = entity1.el.getBoundingClientRect();
    const rect2 = entity2.el.getBoundingClientRect();
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
}

const overLappingBullet = (entity) => {

    for(let bullet of bullets){
        if(isOverLapping(entity , bullet)){
            return bullet;
        }
    }
    return null;
};

const ship = new Ship({removeLife : () => livesTitle.removeLife()  , overLappingBullet});
let score = 0;

const addScore = (amount) => {
    scoreTitle.addScore(amount);
}

for(let row = 0; row < ALIEN_ROWS; row++){
    const aliensCol = [];
    for(let col = 0; col < ALIEN_COLS; col++){
        const alien = new Alien({
            x : col * 60 + window.innerWidth*0.25,
            y : row * 60 + 50,
            overLappingBullet,
            removeAlien,
            removeBullet,
            addScore
        });

        aliens.push(alien);
        aliensCol.push(alien);
    }
    aliensGrid.push(aliensCol);
}
//console.log(aliensGrid);

const getBottomAliens = () =>{
    const bottomAliens = [];

    for(let col = 0; col < ALIEN_COLS ; col++){
        for(let row = ALIEN_ROWS-1; row >= 0; row--){
            if(aliensGrid[row][col]){
                bottomAliens.push(aliensGrid[row][col])
                break;
            }
        }
    }
    return bottomAliens;
};

const getRandomAlien = (alienList)=>{
    return alienList[parseInt(Math.random() * alienList.length)];
}

const aliensFireBullet = () => {
    const bottomAlien = getBottomAliens();
    const randomAlien = getRandomAlien(bottomAlien);
    createBullet({
        x : randomAlien.x,
        y : randomAlien.y,
        isAlien : true
    })
}

setInterval(aliensFireBullet , 3000);

const getLeftMostAlien = ()=>{
    return aliens.reduce((minimumAlien , currentAlien) => {
        return currentAlien.x < minimumAlien.x ? currentAlien : minimumAlien;
    });
};

const getRightMostAlien = () =>{
    return aliens.reduce((maximumAlien , currentAlien) => {
        return currentAlien.x > maximumAlien.x ? currentAlien : maximumAlien;
    });
};

const createBullet = ({x , y , isAlien = false}) => {
    bullets.push(new Bullet({
        x,
        y,
        isAlien
    }));
}

const update = () =>{
    if(key['ArrowDown'] == true && ship.x < window.innerWidth - ship.SHIP_IMAGE_WIDTH){
        ship.moveRight();
    }
    else if(key['ArrowUp'] == true && ship.x > 0){
        ship.moveLeft();
    }
    if(key[' ']){
        ship.fire({createBullet});
    }

    ship.update();

    bullets.forEach(bullet => {
        bullet.update();
        if(bullet.y < 0){
            bullet.remove();
            bullets.splice(bullets.indexOf(bullet) , 1);
        }
    })

    aliens.forEach(alien => {
        alien.update();
    })

    const leftMostAlien = getLeftMostAlien();
    if(leftMostAlien.x < 30){
            aliens.forEach(alien => {
                alien.setDirectionRight();
                alien.moveDown();
            })
    }
    const rightMostAlien = getRightMostAlien();
    if(rightMostAlien.x > window.innerWidth  - 50){
        aliens.forEach(alien => {
            alien.setDirectionLeft();
            alien.moveDown();
        })
    }
}

setInterval(update , 20);