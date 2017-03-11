function Figure() {
	this.type = floor(random(0, 7)); //Select a random type
	
	this.x = floor(width / scale / 2) - 1; //Start at the top of the screen
	this.y = -2;
	
	this.bx = new Array(); //Coordinates of the figure squares
	for(i = 0; i < 4; i++) {
		this.bx[i] = Blocks[this.type][1][0][i]; //Set the coordinates according to the type choosen
	}
	this.by = new Array();
	for(i = 0; i < 4; i++) {
		this.by[i] = Blocks[this.type][1][1][i]; //Set the coordinates according to the type choosen
	}
	
	this.color = Blocks[this.type][0]; //Set the according color of the type choosen
	
	this.moved = millis(); //Time last moved
	this.down = 1; //Fast or slow falling down

	this.update = function() { //Update the figure
		if(this.down == 0){ //If drop key is pressed
			while(!colided){  //Fall until it reches the grid
				this._fall();
			}
		}else if(this.moved + timeForFall / this.down <= millis()) { //If the time has past
			this._fall(); //Fall one block
		}
		this.down = 1; //Set falling down speed back to normal
	}
	
	
	
	this.show = function() { //Show the figure
		if(!colided){
			fill(this.color);
			strokeWeight(0.5);
			stroke(this.color);
			for(i = 0; i < 4; i++) {
				rect((this.x + this.bx[i]) * scale + borderSmall,
					(this.y + this.by[i]) * scale + borderSmall,
					squareSize,
					squareSize);
			}
		}
	}
	
	this._fall = function() {
		for (i = 0; i < 4; i++) { //Check whether any square has colided with the board
			if(this.y + this.by[i] + 1 >= 0) {
				if(grd.grid[this.x + this.bx[i]][this.y + this.by[i] + 1] != 0 || this.y + this.by[i] + 1 >= rows) {
					colided = true;
					break;
				}
			}
		}
		if(!colided) { //If none of the squares had collided already
			this.moved = millis();
			this.y++; //Move down by one
			if(this.down == 0) { //Give extra score if player drops or moves the figure faster down
				score += level;
			}else if(this.down != 1) {
				score += level * 0.75;
			}
		}else{ //If some of the squares have reached the ground
			for (i = 0; i < 4; i++) {
				if(this.y + this.by[i] > -1) { //If the square is in the playing field
					grd.grid[this.x + this.bx[i]][this.y + this.by[i]] = this.color; //Place it on the grid
				}else{ //If one of the squares is outside the grid
					gameOver(); //Declare game over
				}
			}
		}
	}
	
	this.move = function(direction) { //Move the figure left or right
		if(direction == 'RIGHT'){ //Set dir according to the direction the player wants to move
			this.dir = 1;
		}else if(direction == 'LEFT'){
			this.dir = -1;
		}
		//Check whether this move can be possible
		if(this._checkIfPossible(this.bx[0] + this.x + this.dir, this.bx[1] + this.x + this.dir, this.bx[2] + this.x + this.dir, this.bx[3] + this.x + this.dir,
								 this.by[0] + this.y, this.by[1] + this.y, this.by[2] + this.y, this.by[3] + this.y)) {
			this.x += this.dir; //If it is then move
		}
	}
	
	this.rotate = function(direction) { //ROtate the figure
		if(this.type != 3) { //If it is not a square
			this.tempBx = new Array(); //Create temporary positions of the potential move
			this.tempBy = new Array();
			for(i = 0; i < 4; i++) {
				this.tempBx[i] = this.bx[i];
				this.tempBy[i] = this.by[i];
			}
			if(direction == 'RIGHT') {
				for(i = 0; i < 4; i++) {
					this.temp = this.tempBx[i];
					this.tempBx[i] = -this.tempBy[i];
					this.tempBy[i] = this.temp;
				}
			}else if(direction == 'LEFT') {
				for(i = 0; i < 4; i++){
					this.temp = this.tempBy[i];
					this.tempBy[i] = -this.tempBx[i];
					this.tempBx[i] = this.temp;
				}
			}
			//Check if the rotation is possible
			if(this._checkIfPossible(this.tempBx[0] + this.x, this.tempBx[1] + this.x, this.tempBx[2] + this.x, this.tempBx[3] + this.x,
									 this.tempBy[0] + this.y, this.tempBy[1] + this.y, this.tempBy[2] + this.y, this.tempBy[3] + this.y)) {
				//If it is then apply the potential position values to the figure
				if(direction == 'RIGHT') {
					for(i = 0; i < 4; i++) {
						this.temp = this.bx[i];
						this.bx[i] = -this.by[i];
						this.by[i] = this.temp;
					}
				}else if(direction == 'LEFT') {
					for(i = 0; i < 4; i++){
						this.temp = this.by[i];
						this.by[i] = -this.bx[i];
						this.bx[i] = this.temp;
					}
				}
			}
		}
	}
	
	this._checkIfPossible = function(bx1, bx2, bx3, bx4, by1, by2, by3, by4) {
		this.possible = true; //Flag
		this.tempBx = new Array(); //Create temporary potential figures positions
		this.tempBy = new Array();
		this.tempBx[0] = bx1;
		this.tempBx[1] = bx2;
		this.tempBx[2] = bx3;
		this.tempBx[3] = bx4;
		this.tempBy[0] = by1;
		this.tempBy[1] = by2;
		this.tempBy[2] = by3;
		this.tempBy[3] = by4;
		for (i = 0; i < 4; i++) { //Check every square of the figure if the place for it is free
			if(this.tempBx[i] >= 0 && this.tempBx[i] <= cols - 1){
				if(this.tempBy[i] >= 0) {
					if(grd.grid[this.tempBx[i]][this.tempBy[i]] != 0) {
						this.possible = false; //If it is not return false immediately
						break;
					}
				}
			}else{
				this.possible = false; //If it is not return false immediately
				break;
			}
		}
		return this.possible; //Return the result
	}
}