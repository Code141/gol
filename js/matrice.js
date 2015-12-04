Matrice = function(){

	this.init = function(){
		this.map = {};
		
		this.name = null;

		this.height = 0;
		this.width = 0;

		this.minRow = 0,
		this.maxRow = 0;
		this.minCol = 0,
		this.maxCol = 0;
	}

	this.init();


	this.readCell = function(row, col){
		if(this.map[row] == undefined){
			return false;
		}else{
			if(this.map[row][col] == undefined){
				return false;
			}else if (this.map[row][col]){
				return true;
			}else{

				return false;
			}
		}
	}

	this.writeCell = function(row, col, state){
		if(state){

			if(this.map[row] == undefined){
				this.map[row] = {};
			}
			if(this.map[row][col] == undefined){
				this.map[row][col] = {};
			}
			if(this.map[row][col] != true){
				gol.hud.cellGraph.currentCount++;
				this.map[row][col] = true;
			}
		}else{
			this.map[row][col] = false;
			gol.hud.cellGraph.currentCount--;
		}
	}

	this.fusion = function(type, matrice, start_x, start_y) {
		for (var row in matrice.map) {
			row = parseInt(row);
			for (var col in matrice.map[row]) {
				col = parseInt(col);

				if(type == "alive"){
					if(matrice.map[row][col]){
						rowToWrite = start_x + row;
						colToWrite = start_y + col;
						this.writeCell(rowToWrite, colToWrite, true);
					}
				}else if(type == "dead"){
					if(!matrice.map[row][col]){
						rowToWrite = start_x + row-(Math.round(matrice.height/2)-1);
						colToWrite = start_y + col-(Math.round(matrice.width/2)-1);
						this.writeCell(rowToWrite, colToWrite, false);
					}
				}
			}
		}
	}

	this.turnMatrice = function(direction) {

		newWidth = this.height;
		newHeight = this.width;
		newMap = {};

		for (var row in this.map) {
			row = parseInt(row);

			for (var col in this.map[row]) {
				col = parseInt(col);
				if(direction == "clockwise"){
					if(newMap[col] == undefined){
						newMap[col] = {};
					}
					newMap[col][this.height-row-1] = this.map[row][col];
				}else if(direction == "anticlockwise"){
					if(newMap[this.width-col-1] == undefined){
						newMap[this.width-col-1] = {};
					}
					newMap[this.width-col-1][row] = this.map[row][col];
				}
			}
		}

		this.map = newMap;
		this.height = newHeight;
		this.width = newWidth;

	}

	this.mirroringMatrice = function(direction) {
		newMap = {};
		
		for (var row in this.map) {
			row = parseInt(row);
			for (var col in this.map[row]) {
				col = parseInt(col);

				if(direction == "x"){
					if(newMap[this.height-1-row] == undefined){
						newMap[this.height-1-row] = {};
					}
					newMap[this.height-1-row][col] = this.map[row][col];
				}else if(direction == "y"){
					if(newMap[row] == undefined){
						newMap[row] = {};
					}
					newMap[row][this.width-1-col] = this.map[row][col];
				}
			}
		}

		this.map = newMap;
	}

	this.eraseZone = function(startRow, startCol, endRow, endCol){
		for (var row in this.map) {
			row = parseInt(row);
			for (var col in this.map[row]) {
				col = parseInt(col);
				
				if(row >= startRow && row <= endRow){
					if(col >= startCol && col <= endCol){
						if(this.readCell(row, col)){
							this.writeCell(row, col, false);
						}
					}
				}
			}
		}
	}

	this.extract = function(startRow, startCol, endRow, endCol){
		minRow = endRow;
		minCol = endCol;
		maxRow = 0;
		maxCol = 0;
		for (var row in this.map) {
			row = parseInt(row);
			for (var col in this.map[row]) {
				col = parseInt(col);
				if(row >= startRow && row <= endRow){
					if(col >= startCol && col <= endCol){
						if(this.readCell(row,col)){
							if(row<=minRow){minRow = row;}
							if(col<=minCol){minCol = col;}
						}
					}
				}
			}
		}

		extract = new Matrice();

		for (var row in this.map) {
			row = parseInt(row);
			for (var col in this.map[row]) {
				col = parseInt(col);
				
				if(row >= startRow && row <= endRow){
					if(col >= startCol && col <= endCol){
						if(this.readCell(row,col)){

							extract.writeCell(row-(startRow-(startRow-minRow)), col-(startCol-(startCol-minCol)), true);

							if(row-(startRow-(startRow-minRow))>=maxRow){maxRow = row-(startRow-(startRow-minRow));}
							if(col-(startCol-(startCol-minCol))>=maxCol){maxCol = col-(startCol-(startCol-minCol));}

						}
					}
				}
			}
		}

		extract.height = maxRow+1;
		extract.width = maxCol+1

		return extract;
	}

	this.getSize = function(){
		rows = new Array();
		cols = new Array();
		
		for (var row in this.map) {
			row = parseInt(row);
			rows.push(row);
			for (var col in this.map[row]) {
				col = parseInt(col);
				cols.push(col);
			}
		}

		this.minRow = Math.min.apply(null, rows),
		this.maxRow = Math.max.apply(null, rows);
		this.minCol = Math.min.apply(null, cols),
		this.maxCol = Math.max.apply(null, cols);
		
		this.height = this.maxRow-this.minRow+1;
		this.width = this.maxCol-this.minCol+1;

		if(this.height == Infinity || this.height == -Infinity){
			this.height = 0;
		}

		if(this.width == Infinity || this.width == -Infinity){
			this.width = 0;
		}
	}

	this.normalise = function(){
		this.getSize();
		var normalised = new Matrice();

		for (var row in this.map) {
			row = parseInt(row);
			for (var col in this.map[row]) {
				col = parseInt(col);
				if(this.readCell(row, col)){
					normalised.writeCell(row-this.minRow, col-this.minCol, true);
				}
			}
		}
		this.map = normalised.map;
		this.getSize();
	}
}
