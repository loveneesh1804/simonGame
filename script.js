var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("#level-title").click(function(){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true ;
    }
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    // console.log(gamePattern);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("/sounds/"+randomChoosenColor+".mp3");
    // audio.play();
    playsound(randomChoosenColor);

}

$(".btn").click(function(){
    var userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);
    // console.log(userClickedPattern);
    // var audio1 = new Audio("/sounds/"+userChoosenColor+".mp3");
    // audio1.play();
    playsound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playsound(name){
    var audio = new Audio("./"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}




function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Sucess");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("Fail");
        playsound("wrong");
        $("#body1").addClass("game-over");
        setTimeout(function(){
            $("#body1").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Click to Restart");
        startover();
    }
}