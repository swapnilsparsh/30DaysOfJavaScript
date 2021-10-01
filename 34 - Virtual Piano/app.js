const keys = document.querySelector('#keys');
const volPlus = document.querySelector('.fa-plus')
const volMinus = document.querySelector('.fa-minus');
const volume = document.querySelector('#volume')

volPlus.addEventListener('click', () => {
    if (volume.textContent != 2) {
        volume.textContent = parseInt(volume.textContent) + 1;
    }

})
volMinus.addEventListener('click', () => {
    if (volume.textContent != 0) {
        volume.textContent = parseInt(volume.textContent) - 1;
    }

})
const notBlack = [4, 7, 11, 14];
var j = 1;

for (let i = 0; i < 14; i++) {
    let whitekey = document.createElement('div');
    whitekey.classList.add('whiteKeys', 'key');
    whitekey.classList.add(`key${j}`)
    whitekey.style.left = (i * 7) + '%';
    keys.appendChild(whitekey);
    j += 1
}
for (let i = 1; i < 14; i++) {
    if (!notBlack.includes(i)) {
        let blackKey = document.createElement('div');
        blackKey.classList.add('blackKeys', 'key');
        blackKey.classList.add(`key${j}`)
        blackKey.style.left = (i * (7) - 1.75) + '%'
        keys.appendChild(blackKey);
        j += 1;
    }
}



var key = Array.from(document.querySelectorAll('.key'))

key.forEach(k => {
    k.addEventListener('click', () => {

        let keySound = new sound(`sounds/${k.classList[2]}.mp3`, parseInt(volume.textContent))
        keySound.play();
    })
})
var keyPressed = {};
const keyPress = (event) => {
    let keyCode = event.keyCode;
    let keyDown = (event.type == 'keydown');

    keyPressed[keyCode] = keyDown;

    if (keyPressed[37]) {
        const eventVal = {
            '65': 'key1',
            '83': 'key2',
            '68': 'key3',
            '70': 'key4',
            '71': 'key5',
            '72': 'key6',
            '74': 'key7'
        }
        Object.keys(eventVal).forEach(key => {

            if (keyPressed[key]) {
                document.querySelector(`.${eventVal[key]}`).style.background = 'linear-gradient(to bottom, rgb(248, 248, 248), rgb(238, 238, 238), grey)';
                document.querySelector(`.${eventVal[key]}`).style.boxShadow = ' 2px -2px black inset, -4px -2px black inset';
                setTimeout(() => {
                    document.querySelector(`.${eventVal[key]}`).style.background = 'white';
                    document.querySelector(`.${eventVal[key]}`).style.boxShadow = ' none';
                }, 250)
                let keySound = new sound(`sounds/${eventVal[key]}.mp3`, parseInt(volume.textContent))
                keySound.play();
            }

        })

    }
    if (keyPressed[39]) {
        const eventVal = {
            '65': 'key8',
            '83': 'key9',
            '68': 'key10',
            '70': 'key11',
            '71': 'key12',
            '72': 'key13',
            '74': 'key14'
        }
        Object.keys(eventVal).forEach(key => {

            if (keyPressed[key]) {
                document.querySelector(`.${eventVal[key]}`).style.background = 'linear-gradient(to bottom, rgb(248, 248, 248), rgb(238, 238, 238), grey)';
                document.querySelector(`.${eventVal[key]}`).style.boxShadow = ' 2px -2px black inset, -4px -2px black inset';
                setTimeout(() => {
                    document.querySelector(`.${eventVal[key]}`).style.background = 'white';
                    document.querySelector(`.${eventVal[key]}`).style.boxShadow = ' none';
                }, 250)
                let keySound = new sound(`sounds/${eventVal[key]}.mp3`, parseInt(volume.textContent))
                keySound.play();
            }

        })

    }

    const eventVal = {
        '81': 'key15',
        '87': 'key16',
        '69': 'key17',
        '82': 'key18',
        '84': 'key19',
        '89': 'key20',
        '85': 'key21',
        '73': 'key22',
        '79': 'key23',
        '80': 'key24'
    }
    Object.keys(eventVal).forEach(key => {

        if (keyPressed[key]) {
            document.querySelector(`.${eventVal[key]}`).style.background = 'black';
            setTimeout(() => { document.querySelector(`.${eventVal[key]}`).style.background = 'rgb(71, 71, 71)'; }, 250)
            let keySound = new sound(`sounds/${eventVal[key]}.mp3`, parseInt(volume.textContent))
            keySound.play();
        }

    })




}
window.addEventListener('keydown', keyPress)

window.addEventListener('keyup', (event) => {

    keyPressed[event.keyCode] = false;
})

function sound(src, vol) {
    this.sound = document.createElement('audio')
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.volume = vol * 0.5;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
}