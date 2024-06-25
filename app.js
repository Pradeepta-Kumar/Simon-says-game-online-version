let gameseq = [];  //game flashing th buttons of its own
let userSeq = [];  //user flashing buttons according the game
let started = false;  
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

document.addEventListener("keypress", function () {
    //to start the game for the first time;   
     if(started == false) {
        console.log("Game Started!");
        started = true;

        levelUp();
    }
});

//game flash
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

//user flash on user input
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress)
}
//user input of pressing the button
function btnPress() {
    let btn = this;
    // console.log(btn);
    // console.log("Button was Pressed");
    userFlash(btn);

    //finding out the color of the button
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

//to check the game and user sequence
function checkAns(idx) {
    // console.log("current level is ", level);
    if(userSeq[idx] === gameseq[idx]) {
        //console.log("same value");
        if(userSeq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! your score is <b>${level}</b> <br> Press another key to start the game again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

//to reset the game and start it from the begining
function reset() {
    started = false;
    gameseq = [];
    userSeq = [];
    level = 0;
}