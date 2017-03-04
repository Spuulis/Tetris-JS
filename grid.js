function Grid() {
	this.grid = new Array(); //Array to store playing field

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
						rect(c * scale + scale / 16,
							r * scale + scale / 16,
							scale - scale / 8,
							scale - scale / 8);
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
				this._doDrop(r); //Delete that spesific row
				this.drops++; //Add one to the drop counter
				r++; //Check the row in the same spot because the last dropped
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
		}
	}
}