function Grid() {
	this.grid = new Array(); //Array to store playing field
	
	this.droppingLines = new Array();
	this.droppingTime = null;
	
	this.clearGrid = function() { //Make it two dimensional
		for(c = 0; c < cols; c++) {
			this.grid[c] = new Array();
			for(r = 0; r < rows; r++) {
				this.grid[c][r] = 0;
			}
		}
	}

	this.showGrid = function() { //Draw the grid
		for(c = 0; c < cols; c++) { //Every row
			for(r = rows - 1; r >= 0; r--){ //Every column
				if(this.grid[c][r] != 0){ //If there is a square in the place
					fill(this.grid[c][r]); //Then draw it
					strokeWeight(0);
					stroke(this.grid[c][r]);
					for(i = 0; i < 4; i++) {
						rect(c * gScale + borderSmall,
							r * gScale + borderSmall,
							squareSize,
							squareSize);
					}
				}
			}
		}
	}
	
	this.checkForLines = function() { //Check whether some rows are full
		this.drops = 0; //Counter of the full lines (for score)
		for(r = rows - 1; r >= 0; r--){ //Check every row
			this.drop = true; //Flag
			for(c = 0; c < cols; c++) { //Check every square in the row
				if(this.grid[c][r] == 0) { //If any is empty
					this.drop = false; //The row is not full
					break;
				}
			}
			if(this.drop) { //If the row is full
				gameState = "DROPPING";
				this.droppingLines[this.drops] = r;
				this.clearRow(r);
				this.drops++; //Add one to the drop counter
			}
		}
		score += level * 100 * this.drops; //Calculate the score according to drop count
		if(this.drops > 1) { //Give some extra score if the played completed more than one row in one go
			score += level * 20 * Math.pow(2, this.drops);
		}
	}
	
	this._doDrop = function(row) {
		for(dC = 0; dC < cols; dC++) { //Lower every column above the cleared row
			for(dR = row; dR >= 0; dR--){
				this.grid[dC][dR] = this.grid[dC][dR - 1]; //Overwrite the previous column
			}
			this.grid[dC][0] = 0; //Set the top row empty
		}
		clearedLines++; //Add one to the cleared line counter
		if(clearedLines % nextLevelLines == 0) { //If a spesific number of rows have been cleaned increase the level
			level++;
			timeForFall = 100000 / (speed + level * 20);
		}
	}
	
	this.clearRow = function(row) {
		for(dC = 0; dC < cols; dC++) { //Lower every column above the cleared row
			this.grid[dC][row] = 0; //Overwrite the previous column
		}
	}
	
	this.dropping = function() {
		this.dropScale = 1.00;
		if(this.droppingTime == null) {
			this.droppingTime = millis();
		}
		if(this.droppingTime + timeForFall <= millis()) {
			for(i = this.droppingLines.length - 1; i >= 0; i--) {
				this._doDrop(this.droppingLines[i]);
			}
			gameState = "RUNNING";
			colided = false;
			fig = new Figure();
			this.droppingTime = null;
			this.droppingLines = new Array();
		} else {
			this.dropScale = 1 - (millis() - this.droppingTime) / timeForFall;
			fill("#FFFFFF");
			for(i = 0; i < this.droppingLines.length; i++) {
				for(c = 0; c < cols; c++) {
					rect(c * gScale + borderSmall + (1 - this.dropScale) * maxBorder,
						this.droppingLines[i] * gScale + borderSmall + (1 - this.dropScale) * maxBorder,
						squareSize * this.dropScale,
						squareSize * this.dropScale);
				}
			}
		}
	}
}

//129731