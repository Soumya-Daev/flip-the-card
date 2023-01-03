const cards = document.querySelectorAll(".myCard"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let audioBGM = new Audio("/static/src/game_BGM.mp3");
    audioBGM.play();

setInterval(() => {
    if (timeLeft == 60) {
        if(audioBGM.ended){
            audioBGM = new Audio("/static/src/game_BGM.mp3");
            audioBGM.play();
        }
    }
}, 2000);

let maxTime = 45;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        audioBGM.pause();
        audioBGM = new Audio("/static/src/gameOver.wav");
        audioBGM.play();
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-myView img").src,
        cardTwoImg = cardTwo.querySelector(".back-myView img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8 && timeLeft > 0) {
            audioBGM.pause();
            audioBGM = new Audio("/static/src/win.wav");
            audioBGM.play();
            cardOne.querySelector(".back-myView").style.backgroundColor = "#DAF9A8";
            cardTwo.querySelector(".back-myView").style.backgroundColor = "#DAF9A8";
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardOne.querySelector(".back-myView").style.backgroundColor = "#DAF9A8";
        cardTwo.removeEventListener("click", flipCard);
        cardTwo.querySelector(".back-myView").style.backgroundColor = "#DAF9A8";
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    audioBGM.pause();
    audioBGM = new Audio("/static/src/game_BGM.mp3");
    audioBGM.play();

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        card.querySelector(".back-myView").style.backgroundColor = "#fff";
        let imgTag = card.querySelector(".back-myView img");
        setTimeout(() => {
            imgTag.src = `/static/src/gem${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});