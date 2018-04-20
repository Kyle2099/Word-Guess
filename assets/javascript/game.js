var theGame = {
    currentLetter: "",

    allGuesses: [],
    incorrectGuesses: [],
    correctGuesses: [],
    correctGuessesYouHaveGotInOrder: [],

    wordBank: ["GRABOWSKI", "DIBS", "LSD", "THE L", "JEWELS","THE LOOP", "THE DRAKE", "POP", "WASHROOM", "SEARS TOWER", "RACKETEER", "SKYSCRAPER", "JAZ"],
    textRandom: "",
    generatedLetter: [],

    correctLetter: null,
    incorrectLetter: null,

    guessesRemaining: 11,
    lostGame: 0,
    wonGame: 0,

    generateWord: function () {
        //Generate a random number from 0-13
        var random_num = Math.random() * 13;
        random_num = Math.floor(random_num);

        //Assign text random to a word from the array whose index was chosen randomly.
        //Split the string into an array containing the individual letters of the randomly chosen word
        this.textRandom = this.wordBank[random_num];
        this.generatedLetter = this.textRandom.split("");

        //Shows that a randomly chosen word about Chicago was converted into an array containing each of its letters.
        console.log(this.textRandom + " " + this.generatedLetter);

        //Since this function will only run on a win or lose, reset the guesses arrays
        this.allGuesses = [];
        this.incorrectGuesses = [];
        this.correctGuesses = [];
        this.correctGuessesYouHaveGotInOrder = [];
        this.guessesRemaining = 11;
    },

    cehckGameAgain: function () {
        var repeatCounter = -1;

        //Loops for the number of guesses previously made showing how many times.
        //If the current letter equals one from the array of all guesses, the counter variable will counts up once.
        for (var i = 0; i < this.allGuesses.length; i++) {
            if (this.currentLetter == this.allGuesses[i]) {
                repeatCounter++;
            }
        }
        //If counter is zero, the global incorrect letter variable becomes false (showing that no matches were found)
        //Otherwise a match was found and incorrect letter becomes true.
        if (repeatCounter == 0) {
            this.incorrectLetter = false;
        }
        else {
            this.incorrectLetter = true;
        }
    },
    cehckGame: function () {
        var matchCounter = 0;

        //Loop for the band names length amount of times.
        //If the "guessed letter" is equal to the the word bank letter at a given index, the counter variable counts up one time.
        for (var i = 0; i < this.generatedLetter.length; i++) {
            if (this.currentLetter == this.generatedLetter[i]) {
                matchCounter++;
            }
        }
        //If counter is zero, the global correct letter variable becomes false (showing that no matches were found)
        //Otherwise a match was found and correct letter becomes true.
        if (matchCounter == 0) {
            this.correctLetter = false;
        }
        else {
            this.correctLetter = true;
        }
    },
    gameIsLookingForSameLetter: function () {
        //If the same key is pressed twice, it is removed from all guesses.
        if (this.incorrectLetter == true) {
            this.allGuesses.pop(this.currentLetter);
        }
        //The letter has not been guessed and was a wrong guess, put the current letter in the incorrect guesses section.
        if (this.incorrectLetter == false && this.correctLetter == false) {
            this.incorrectGuesses.push(this.currentLetter);
            this.guessesRemaining--;
        }
        //Letter has not been guessed and was a correct guess, put the current letter in correct guesses section.
        if (this.incorrectLetter == false && this.correctLetter == true) {
            this.correctGuesses.push(this.currentLetter);
            this.guessesRemaining--;
        }
    },
    revealWordChoice: function () {
        //If there are no correct guesses,
        //For the number of letters in the word bank, fill the displayed guesses with an underscore.
        if (this.correctGuesses.length == 0) {
            for (var i = 0; i < this.generatedLetter.length; i++) {
                this.correctGuessesYouHaveGotInOrder[i] = "_";
            }
        }
        else {
            //For the length of the word bank,
            for (var i = 0; i < this.generatedLetter.length; i++) {
                //If the displayed guess is not the same as the generated letter at the local var
                if (this.correctGuessesYouHaveGotInOrder[i] != this.generatedLetter[i]) {
                    //Loop for correct guesses for the Array,
                    for (var j = 0; j < this.correctGuesses.length; j++) {
                        //If the correct guesses at the local Var is equal to generated letter at i, the displayed guess becomes the word bank at index i
                        if (this.correctGuesses[j] == this.generatedLetter[i]) {
                            this.correctGuessesYouHaveGotInOrder[i] = this.generatedLetter[i];
                        }
                        //Otherwise the displayed guess at the local var (corresponding to the word bank indexes) becomes an underscore.
                        else {
                            this.correctGuessesYouHaveGotInOrder[i] = "_";
                        }
                    }
                }
            }
        }

        document.getElementById("current-word").innerHTML = this.correctGuessesYouHaveGotInOrder.join(" ");
        document.getElementById("num-wins").innerHTML = ("Wins: " + this.wonGame + "  " + "Losses: " + this.lostGame);
        document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
        document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
    },
    checkProgress: function () {
        var counter = 0;

        //Loop a number to equal to the length of the word bank. 
        //If a guess is equal to the the word bank for the same index, add 1 to the counter.
        for (var i = 0; i < this.generatedLetter.length; i++) {
            if (this.correctGuessesYouHaveGotInOrder[i] == this.generatedLetter[i]) {
                counter++;
            }
        }

        //If the counter is the length of the word inside the wordBank, the user has won.
        if (counter == this.generatedLetter.length) {
            alert("You win");
            this.wonGame++;
            this.generateWord();
        }
        //If the number of guesses remaining is zero, the user has lost.
        if (this.guessesRemaining == 0) {
            alert("You lose, Press scape bar to play again!");
            this.lostGame++;
            this.generateWord();
        }
    }
}

var userStartedGameOnce = false;

//On every keyup...
document.onkeyup = function (q) {

    //current letter is pushed on the keyboard and is converted to upper case.
    //Then the letter is put into the all guesses array.
    theGame.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

    //If the user presses the space button upon loading the page, the user will start the game.
    if (theGame.currentLetter == " " && userStartedGameOnce == false) {


        theGame.generateWord();

        userStartedGameOnce = true;

    }

    if (userStartedGameOnce == false) {
        return;
    }

    theGame.allGuesses.push(theGame.currentLetter);

    console.log("Current Word: " + theGame.currentLetter + "\n" + "Word Bank: " + theGame.generatedLetter + "\n" + "All Guesses: " + theGame.allGuesses);


    //The Game checks to see if the letter has been typed before.
    //The Game checks to see if the letter matches with one in the word bank.
    theGame.cehckGameAgain();
    theGame.cehckGame();


    //This function determines which array to push the current letter into.
    theGame.gameIsLookingForSameLetter();

    console.log("Correct Guesses: " + theGame.correctGuesses);
    console.log("Incorrect Guesses: " + theGame.incorrectGuesses);
    console.log("Guesses Remaining:" + theGame.guessesRemaining);

    // The game reveals the word bank answer as it is being guessed.
    theGame.revealWordChoice();
    console.log(theGame.correctGuessesYouHaveGotInOrder);

    //Check to see if the game is still in progress or if a win/lose has happened
    theGame.checkProgress();
}