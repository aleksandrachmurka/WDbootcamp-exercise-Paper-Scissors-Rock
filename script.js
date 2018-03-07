// start
var headerElem = document.getElementById("js-headerElement");
var newGameElem = document.getElementById("js-newGameElement");
var pickElem = document.getElementById("js-playerPickElement");
var resultsElem = document.getElementById("js-resultsTableElement");
var modal = $("#modal");
var modalMessage = document.getElementById("modalMessage");

var gameState = "notStarted";

var player = {
    name: "",
    score: 0
};

var computer = {
    score: 0
};


function setGameElements() {
    switch(gameState) {
        case "started":
        headerElem.style.display = "none";
        newGameElem.style.display = "none";
        pickElem.style.display = "block";
        resultsElem.style.display = "block";
        break;
        case "ended":
        headerElem.style.display = "block";
        newGameBtn.textContent = "Play again";
        case "notStarted":
        default:
        newGameElem.style.display = "block";
        headerElem.style.diplay = "block";
        pickElem.style.display = "none";
        resultsElem.style.display = "none";
  }
}

setGameElements();

//new game

var newGameBtn = document.getElementById("js-newGameButton");

newGameBtn.addEventListener("click", newGame);

var playerPointsElem = document.getElementById("js-playerPoints");
var playerNameElem = document.getElementById("js-playerName");
var computerPointsElem = document.getElementById("js-computerPoints");

function newGame() {
    player.name = prompt("Please enter your name", "imię gracza");
    if (player.name) {
        player.score = computer.score = 0;
        gameState = "started";
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
  }
}

// pick rock paper or scissors

var pickRock = document.getElementById("js-playerPick_rock");
var pickPaper = document.getElementById("js-playerPick_paper");
var pickScissors = document.getElementById("js-playerPick_scissors");

pickRock.addEventListener("click", function() { playerPick("rock") });
pickPaper.addEventListener("click", function() { playerPick("paper") });
pickScissors.addEventListener("click", function() { playerPick("scissors") });

var playerPickElem = document.getElementById("js-playerPick");
var computerPickElem = document.getElementById("js-computerPick");
var playerResultElem = document.getElementById("js-playerResult");
var computerResultElem = document.getElementById("js-computerResult");


function getComputerPick() {
    var possiblePicks = ["rock", "paper", "scissors"];
    return possiblePicks[Math.floor(Math.random()*3)];
}


function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// check who is the winner in round, add and display points

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = "";

    var winnerIs = "player";

    if (playerPick == computerPick) {
        winnerIs = "noone - draw!";
    } else if (
        (computerPick == "rock" &&  playerPick == "scissors") ||
        (computerPick == "scissors" &&  playerPick == "paper") ||
        (computerPick == "paper" &&  playerPick == "rock")) {

        winnerIs = "computer";
    }

    if (winnerIs == "player") {
        playerResultElem.textContent = "Win!";
        player.score++;
        setGamePoints();
    } else if (winnerIs == "computer") {
        computerResultElem.textContent = "Win!";
        computer.score++;
        setGamePoints();
    }
    checkGoal();

}


function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}


// check who is the winner, end game

function checkGoal() {
    if (player.score == 10) {
        // playerResultElem.textContent +=  " And the winner is " + player.name;
        modal.modal("show");
        modalMessage.textContent += player.name;
        gameState = "ended";
        delayedEnd = setTimeout(setGameElements, 3000);
    }
    else if (computer.score == 10) {
        // computerResultElem.innerHTML += " Computer won this time!";
        modal.modal("show");
        modalMessage.textContent += "Computer";
        gameState = "ended";
        delayedEnd = setTimeout(setGameElements, 3000);
    }
}
