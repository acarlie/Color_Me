//colors obj
var game = {
    body: document.getElementsByTagName('body')[0],
    container: document.getElementById('gameContainer'),
    guessCont: document.getElementById('guesses'),
    winCont: document.getElementById('wins'),
    testButton: document.getElementById('test'),
    guesses: 13,
    wins: 0,
    color: ["seafoam", "magenta", "lavender", "aqua", "crimson", "purple", "lime", "watermelon", "goldenrod", "turquoise"],
    colorHex: ["#73FFD3", "#FF28AD", "#CEADEB", "#01F4FF", "#FF013D", "#A853FF", "#B8FF59", "#FF6D84", "#FFC255", "#45C3C7"],
    random: "",
    randomWord: "",
    randomWordLength: "",
    lettersArray: "",
    soundCorrect: 'assets/sounds/positive.mp3',
    soundWrong: 'assets/sounds/negative.mp3',
    soundWin: 'assets/sounds/word_cleared.mp3',
    sound(sound, volume){
        var newSound = new Audio(sound);
        newSound.volume = volume;
        newSound.play();
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
    bgColor(random){
        var colorHex = this.colorHex[random]; 
        this.body.style.backgroundColor = colorHex;
    },
    reset(randomNum){
        this.guesses = 13;
        this.guessCont.innerHTML = game.guesses;
        this.container.innerHTML = "";

        this.random = randomNum;
        this.randomWord = this.color[randomNum];
        this.randomWordLength = this.color[randomNum].length;
        this.lettersArray = this.randomWord.split("", this.randomWordLength);

        this.letterBoxes(this.randomWordLength, this.lettersArray);
        this.bgColor(randomNum);
    }
    
}

window.onload = function(){
    var randomNum = Math.round(Math.random()*(game.color.length - 1));
    game.reset(randomNum);
}

//reset


var keyCount = 0;

document.onkeyup = function(e){
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode).toLowerCase();
    var keyIndex = game.lettersArray.indexOf(key);
    var visible = document.querySelectorAll('.visible').length;

    if (key.match(/[a-z]/)){
        // function game(){

        // }

        if (keyIndex > -1 && game.guesses > 0){

            game.sound(game.soundCorrect, .05);

            document.querySelectorAll('[data-letter]').forEach(function(item){
                var dataLetter = item.innerHTML;
        
                if(key === dataLetter && keyIndex > -1){
                    item.className = "letter visible";
                } 
            });
    
            //fix
            if((game.randomWordLength - 1) === visible){
                game.wins += 1;
                console.log('you have ' + game.wins + " wins!");
                game.winCont.innerHTML = game.wins;
                var randomNum = Math.round(Math.random()*(game.color.length - 1));
                game.reset(randomNum);

            }
    
        } else if (keyIndex < 0 && game.guesses > 0){
    
            game.sound(game.soundWrong, .25);
    
            game.guesses -= 1;
            game.guessCont.innerHTML = game.guesses;
    
        } else if (game.guesses === 0){
            game.container.innerHTML = "game over";
            console.log('game over');
    
        } 



    } 

}

