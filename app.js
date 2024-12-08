let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "blue", "green"];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;
// const buttom=document.querySelector(".btn");
const audio = new Audio('button-sound.mp3');
const wrong = new Audio('wrong-sound.mp3');


document.addEventListener("keypress", init);
document.addEventListener("click", init);

function init() {
   if (started == false) {
      console.log("game started");
      started = true;
      // audio.play();
      levelup();
   }
};

function btnFlash(btn) {
   btn.classList.add("flash");
   setTimeout(function () {
      btn.classList.remove("flash");
   }, 300);
}
function clickFlash(btn) {
   audio.play();
   btn.classList.add("playFlash");
   setTimeout(function () {
      btn.classList.remove("playFlash");
   }, 300);
}
function levelup() {
   userseq = [];
   level++;
   h2.innerText = `Level ${level}`;
   let ranIdx = Math.floor(Math.random() * 3);
   let ranColor = btns[ranIdx];
   let ranBtn = document.querySelector(`.${ranColor}`);
   gameseq.push(ranColor);
   console.log(gameseq);

   // console.log(ranIdx);
   // console.log(ranColor);
   // console.log(ranBtn);

   btnFlash(ranBtn);
}

function checkAns(idx) {
   //  console.log("curr level: ",level);
   // let idx = level - 1;

   if (userseq[idx] === gameseq[idx]) {
      // console.log("same value"); 
      if (userseq.length == gameseq.length) {
         setTimeout(levelup, 1000);
      }
   } else {
        wrong.play();
      h2.innerHTML = `Game Over!  your score =${level} <br> Press any key to start again`;
      let body = document.querySelector("body");
      body.classList.add("alert");
      setTimeout(function () {
         body.classList.remove("alert");
      }, 1000);
      reset();
   }
}

function btnPress() {
   // console.log(this);
   let btn = this;
   clickFlash(btn);
   userColor = btn.getAttribute("id");
   userseq.push(userColor);
   // console.log(userseq);
   checkAns(userseq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
   btn.addEventListener("click", btnPress);
   
}
function reset() {
   // started=false;
   setTimeout(() => started = false);
   gameseq = [];
   userseq = [];
   level = 0;
}