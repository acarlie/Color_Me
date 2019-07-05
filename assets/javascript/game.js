var body = document.getElementsByTagName('body')[0];
var container = document.getElementById('gameContainer');
var soundCorrect = new Audio('assets/sounds/positive.mp3');
var soundWrong = new Audio('assets/sounds/negative.mp3');
var soundWin = new Audio('assets/sounds/word_cleared.mp3');

soundCorrect.volume = .05;

var colors = {
    color: ["seafoam", "magenta", "lavender", "aqua", "crimson", "purple", "lime", "watermelon", "goldenrod", "turquoise"],
    colorHex: ["#73FFD3", "#FF28AD", "#CEADEB", "#01F4FF", "#FF013D", "#A853FF", "#B8FF59", "#FF6D84", "#FFC255", "#45C3C7"],
    random(x, y, z){
   
        var colorHex = this.colorHex[x]; 
        body.style.backgroundColor = colorHex;

        for (var i = 0; i < y; i++){
            var letterBox = document.createElement("span");
            letterBox.innerHTML = "";
            letterBox.className = "letterBox";
            container.appendChild(letterBox);

            var letterSpan = document.createElement("span");
            letterSpan.innerHTML = z[i];
            letterSpan.className = "letter";
            letterSpan.setAttribute('data-letter', z[i]);
            letterBox.appendChild(letterSpan);
        }

        console.log(z);
    }
    
}

var random = Math.round(Math.random()*(colors.color.length - 1));
var randomWord = colors.color[random];
var randomWordLength = colors.color[random].length;
var lettersArray = randomWord.split("", randomWordLength);

colors.random(random, randomWordLength, lettersArray);

document.onkeypress=function(e){
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode);

    document.querySelectorAll('[data-letter]').forEach(function(item){
        var dataLetter = item.innerHTML;

        if(key === dataLetter){
            item.className = "letter visible";
            soundCorrect.play();
            console.log('worked');
        }

        // console.log(wordArray);
    });
}

