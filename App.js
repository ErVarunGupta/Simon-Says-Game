let gameSeq = [];
let userSeq = [];

let highest = [];

let btns = ["yellow","red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
let start = document.querySelector('.start');

start.addEventListener("click", function(){
    if(started == false){
        started = true;
        levelUp();
    }
})

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx){
    // let idx = level-1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Click green key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        highest.push(level);
        // console.log(Math.max(...highest));
        h3.innerHTML = `<b>Highest Score is : ${Math.max(...highest)}</b>`
        reset();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}