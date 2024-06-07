//Variable Bank
let move_speed = 3; // Change moving speed of bird
let gravity = 0.5; // Change gravity
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds/point.mp3');
let sound_die = new Audio('sounds/die.mp3');

// Error handling for audio loading
sound_point.addEventListener('error', (e) => {
    console.error('Error loading point sound:', e);
});
sound_die.addEventListener('error', (e) => {
    console.error('Error loading die sound:', e);
});

// Getting bird element properties
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

// Start Screen
let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

function fly() {
    img.src = 'assets/Bird-2.png';
    bird_dy = -7.6;
}

function resetImage() {
    img.src = 'assets/Bird.png';
}

function flyHandler(e) {
    if (game_state === 'Play') {
        fly();
    }
}

function resetHandler(e) {
    if (game_state === 'Play') {
        resetImage();
    }
}

function startGame() {
    if (game_state !== 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
        create_pipe();
    }
}

document.addEventListener('keydown', (e) => {
    if (game_state === 'Start' || game_state === 'End') {
        startGame();
    }
});
document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        if (game_state === 'Start' || game_state === 'End') {
            startGame();
        }
    }
});

function play() {
    bird_dy = 0;
    bird_props = bird.getBoundingClientRect();

    function move() {
        if (game_state !== 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (
                    bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top
                ) {
                    endGame();
                    return;
                } else {
                    if (
                        pipe_sprite_props.right < bird_props.left &&
                        pipe_sprite_props.right + move_speed >= bird_props.left &&
                        element.increase_score === '1'
                    ) {
                        score_val.innerHTML = parseInt(score_val.innerHTML) + 1;
                        sound_point.play().catch((e) => {
                            console.error('Error playing point sound:', e);
                        });
                        element.increase_score = '0';
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    function apply_gravity() {
        if (game_state !== 'Play') return;
        bird_dy += gravity;

        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            endGame();
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 35; // Change gap between pipes
    let initial_pipe_delay = 0; // Change delay before the first pipe appears

    function create_pipe() {
        if (game_state !== 'Play') return;

        if (initial_pipe_delay > 0) {
            initial_pipe_delay--;
            requestAnimationFrame(create_pipe);
            return;
        }

        if (pipe_separation > 80) {
            pipe_separation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}

function endGame() {
    game_state = 'End';
    message.innerHTML = 'Game Over'.fontcolor('red') + '<br> Press Any Key to Restart';
    message.classList.add('messageStyle');
    img.style.display = 'none';
    sound_die.play();
    resetGame();
}

function resetGame() {
    document.querySelectorAll('.pipe_sprite').forEach((e) => e.remove());
    bird.style.top = '40vh';
    bird_dy = 0;
    score_val.innerHTML = '0';
    img.style.display = 'none';
    game_state = 'Start';

    document.addEventListener('keydown', flyHandler);
    document.addEventListener('keyup', resetHandler);
    document.addEventListener('mousedown', flyHandler);
    document.addEventListener('mouseup', resetHandler);
}

document.addEventListener('keydown', flyHandler);
document.addEventListener('keyup', resetHandler);
document.addEventListener('mousedown', flyHandler);
document.addEventListener('mouseup', resetHandler);

document.addEventListener('keydown', (e) => {
    if (game_state === 'End') {
        startGame();
    }
});
document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && game_state === 'End') {
        startGame();
    }
});
