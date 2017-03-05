const width = 260, height = 440; //Width and Height of the game
const xPos = 0, yPos = 0; //Position of the canvas
const scale = 20; //Scale of the game (Should be dividable with width and height)
const rows = height / scale; //Count of rows and columns of the grid
const cols = width / scale;
const borderSmall = scale / 16;
const squareSize = scale - scale / 8;
const maxBorder = scale / 2 - borderSmall;
var gameState; //State of the game

var speed = 200; //Start speed for the figures
var clearedLines = 0; //How many lines have been cleared
var nextLevelLines = 5; //On how many lines the level changes
var score; //The score
var highscore;  //The highscore
var level; //The level

var fig, grd; //Figure and Grid objects
var canv; //Canvas
var colided = false; //Has figure colided with the grid?

var inputBuffer = new Array(); //Store input in an input buffer

var scoreBoard; //HTML page element for displaying score
var levelBoard; //HTML page element for displaying level
var highscoreBoard; //HTML page element for displaying highscore
var GO_Score; //HTML page element for displaying score on game over screen
var GO_Highscore; //HTML page element for displaying score on game over screen

var blinkTime = 0; //Time when last blinked the "press space to start a new game"
var blinkState = false; //Is the blinking text white or black?

var song; //The game sound

function preload() {
	song = loadSound("https://raw.githubusercontent.com/Spuulis/Tetris-JS/master/karobeniki.mp3");
}

function setup() {
	
	/*if(window.localStorage.getItem("highscore") == null) { //If there is no highscore stored on localStorage then create one and set it to 0
		window.localStorage.getItem("highscore") = 0;
	}*/

	grd = new Grid(); //Create the Grid
	
	canv = createCanvas(width, height); //Create canvas
	canv.parent("gameHolder"); //Put the canvas in HTML DIV "gameHolder"
	
	scoreBoard = document.getElementById("score"); //Link HTML elements for displaying information to variables
	levelBoard = document.getElementById("level");
	highscoreBoard = document.getElementById("highscore");
	GO_Score = document.getElementById("GO-Score");
	GO_Highscore = document.getElementById("GO-Highscore");
	
	restart(); //Set starting variables
	
	document.getElementById("gameHolder").style.height = '440px'; //Remove the "browser not supported" window and restore canvas holder
	document.getElementById("browserNotSupported").style.height = '0px';
	document.getElementById("browserNotSupported").style.padding = '0px';
	document.getElementById("browserNotSupported").innerHTML = '';
	song.loop();
}

function restart() {
	document.getElementById("gameOver").style.visibility = 'hidden'; //Make GameOver screen hidden
	highscore = localStorage.getItem('highscore'); //Get highscore
	if (highscore == null) {
		highscore = 0;
	}
	fig = new Figure(); //Create the Figure
	grd.clearGrid(); //Set everything in the grid to 0
	gameState = "RUNNING"; //Set game running
	inputBuffer = new Array(); //Clear the input buffer
	score = 0.00; //Set score to 0
	level = 1; //Set level to 1
}

function handleInput() {
	if(keyIsDown(DOWN_ARROW)) { //Speed up the figure if player presses the down arrow
		fig.down = 3.5;
	}
	for (i = 0; i < inputBuffer.length; i++) { //Do all the 
		switch(inputBuffer[i]) {
			case "MOVE_RIGHT":
				fig.move('RIGHT');
			break;
			case "MOVE_LEFT":
				fig.move('LEFT');
			break;
			case "ROTATE_RIGHT":
				fig.rotate('RIGHT')
			break;
			case "ROTATE_LEFT":
				fig.rotate('LEFT');
			break;
			case "DROP":
				fig.down = 0;
			break;	
		}
	}
	inputBuffer = new Array();
}

function draw() {
	background(40); //Gray background
	show();
	showInfo();
	if(gameState == "RUNNING") { //Do if the state of the game is running
		handleInput();
		fig.update(); //Update the figure
		createNewFigureIfCollided();
	}else if(gameState == "PAUSED") { //Do if the game is paused
		fill(255, 255, 255, 100);
		rect(0, 0, width, height);
	}else if(gameState == "OVER") { //Do if at least one of the figures have reached top
		fill(255, 255, 255, 100);
		rect(0, 0, width, height);
		blink();
		checkRestart();
	}else if(gameState == "DROPPING") {
		grd.dropping();
	}
}

function createNewFigureIfCollided() { //If figure has colided then create a new figure
	if(colided && gameState != "OVER") {
		grd.checkForLines();
		if (gameState != "DROPPING") {
			colided = false;
			fig = new Figure();
		}
	}
}

function show() {
	fig.show(); //Draw the figure and the grid
	grd.showGrid();
}

//Handle keyboard presses
function keyPressed() {
	if(keyCode == RIGHT_ARROW) { //Move the figure right and left if the player presses the arrow keys
		inputBuffer[inputBuffer.length] = "MOVE_RIGHT";
	}
	else if(keyCode == LEFT_ARROW) {
		inputBuffer[inputBuffer.length] = "MOVE_LEFT";
	}
	
	else if(keyCode == 88) { //Rotate the figure if player presses 'X' or 'Z'
		inputBuffer[inputBuffer.length] = "ROTATE_RIGHT";
	}
	else if(keyCode == 90) {
		inputBuffer[inputBuffer.length] = "ROTATE_LEFT";
	}
	
	else if(keyCode == 32) { //Drop the figure if space key is pressed
		inputBuffer[inputBuffer.length] = "DROP";
	}
	return false; //Return false as a default value
}

function showInfo() {
	scoreBoard.innerHTML = Math.floor(score); //Show score on the score board
	levelBoard.innerHTML = level; //Show level on the score board
	highscoreBoard.innerHTML = highscore; //Show high score on the score board
}

function gameOver() {
	if(gameState != "OVER") { //Run only once when game has stopped
		gameState = "OVER";
		if(score > highscore) { //Change the high score if it beaten
			localStorage.setItem('highscore', Math.floor(score));
			highscore = Math.floor(score);
		}
		GO_Score.innerHTML = Math.floor(score); //Show stats on game over screen
		GO_Highscore.innerHTML = highscore;
		document.getElementById("gameOver").style.visibility = 'visible';
		document.getElementById("blink").style.color = 'black'; //Set starting values for the blinking sign
		blinkTime = millis();
	}
}

function blink() {
	if(millis() - blinkTime >= 500) { //Blink every 500 milliseconds
		if(blinkState) {
			document.getElementById("blink").style.color = 'black';
		}else{
			document.getElementById("blink").style.color = 'white';
		}
		blinkState = (blinkState + 1) % 2
		blinkTime = millis();
	}
}

function checkRestart() {
	for (i = 0; i < inputBuffer.length; i++) { //Restart if player has pressed space key
		switch(inputBuffer[i]) {
			case "DROP":
				restart();
			break;	
		}
	}
	inputBuffer = new Array();
}
