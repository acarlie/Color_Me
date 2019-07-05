var body = document.getElementsByTagName('body')[0];
var container = document.getElementById('gameContainer');


var colors = {
    color: ["seafoam", "magenta", "lavender", "aqua", "crimson", "purple", "lime", "watermelon", "goldenrod", "turquoise"],
    colorHex: ["#73FFD3", "#FF28AD", "#CEADEB", "#01F4FF", "#FF013D", "#A853FF", "#B8FF59", "#FF6D84", "#FFC255", "#45C3C7"],
    random(){
        var random = Math.round(Math.random()*(this.color.length - 1));
        var randomWord = this.color[random];
        var randomWordLength = this.color[random].length;
        var colorHex = this.colorHex[random]; 
        var lettersArray = randomWord.split("", randomWordLength);

        body.style.backgroundColor = colorHex;

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
        
    }
    
}

colors.random();

document.onkeypress=function(e){
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode);

    document.querySelectorAll('[data-letter]').forEach(function(item){
        var dataLetter = item.innerHTML;
        if(key === dataLetter){
            item.className = "letter visible";
            console.log('worked');
        } 

    });

}

