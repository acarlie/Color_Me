//game obj
var game = {
    body: document.getElementsByTagName('body')[0],
    container: document.getElementById('gameContainer'),
    guessCont: document.getElementById('guesses'),
    winCont: document.getElementById('wins'),
    wrong: document.getElementById('wrong'),
    headingText: document.getElementById('heading'),
    wordSpan: document.getElementById('letters'),
    loadWrap: document.getElementById('loaderWrapper'),
    loadText: document.getElementById('loadText'),
    finalWrapper: document.getElementById('finalWrapper'),
    resultsCont: document.getElementById('results'),
    border: document.querySelectorAll('.border'),
    guesses: 10,
    wins: 0,
    gameTotalWins: 0,
    gamePlay: true,
    colorArray: [
        {name: "seafoam", colorMain: "BDFFF3", colorTwo: "74,194,154"}, 
        {name: "magenta", colorMain: "f953c6", colorTwo: "185,29,115"},
        {name: "lavender", colorMain: "e1ceff", colorTwo: "210,119,200"},
        {name: "aqua", colorMain: "A6FFCB", colorTwo: "18,216,250"}, 
        {name: "purple", colorMain: "E100FF", colorTwo: "127,0,255"}, 
        {name: "lime", colorMain: "DCE35B", colorTwo: "69,182,73"},
        {name: "citrus", colorMain: "FDC830", colorTwo: "243,115,53"},
        {name: "maroon", colorMain: "DA4453", colorTwo: "137,33,107"},
        {name: "peach", colorMain: "FFC371", colorTwo: "255,95,109"},
        {name: "violet", colorMain: "a415e9", colorTwo: "69,34,173"},
        {name: "crimson", colorMain: "e9152d", colorTwo: "173,34,73"},
        {name: "bubblegum", colorMain: "ff8ed0", colorTwo:"228,90,203"},
        {name: "rose", colorMain: "ffaddd", colorTwo: "255,110,139"},
        {name: "avocado", colorMain: "d9e45a", colorTwo: "157,178,48"},
        {name: "orange", colorMain: "ff9b39", colorTwo: "228,88,44"},
        {name: "turquoise", colorMain: "63ecd3", colorTwo: "21,161,162"}
        ],
    colorArrayCopy: [],
    loadingText: ["Getting things ready...", "Loading into the Matrix...", "Good news everyone! The page has loaded.", "Firing up the hyperdrive...", "One moment..."],
    randomWord: "",
    randomWordLength: "",
    lettersArray: "",
    wrongLettersArray: [],
    correctLettersArray: [],
    soundCorrect: 'assets/sounds/positive.mp3',
    soundWrong: 'assets/sounds/negative.mp3',
    soundWin: 'assets/sounds/word_cleared.mp3',
    soundLose: 'assets/sounds/lose.mp3',
    sound(sound, volume){
        var newSound = new Audio(sound);
        newSound.volume = volume;
        newSound.play();
    },
    randomLoadText(){
        var random = Math.round(Math.random()*(game.loadingText.length - 1));
        this.loadText.innerHTML = this.loadingText[random];
    },
    letters(randomWordLength, lettersArray){
        for (var i = 0; i < randomWordLength; i++){

            var letterSpan = document.createElement("span");
            letterSpan.innerHTML = "_";
            letterSpan.className = "letter";
            letterSpan.setAttribute('data-letter', lettersArray[i]);
            this.container.appendChild(letterSpan);

        }
    },
    colorChange(color, change){
        var oldColorRGB = color.split(",");
        var newColorRGB = [];
        oldColorRGB.forEach(function(i){
            newColorRGB.push(Math.round(parseInt(i)*change));
        });

        return 'rgb(' + newColorRGB.toString() + ')';
    },
    styles(colorOne, colorTwo, colorThree, colorFour){
        //main background
        this.body.style.background = 'linear-gradient(to right,' + colorOne + ',' + colorTwo + ')';

        //h1 text shadow
        this.headingText.style.textShadow = '2px 4px 6px ' + colorTwo;

        //result container
        this.resultsCont.style.boxShadow = '1px 3px 16px ' + colorTwo + ' inset, -2px -2px 8px ' + colorOne + ', 2px 1px 2px ' + colorOne;
        this.resultsCont.style.color = colorFour;
        this.resultsCont.style.backgroundColor = colorThree;

        //borders in result container
        this.border.forEach(function(i){
            i.style.borderTop = '1.5px solid ' + colorTwo;
        });
  
    },
    generator(randomNum){
        //random word
        var random = this.colorArray[randomNum];
        var randomWord = random.name;
        this.randomWord = randomWord;

        //colors
        var colorHex = "#" + random.colorMain; 
        var colorHexTwo = "rgb(" + random.colorTwo + ")";
        var colorHexTwoTrans = "rgba(" + random.colorTwo + ", .25)";
        var colorHexTwoDark = this.colorChange(random.colorTwo, .6);

        //remove picked word
        this.colorArray.splice(randomNum, 1);

        //lengths
        this.randomWordLength = randomWord.length;
        this.lettersArray = randomWord.split("", this.randomWordLength);
        
        //generate html and styles
        this.letters(this.randomWordLength, this.lettersArray);
        this.styles(colorHex, colorHexTwo, colorHexTwoTrans, colorHexTwoDark);
    },
    reset(randomNum){
        //reset
        this.guesses = 10;
        this.guessCont.innerHTML = game.guesses;
        this.container.innerHTML = "";
        this.wrongLettersArray = [];
        this.correctLettersArray = [];
        this.wrong.innerHTML = "";

        //generate new
        this.generator(randomNum);
    },
    win(){
        this.wins += 1;
        this.winCont.innerHTML = this.wins;
    },
    finalWin(){
        this.wins += 1;
        this.finalWrapper.classList = 'fixed-wrap win';
        this.finalWrapper.innerHTML = '<div class="container"><div><h1 class="inset">Success!</h1><div class="outcome"><p><strong>Wins: </strong>' + this.wins + '</p></div><h3 class="text-center">Press Any Key to Continue</h3></div></div>';
    },
    lose(totalWins){
        this.finalWrapper.classList = 'fixed-wrap lose';
        this.finalWrapper.innerHTML = '<div class="container"><div><h1 class="inset">Game Over</h1><div class="outcome"><p><strong>Word was: </strong>' + this.randomWord + '<p><strong>Wins: </strong>' + totalWins + '</p></div><h3 class="text-center">Press Any Key to Continue</h3></div></div>';
        this.sound(this.soundLose, .25);
    },
    wrongGuess(key){
        if (this.wrongLettersArray.indexOf(key) === -1){
            this.sound(this.soundWrong, .25);
            this.guesses -= 1;
            this.guessCont.innerHTML = this.guesses;
            this.wrong.innerHTML += " " + key;
            this.wrongLettersArray.push(key);
        } 
     
    }
    
}

