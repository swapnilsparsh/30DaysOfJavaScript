
const roadArea = document.querySelector('.road');
let player = { step: 5 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(event) {
    keys[event.key] = true;
}
function keyUp(event) {
    keys[event.key] = false;
}


function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(item => {
        if (item.y >= 630) {
            item.y = item.y - 750;
        }
        item.y = item.y + player.step;
        item.style.top = item.y + 'px';
    });
}

function moveEnemies(playercar) {
    let vehicles = document.querySelectorAll('.enemies');
    let playercarb = playercar.getBoundingClientRect();


    vehicles.forEach(item => {
        othercarb = item.getBoundingClientRect();
        if (! ((playercarb.bottom < othercarb.top) || (playercarb.top > othercarb.bottom) || (playercarb.left > othercarb.right) || (playercarb.right < othercarb.left)) )
        {
            alert("Game over , Refresh to play again");
            player.start = false;
        }
        if (item.y >= 630) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.y = item.y + player.step;
        item.style.top = item.y + 'px';
    })
}


function playArea() {


    let playercar = document.querySelector('.car');
    let road = roadArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemies(playercar);
        if (keys.ArrowUp && player.y > (road.top + 80)) {
            //we're seeing if the up arrow is pressed then player should not exceed the road top 
            player.y = player.y - player.step;
        }

        if (keys.ArrowDown && player.y < (road.bottom - 150)) {
            player.y = player.y + player.step;
        }

        if (keys.ArrowLeft && player.x > 0) {
            player.x = player.x - player.step;
        }

        if (keys.ArrowRight && player.x < (road.width - 64)) {
            player.x = player.x + player.step;
        }

        //based on left and right we assign position to our car i.e player

        playercar.style.top = player.y + 'px';
        playercar.style.left = player.x + 'px';
        window.requestAnimationFrame(playArea);
    }
}

function init() {

    player.start = true;
    window.requestAnimationFrame(playArea);



    //similarly we're creating lines for the road
    for (let i = 0; i < 5; i++) {
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'lines');
        // as height of single line is 100 px and we want to add gap of 50 px
        roadlines.y = i * 150;

        // and then adding that height to the top 
        roadlines.style.top = roadlines.y + 'px';
        roadArea.appendChild(roadlines);

    }

    // we're creating player car dynamically and then adding it to our road area
    let playercar = document.createElement('div');
    playercar.setAttribute('class', 'car');
    roadArea.appendChild(playercar);

    //we're setting our player's dimensinos same as our car's so we're using playercar dimensions 
    player.x = playercar.offsetLeft;
    player.y = playercar.offsetTop;


    //creating enemies 

    for (x = 0; x < 4; x++) {
        let enemies = document.createElement('div');
        enemies.setAttribute('class', 'enemies');
        enemies.y = ((x + 1) * 350) * -1;
        enemies.style.top = enemies.y + 'px';

        //width of road is 400 , 50 is of car 
        enemies.style.left = Math.floor(Math.random() * 350) + 'px';
        roadArea.appendChild(enemies);
    }
}

init();