var container = document.getElementById('gameContainer');

var colors = {
    color: ["Seafoam", "Magenta", "Lavender", "Aqua", "Crimson", "Purple", "Lime", "Watermelon", "Goldenrod", "Turquoise"],
    colorHex: ["#73FFD3", "#FF28AD", "#CEADEB", "#01F4FF", "#FF013D", "#A853FF", "#B8FF59", "#FF6D84", "#FFC255", "#45C3C7"],
    random(){
        var random = Math.round(Math.random()*(this.color.length - 1));
        var randomWord = this.color[random];
        var randomWordLength = this.color[random].length;
        var colorHex = this.colorHex[random]; 
        var lettersArray = randomWord.split("", randomWordLength);

        container.style.backgroundColor = colorHex;

        for (var i = 0; i < randomWordLength; i++){
            var letterBox = document.createElement("span");
            letterBox.innerHTML = "";
            letterBox.className = "letterBox";
            container.appendChild(letterBox);

            var letterSpan = document.createElement("span");
            letterSpan.innerHTML = lettersArray[i];
            letterSpan.className = "letter";
            letterBox.appendChild(letterSpan);

        }
        
    }
    
}

colors.random();

document.onkeypress=function(e){
    console.log("key pressed");
}
