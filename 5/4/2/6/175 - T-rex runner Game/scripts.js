const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus")
const txt = document.getElementById("txt")
const butt = document.getElementById("btn")
function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300)
    }
}

let isAlive = setInterval(() => {
    //get current dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    //get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    //  detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        // console.log("collision");
        cactus.style.animation = "none"
        txt.style.display = "block"
        btn.style.display = "block"




        btn.addEventListener('click', function butt() {
            var text;
            var str = document.getElementById("txt").value;
            // SPEED REMAINS SAME
            if (str == "7") {
                text = "Right Answer";
                dis.style.color = "blue"
                txt.style.display = "none"
                btn.style.display = "none"
                cactus.style.animation = " block 2s linear infinite";


                // SPEED DOUBLES
            } else {
                text = "Wrong Answer";
                cactus.style.animation = " block 1s linear infinite";
                dis.style.color = "red"
                txt.style.display = "none"
                btn.style.display = "none"
            }
            document.getElementById("dis").innerHTML = text;
        })

    }


}, 10);


document.addEventListener("keydown", (event) => {
    jump();
})