





var game = 
{
    word: 0,
    wins: 0,
    losses: 0,
    left: 7,
    guessed: ["7"],
    picture:"nedpic0.png",
    dictionary: ["WIGHT", "WARDEN","FACELESS","FLAYING","POISONS","VALYRIAN","SEVEN","DRAGONGLASS","DRAGONS","PYROMANCERS","PRIESTS","WEIRWOOD","MAESTER","HARPY","BASTARD","DIREWOLF","UNSULLIED","TARGARYEN","DOTHRAKI","EUNUCH","GRAYSCALE","HOUSES","KHALEESI","SELLSWORD","TURNCLOAK","WILDLINGS","LANNISTER","STARK","GREYJOY","BARATHEON"],
    theWord:"_",
    theBlankWord:"",
    theBlanks:document.getElementsByClassName("currentWord"),
    theWins:document.getElementsByClassName("winLoss"),
    theRemaining:document.getElementsByClassName("remainingGuesses"),
    // choose a new word
    chooseAWord: function() {
        this.word = Math.floor(Math.random() * this.dictionary.length);
        this.theWord = this.dictionary[this.word];
        this.theBlanks[0].innerHTML="_";//set up the right number of blank spaces
        for (var i = 0; i < this.theWord.length -1; i++) 
            {
                this.theBlankWord += "_";
                this.theBlanks[0].innerHTML += "_";
            }
        console.log(this.theBlanks[0].innerHTML);
    },

    checkALetter: function(myLetter) //the user typed a letter
    {
        var yesFlag = 0;
        var isLetter = /^[A-Za-z]+$/;  
        var newBlanks = "";
        if(myLetter.match(isLetter))  //is it a letter?
         {  
            for (var i = 0; i < this.theWord.length; i++) //check each letter in my word
            {
                console.log(this.theWord[i]);
                console.log(myLetter);
                if(this.theWord[i] == myLetter)//it's there so show it
                {
                    yesFlag = 1;
                    theBlankWord[i] = myLetter;
                }
                else//it's not there leave a blank
                {
                    theBlankWord[i] = "_";
                }
            }
            if(yesFlag == 0)//you guessed a wrong letter
            {
                this.left -= 1;
                if(this.left == 0)//you just lost!
                {
                    alert("you lost");
                }
                else
                {
                    alert("wrong choose again");
                }
            }
            else//you guessed correctly
            {
                alert("good job");
                this.theBlanks[0].innerHTML = newBlanks;
            }
        }
    }
};

document.addEventListener("onload", initGame());

function initGame()//initialize for a new game
{
    game.chooseAWord();
}

document.onkeyup = function(event)
{
    var letter = String.fromCharCode(event.keyCode).toUpperCase();
    game.checkALetter(letter);
}

        // word number?
        console.log("word " + game.word);
        // num of wins?
        console.log("wins " + game.wins);
        // num of losses?
        console.log("losses " + game.losses);
        // guesses left?
        console.log("guesses" + game.left);
        // guesses so far?
        console.log("guessed  " + game.guessed);
        // which picture?
        console.log("picture " + game.picture);
        // what's the word?
        console.log("the word: " + game.theWord);
        // show me the blanks
        console.log("blanks " + game.theBlanks);

// function fadeOutEffect() {
//     var fadeTarget = document.getElementById("box");
//     var fadeEffect = setInterval(function() {
//         if(!fadeTarget.style.opacity) {
//             fadeTarget.style.opacity = 1;
//         }
//         if(fadeTarget.style.opacity < 0.2) {
//             clearInterval(fadeEffect);
//         }else {
//             fadeTarget.style.opacity -= 0.1;
//         }
//     }, 200);
// }

// document.getElementById("button1").addEventListener("click", function(){
// 	document.getElementById("box").style.height = "200px";
//     document.getElementById("box").style.width = "200px";
// });

// document.getElementById("button2").addEventListener("click", function(){
// 	document.getElementById("box").style.backgroundColor = "blue";

// });

        
// document.getElementById("button3").addEventListener("click", fadeOutEffect);


// document.getElementById("button4").addEventListener("click", function(){
//     document.getElementById("box").style.left = (document.getElementById("box").offsetLeft - 100) + 'px';

// });

// document.getElementById("button5").addEventListener("click", function(){
//     document.getElementById("box").style.left = (document.getElementById("box").offsetLeft + 50) + 'px';

