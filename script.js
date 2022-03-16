// Variables
var canvas = document.querySelector("#gameCanvas");
var GFX = canvas.getContext('2d');

let stepSize = 50;

// Player
var headposition = {
    0:[400,300],
    1:[400,300],
    2:[400,300],
    3:[400,300]
};
var blength = 3;

var direction = [0,0];

// Food
var foodpos = [400,200];

// Events
window.addEventListener('load', start);
window.addEventListener('keydown', rinput);

// Functions
function start(){
    window.setInterval(loop, 250);

    // Gameplay
    direction = [1,0];
}

function loop(){
    movement();
    draw();
}

function rinput(event){
    if(event.key == 'g'){
        grow();
    }

    if(event.key == 'd'
    && direction[0] != -1){
        direction = [1,0];
    }
    if(event.key == 's'
    && direction[1] != -1){
        direction = [0,1];
    }
    if(event.key == 'a'
    && direction[0] != 1){
        direction = [-1,0];
    }
    if(event.key == 'w'
    && direction[1] != 1){
        direction = [0,-1];
    }
}

// Game Funcs
function draw(){
    // Draw the background
    GFX.fillStyle = 'black';
    GFX.fillRect(0,0, 800,600)

    // Drawing the body
    GFX.fillStyle = 'lime';

    for(var i = 0; i < blength; i++){
        GFX.fillRect(headposition[i][0], headposition[i][1], 
            stepSize, stepSize);
    }

    // Food
    GFX.fillStyle = 'red';
    GFX.fillRect(foodpos[0], foodpos[1], stepSize, stepSize);
}

function movement(){
    // Moving

    /*
        Wait, You're actually reading my code?
        Want it? It's yours. I made it in about,
        15 minutes? It was not that difficult haha.
        You can have it!

        GITHUB - 
    */

    for(var i = blength; i >= 0; i--){
        if(i != 0){
            console.log("TRYING TO:", (i-1).toString());
            headposition[i][0] = headposition[i-1][0];
            headposition[i][1] = headposition[i-1][1];
        }
        else{
            headposition[i][0] += stepSize * direction[0];
            headposition[i][1] += stepSize * direction[1];

            // Wrapping
            if(headposition[i][0] < 0)   {headposition[i][0] = 800;}
            if(headposition[i][0] > 800) {headposition[i][0] = 0;  }

            if(headposition[i][1] < 0)   {headposition[i][1] = 600;}
            if(headposition[i][1] > 600) {headposition[i][1] = 0;  }
        }
    }

    // Food
    if(headposition[0][0] == foodpos[0]
    && headposition[0][1] == foodpos[1]){
        grow();
        moveFood();
    }
}

function grow(){
    headposition[blength + 1] = [headposition[blength][0], headposition[blength][1]];

    blength += 1;
}

function moveFood(){
    foodpos[0] = parseInt((Math.random() * 800) / stepSize) * stepSize;
    foodpos[1] = parseInt((Math.random() * 600) / stepSize) * stepSize;
}