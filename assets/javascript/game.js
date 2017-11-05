var game = 
{
    word: 0,
    wins: 0,
    losses: 0,
    left: 7,
    guessed: ["7"],
    picture:document.getElementsByClassName("nedPic"),
    dictionary: ["WIGHT", "WARDEN","FACELESS","RAVENS","FLAYING","POISONS","VALYRIAN","SEVEN","DRAGONGLASS","DRAGONS","PYROMANCERS","PRIESTS","WEIRWOOD","MAESTER","HARPY","BASTARD","DIREWOLF","UNSULLIED","TARGARYEN","DOTHRAKI","EUNUCH","GRAYSCALE","HOUSES","KHALEESI","SELLSWORD","TURNCLOAK","WILDLINGS","LANNISTER","STARK","GREYJOY","BARATHEON"],
    theWord:"_",
    theBlankWord:"",
    theTurn:0,
    theBlanks:document.getElementsByClassName("currentWord"),
    theWins:document.getElementsByClassName("winLoss"),
    theRemaining:document.getElementsByClassName("remainingGuesses"),
    thePrompting:document.getElementsByClassName("winLoseText"),
    theGuessed:document.getElementsByClassName("alreadyGuessed"),
    initializeTheGame: function()
    {
        this.thePrompting[0].innerHTML = "Save Ned Stark!";
        this.picture[0].src = "assets/images/nedpic1.png";
        this.theRemaining[0].innerHTML = "You have 7 remaining guesses!";
        this.theWins[0].innerHTML = "Wins: " + game.wins + " Losses: " + game.losses;
        game.theTurn = 0;
        game.left = 7;
        game.guessed = ["7"];
        this.theGuessed[0].innerHTML = "*****";
        game.chooseAWord();
    },
    //you won the game
    youWin: function()
    {
        this.thePrompting[0].innerHTML = "Whew! You Saved Ned!";
        this.picture[0].src = "assets/images/nedpic13.jpg";
        var audio = new Audio('assets/sounds/soundfile2.mp3');
        audio.play();
        setTimeout(function()
        { 
            game.wins += 1;
            game.initializeTheGame(); 
        }, 5000);
    },
    //you lose the game
    youLose: function()
    {
        this.thePrompting[0].innerHTML = "Oh no! Poor Ned!";
        this.picture[0].src = "assets/images/nedpic.gif";
        var audio = new Audio('assets/sounds/soundfile1.mp3');
        audio.play();
        setTimeout(function()
        { 
            game.losses += 1;
            game.initializeTheGame(); 
        }, 3000);
    },
    //has this been guessed before?
    wasGuessed: function(guess)
    {
        if(game.guessed.indexOf(guess) >= 0) //this was guessed before
        {
            return true;
        }
        else
        {
            game.guessed[game.theTurn] = guess;
            this.theGuessed[0].innerHTML = game.guessed;
            return false;
        } 
    },
    // choose a new word
    chooseAWord: function() {
        this.word = Math.floor(Math.random() * this.dictionary.length);
        this.theWord = this.dictionary[this.word];
        this.outputTheBlanks();
    },

    outputTheBlanks: function()
    {
        //set up the right number of blank spaces
        var myWord = this.theWord;
        this.theBlanks[0].innerHTML ="";
        var noBlanks = 0;
        for (var i = 0; i < myWord.length; i++) 
        {
            if(game.guessed.indexOf(myWord[i]) >= 0)//char match
            {
                this.theBlanks[0].innerHTML += (" " + myWord[i]);
            }
            else
            {
                this.theBlanks[0].innerHTML += " _";  
                noBlanks += 1;
            }
        }
        if(noBlanks == 0)
        {
            game.youWin();
        }
    },

    checkALetter: function(myLetter) //the user typed a letter
    {
        var yesFlag = 0;
        var isLetter = /^[A-Za-z]+$/;  
        var newBlanks = "";
        if(myLetter.match(isLetter))  //is it a letter?
         { 
            console.log("it's a letter");
            if(this.wasGuessed(myLetter) == false)//this is a new guess
            {
                console.log("it's a fresh guess");
                game.theTurn += 1;//this is a valid turn
                for (var i = 0; i < this.theWord.length; i++) //check each letter in my word
                {
                    if(this.theWord[i] == myLetter)//it's there so show it
                    {
                        yesFlag = 1;
                    }
                }
                if(yesFlag == 0)//you guessed a wrong letter
                {
                    this.left -= 1;
                    if(this.left == 0)//you just lost!
                    {
                        this.theRemaining[0].innerHTML = "Ned's dead baby, Ned's dead!";
                        game.youLose();
                    }
                    else if(this.left == 1)
                    {
                        this.thePrompting[0].innerHTML = "Wrong!  Choose another letter!";
                        this.theRemaining[0].innerHTML = "YIKES! You have 1 remaining guess!";
                        this.picture[0].src = "assets/images/nedpic" + (12 - game.left) + ".png";
                        var audio = new Audio('assets/sounds/sword.mp3');
                        audio.play();

                    }
                    else
                    {
                        this.thePrompting[0].innerHTML = "Wrong!  Choose another letter!";
                        this.theRemaining[0].innerHTML = "You have " + this.left + " remaining guesses!";
                        this.picture[0].src = "assets/images/nedpic" + (12 - game.left) + ".png";
                        var audio = new Audio('assets/sounds/sword.mp3');
                        audio.play();
                    }
                }
                else//you guessed correctly
                {
                    this.thePrompting[0].innerHTML = "Nice job!  Choose another letter!";
                    game.outputTheBlanks();
                    var audio = new Audio('assets/sounds/swoosh.mp3');
                    audio.play();
                }
            }
        }
    }
};

document.addEventListener("onload", game.initializeTheGame());


document.onkeyup = function(event)
{
    var letter = String.fromCharCode(event.keyCode).toUpperCase();
    game.checkALetter(letter);
}