// });


// // ----------------- Game Rules -----------------
// var matrix, gameData;
// var gameMessage = document.getElementsByClassName('game-message')[0]
// var gameBoardSpaces = document.getElementsByClassName('game-board-space');

// function initGame() {

//     //clear the board
//     gameMessage.innerHTML = '';
//     for (var i = 0, l = gameBoardSpaces.length; i < l; i++) {
//         gameBoardSpaces[i].innerHTML = '';
//         gameBoardSpaces[i].classList.remove('selected-space');
//     }

//     //clear data
//     matrix = [
//         [null, null, null],
//         [null, null, null],
//         [null, null, null]
//     ];

//     //reset the meta data
//     gameData = {
//         nextMover: null,
//         currentMover: null,
//         gameMessage: null,
//         gameComplete: false
//     };
// }

// initGame();

// function autoMove(x, y) { // toggles between users
//     if (gameData.currentMover === null) { //if autoMoves first go, choose X
//         gameData.currentMover = 'X';
//         xMoves(x, y);
//         return;
//     }

//     switch (gameData.currentMover) { //last mover
//         case 'X':
//             oMoves(x, y);
//             break;
//         case 'O':
//             xMoves(x, y);
//             break;
//     }
// }

// function oMoves(x, y) { // wrappers for ease of use
//     gameData.currentMover = 'O';
//     makeMove(x, y, 'O');
//     return;
// }

// function xMoves(x, y) { // wrappers for ease of use
//     gameData.currentMover = 'X';
//     makeMove(x, y, 'X');
//     return;
// }

// function beforeMove() {
//     if (gameData.gameComplete === true) {
//         alert('Please reset the game');
//         throw ('reset board');
//     }
//     gameData.gameMessage = null;
// }

// function afterMove() {
//     checkForWinner();
//     if (gameData.gameMessage !== null) {
//         showGameMessage(gameData.gameMessage);
//         return;
//     }
// }

// function makeMove(x, y, val) {
//     beforeMove();

//     if (matrix[y - 1][x - 1] === null) { // make args 1 based for ease of use
//         matrix[y - 1][x - 1] = val;
//     } else {
//         gameData.gameMessage = 'this space is already taken';
//     }

//     afterMove();
//     return;
// }


// function checkForWinner() {

//     for (var i = 0, l = matrix.length; i < l; i++) {
//         // horizontal non-null match
//         if (matrix[i][0] !== null && matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
//             declareWinner(gameData.currentMover);
//             return;
//         }

//         // vertical non-null match
//         if (matrix[0][i] !== null && matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
//             declareWinner(gameData.currentMover);
//             return;
//         }

//         // downward diagnal non-null-match
//         if (matrix[0][0] !== null && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
//             declareWinner(gameData.currentMover);
//             return;
//         }

//         // upward diagnal non-null-match
//         if (matrix[2][0] !== null && matrix[2][0] === matrix[1][1] && matrix[1][1] === matrix[0][2]) {
//             declareWinner(gameData.currentMover);
//             return;
//         }
//     }
// }


// // ----------------- Game UI Interactions -----------------
// function declareWinner(player) {
//     gameData.gameComplete = true;
//     gameData.gameMessage = "";
//     gameData.gameMessage += player + ' wins! ';
//     gameData.gameMessage += "<span>New Game?</span>";
//     return;
// }

// function showGameMessage(msg) {
//     gameMessage.innerHTML = msg;
// }

// // ----------------- Handle Events -----------------
// for (var i = 0, l = gameBoardSpaces.length; i < l; i++) {
//     gameBoardSpaces[i].addEventListener('click', function (e) {
//         var coords = e.target.dataset['space'].split(',');
//         autoMove(coords[0], coords[1]);
//         e.target.innerHTML = gameData.currentMover;
//         e.target.classList.add('selected-space');
//     });
// }

// gameMessage.addEventListener('click', function () {
//     initGame();
// });






// document.getElementById("button6").addEventListener("click", function(){
			
//     document.getElementById("box").style.height = "150px";
//    	document.getElementById("box").style.width = "150px";
//     document.getElementById("box").style.backgroundColor = "orange";
//     document.getElementById("box").style.opacity = 1;
//     document.getElementById("box").style.left = "0px";

// });