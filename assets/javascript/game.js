//colors obj
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
    guesses: 10,
    wins: 0,
    //turn into nested object
    colorArray: [
        {name: "seafoam", colorMain: "#BDFFF3", colorTwo: "#4AC29A"}, 
        {name: "magenta", colorMain: "#f953c6", colorTwo: "#b91d73"}, 
        {name: "lavender", colorMain: "#e1ceff", colorTwo: "#d277c8"}, 
        {name: "aqua", colorMain: "#A6FFCB", colorTwo: "#12D8FA"}, 
        {name: "purple", colorMain: "#E100FF", colorTwo: "#7F00FF"}, 
        {name: "lime", colorMain: "#DCE35B", colorTwo: "#45B649"},
        {name: "citrus", colorMain: "#FDC830", colorTwo: "#F37335"},
        {name: "maroon", colorMain: "#DA4453", colorTwo: "#89216B"},
        {name: "peach", colorMain: "#FFC371", colorTwo: "#FF5F6D"},
        {name: "violet", colorMain: "#a415e9", colorTwo: "#4522ad"},
        {name: "crimson", colorMain: "#e9152d", colorTwo: "#ad2249"},
        {name: "bubblegum", colorMain: "#ff8ed0", colorTwo:"#e45acb"},
        {name: "rose", colorMain: "#ffaddd", colorTwo: "#ff6e8b"},
        {name: "avocado", colorMain: "#d9e45a", colorTwo: "#9db230"},
        {name: "pumpkin", colorMain: "#ff9b39", colorTwo: "#e4582c"},
        {name: "navy", colorMain: "#394483", colorTwo: "#10163a"},
        {name: "turquoise", colorMain: "#63ecd3", colorTwo: "#15a1a2"}
        ],
    loadingText: ["Getting things ready...", "Good news everyone! The page has loaded.", "One moment...", "Loading into the Matrix..."],
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
    letterBoxes(randomWordLength, lettersArray){

        for (var i = 0; i < randomWordLength; i++){
            var letterBox = document.createElement("span");
            letterBox.innerHTML = "";
            letterBox.className = "letterBox";
            this.container.appendChild(letterBox);

            var letterSpan = document.createElement("span");
            letterSpan.innerHTML = lettersArray[i];
            letterSpan.className = "letter";
            letterSpan.setAttribute('data-letter', lettersArray[i]);
            letterBox.appendChild(letterSpan);
        }
    },
    bgColor(colorOne, colorTwo){
        this.body.style.background = 'linear-gradient(to right,' + colorOne + ',' + colorTwo + ')';
    },
    textShadow(colorTwo){
        this.headingText.style.textShadow = '2px 4px 6px ' + colorTwo;
    },
    generator(randomNum){
        var random = this.colorArray[randomNum];
        var randomWord = random.name;
        var colorHex = random.colorMain; 
        var colorHexTwo = random.colorTwo;

        this.colorArray.splice(randomNum, 1);

        this.randomWordLength = randomWord.length;
        this.lettersArray = randomWord.split("", this.randomWordLength);
        
        this.letterBoxes(this.randomWordLength, this.lettersArray);
        this.bgColor(colorHex, colorHexTwo);
        this.textShadow(colorHexTwo);
    },
    reset(randomNum){
        this.guesses = 10;
        this.guessCont.innerHTML = game.guesses;
        this.container.innerHTML = "";
        this.wrongLettersArray = [];
        this.correctLettersArray = [];
        this.wrong.innerHTML = "";

        this.generator(randomNum);
    },
    win(){
        this.wins += 1;
        this.sound(this.soundWin, .25);
        console.log('you have ' + this.wins + " wins!");
        this.winCont.innerHTML = this.wins;
    },
    lose(){
        this.container.innerHTML = "game over, game will restart in 5 seconds";
        this.sound(this.soundLose, .25);
        console.log('game over');
    },
    wrongGuess(key){
        if (this.wrongLettersArray.indexOf(key) === -1){
            this.sound(this.soundWrong, .25);
            this.guesses -= 1;
            this.guessCont.innerHTML = this.guesses;
            this.wrong.innerHTML += " " + key;
            this.wrongLettersArray.push(key);
        } else{
            console.log('already guessed ' + key);
        }
     
    }
    
}

game.randomLoadText();

window.onload = function(){
    var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
    game.reset(randomNum);
    game.loadWrap.className = 'loaded';
}

var keyCount = 0;

document.onkeyup = function(e){
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode).toLowerCase();
    var keyIndex = game.lettersArray.indexOf(key);
    var correctGuessesIndex = game.correctLettersArray.indexOf(key);
    var visible = document.querySelectorAll('.visible').length;    

    if (key.match(/[a-z]/)){

        if (keyIndex > -1 && game.guesses > 0 && correctGuessesIndex === -1){

            game.sound(game.soundCorrect, .05);

            document.querySelectorAll('[data-letter]').forEach(function(item){
                var dataLetter = item.innerHTML;
                if(key === dataLetter && keyIndex > -1){
                    item.className = "letter visible";
                    game.correctLettersArray.push(key);
                } 
            });

            if((game.randomWordLength - 1) === visible){

                game.win();

                if (game.colorArray.length > 0){
                    var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
                    setTimeout(function(){game.reset(randomNum);}, 1000); 
                } else{
                    //write for if someone goes through all options
                }
               
            }
    
        } else if (keyIndex < 0 && game.guesses > 0){
            game.wrongGuess(key);

        } else if (game.guesses === 0){
            game.lose();

            var randomNum = Math.round(Math.random()*(game.colorArray.length - 1));
            setTimeout(function(){game.reset(randomNum);}, 5000);
    
        } 

    } 

}

