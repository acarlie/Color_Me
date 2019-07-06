//global variables
var body = document.getElementsByTagName('body')[0];
var container = document.getElementById('gameContainer');
var guessCont = document.getElementById('guesses');
var winCont = document.getElementById('wins');
var guesses = 13;
var wins = 0;

guessCont.innerHTML = guesses;

var random;
var randomWord;
var randomWordLength;
var lettersArray;

//sounds
var soundCorrect = new Audio('assets/sounds/positive.mp3');
var soundWrong = new Audio('assets/sounds/negative.mp3');
var soundWin = new Audio('assets/sounds/word_cleared.mp3');
soundCorrect.volume = .05;

//colors obj
var colors = {
    color: ["seafoam", "magenta", "lavender", "aqua", "crimson", "purple", "lime", "watermelon", "goldenrod", "turquoise"],
    colorHex: ["#73FFD3", "#FF28AD", "#CEADEB", "#01F4FF", "#FF013D", "#A853FF", "#B8FF59", "#FF6D84", "#FFC255", "#45C3C7"],
    letterBoxes(random, randomWordLength, lettersArray){

        for (var i = 0; i < randomWordLength; i++){
            var letterBox = document.createElement("span");
            letterBox.innerHTML = "";
            letterBox.className = "letterBox";
            container.appendChild(letterBox);

            var letterSpan = document.createElement("span");
            letterSpan.innerHTML = lettersArray[i];
            letterSpan.className = "letter";
            letterSpan.setAttribute('data-letter', lettersArray[i]);
            letterBox.appendChild(letterSpan);
        }

    },
    bgColor(random){
        var colorHex = this.colorHex[random]; 
        body.style.backgroundColor = colorHex;
    }
    
}

// function randomize(){
    //variables referncing colors
    var random = Math.round(Math.random()*(colors.color.length - 1));
    var randomWord = colors.color[random];
    var randomWordLength = colors.color[random].length;
    var lettersArray = randomWord.split("", randomWordLength);

    //function call
    colors.letterBoxes(random, randomWordLength, lettersArray);
    colors.bgColor(random);
// }


var keyCount = 0;

//keypress
document.onkeyup = function(e){

    // keyCount += 1;

    // if (keyCount === 1){
    //     randomize();
    // }
    // console.log(lettersArray);

    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode).toLowerCase();
    var keyIndex = lettersArray.indexOf(key);
    var visible = document.querySelectorAll('.visible').length;

    if (key.match(/[a-z]/)){
        // function game(){

        // }

        if (keyIndex > -1 && guesses > 0){

            soundCorrect.play();
    
            document.querySelectorAll('[data-letter]').forEach(function(item){
                var dataLetter = item.innerHTML;
        
                if(key === dataLetter && keyIndex > -1){
                    item.className = "letter visible";
                } 
            });
    
            //fix
            if((randomWordLength - 1) === visible){
                wins += 1;
                console.log('you have ' + wins + " wins!");
            }
    
        } else if (keyIndex < 0 && guesses > 0){
    
            soundWrong.play();
    
            guesses -= 1;
            guessCont.innerHTML = guesses;
    
        } else if (guesses === 0){
    
            console.log('game over');
    
        } 

        if((randomWordLength - 1) === visible){
            wins += 1;
            console.log('TEST TEST you have ' + wins + " wins!");
        }

    } 

}