game.randomLoadText();

window.onload = function(){
    //make copy of Array, for future reset
    game.colorArrayCopy = game.colorArray.slice();

    //random gen
    var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
    game.reset(randomNum);

    //loaders
    game.loadWrap.className = 'fixed-wrap loaded';
    game.loadText.classList = "fadeIn inset";
}

document.onkeydown = function(e){
    //key
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode).toLowerCase();

    //indexes
    var keyIndex = game.lettersArray.indexOf(key);
    var correctGuessesIndex = game.correctLettersArray.indexOf(key);

    //correct
    var correct = document.querySelectorAll('.correct').length;    

    if (key.match(/[a-z]/) && game.gamePlay){

        if (keyIndex > -1 && game.guesses > 0 && correctGuessesIndex === -1){
            //guess is correct
            game.sound(game.soundCorrect, .025);

            document.querySelectorAll('[data-letter]').forEach(function(item){
                var dataLetter = item.getAttribute("data-letter");
                if(key === dataLetter && keyIndex > -1){
                    item.innerHTML = dataLetter;
                    item.className = "letter correct";
                    game.correctLettersArray.push(key);
                } 
            });

            if((game.randomWordLength - 1) === correct){
                //word completed
                game.sound(game.soundWin, .25);
                setTimeout(function(){game.win();}, 1000);

                if (game.colorArray.length > 0){
                    //next word
                    var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
                    setTimeout(function(){game.reset(randomNum);}, 1000); 
                } else{
                    //all words used, game won
                    game.finalWin();
                    game.gamePlay = false;
                } 
            }
    
        } else if (keyIndex < 0 && game.guesses > 0){
            //incorrect guess
            game.wrongGuess(key);

        } else if (game.guesses === 0){
            //lose
            game.lose(game.wins);
            game.gamePlay = false;
        } 

    } else if (!game.gamePlay){
        //full game reset
        game.colorArray = game.colorArrayCopy.slice();
        var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
        setTimeout(function(){
            game.reset(randomNum);
            game.finalWrapper.classList = "fixed-wrap";
            game.gamePlay = true;
            game.wins = 0;
            game.winCont.innerHTML = game.wins;
        }, 500);
    }

}

