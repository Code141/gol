Processor = function(){
	this.infiniteMap = false;

	this.golRule = function(alive, nb_neighbours) {
		if(alive) {
			if(nb_neighbours == 2 || nb_neighbours == 3) 
				return true;
			else 
				return false;
		} else if(nb_neighbours == 3) {
			return true;
		}
	}

	this.generation_processor = function(matrice) {
		matriceMap = matrice.map;
		var next_map = {};
		next_map.height = matrice.height;
		next_map.width = matrice.width;
		next_map.generationLiveCell = 0;
		next_map.map = new Array(next_map.height);

		for(row = -(matrice.height/2) ; row < matrice.height/2 ; row++) {
			next_map.map[row] = new Array(next_map.width);
			for(col = -(matrice.width/2) ; col < matrice.width/2 ; col++) {

				if(this.infiniteMap){
					// PROCESS FOR INFINITE MAP
					row_t = (row == -(matrice.height/2)) ? matrice.height/2 - 1 : row - 1;
					row_b = (row == matrice.height/2 - 1) ? -(matrice.height/2) : row + 1;
					col_l = (col == -(matrice.width/2)) ? matrice.width/2 - 1 : col - 1;
					col_r = (col == matrice.width/2 - 1) ? -(matrice.width/2) : col + 1;

					tl = matriceMap[row_t][col_l];
					t = matriceMap[row_t][col];
					tr = matriceMap[row_t][col_r];
					l = matriceMap[row][col_l];
					r = matriceMap[row][col_r];
					bl = matriceMap[row_b][col_l];
					b = matriceMap[row_b][col];
					br = matriceMap[row_b][col_r];

				}else{
					// TOTALY UGLY PROCESS FOR CLOSED MAP
					if (matriceMap[row-1] != undefined){
						t = matriceMap[row-1][col];
						if (matriceMap[row-1][col-1] != undefined){
							tl = matriceMap[row-1][col-1];
						}else{
							tl = 0;
						}
						if (matriceMap[row-1][col+1] != undefined){
							tr = matriceMap[row-1][col+1];
						}else{
							tr = 0;
						}
					}else{
						t = 0;
						tl = 0;
						tr = 0;
					}
					if (matriceMap[row][col-1] != undefined){
						l = matriceMap[row][col-1];
					}else{
						l = 0;
					}
					if (matriceMap[row][col+1] != undefined){
						r = matriceMap[row][col+1];
					}else{
						r = 0;
					}
					if (matriceMap[row+1] != undefined){
						b = matriceMap[row+1][col];
						if (matriceMap[row+1][col-1] != undefined){
							bl = matriceMap[row+1][col-1];
						}else{
							bl = 0;
						}
						if (matriceMap[row+1][col+1] != undefined){
							br = matriceMap[row+1][col+1];
						}else{
							br = 0;
						}
					}else{
						b = 0;
						bl = 0;
						br = 0;
					}

				}

				nb_neighbours = (tl?1:0) + (t?1:0) + (tr?1:0) + (l?1:0) + (r?1:0) + (bl?1:0) + (b?1:0) + (br?1:0);

				alive = matriceMap[row][col];

				next_map.map[row][col] = this.golRule(alive, nb_neighbours);

				if (next_map.map[row][col]){
					next_map.generationLiveCell++;
				}

			}
		}
		return next_map;	
	}


	this.geoProcess = function(matrice){
		matriceMap = matrice.map;

		var next_map = {};

		for (var row in matriceMap) {
			row = parseInt(row);
			for (var col in matriceMap[row]) {
				col = parseInt(col);
				if(matriceMap[row][col]){
					rowT = row-1;
					rowB = row+1;
					colL = col-1;
					colR = col+1;
					if(next_map[rowT] == undefined){
						next_map[rowT] = {};
					}
					if(next_map[rowT][colL] == undefined){
						next_map[rowT][colL] = {};
						next_map[rowT][colL].nb_neighbours = 0;
					}
					if(next_map[rowT][col] == undefined){
						next_map[rowT][col] = {};
						next_map[rowT][col].nb_neighbours = 0;
					}
					if(next_map[rowT][colR] == undefined){
						next_map[rowT][colR] = {};
						next_map[rowT][colR].nb_neighbours = 0;
					}

					if(next_map[row] == undefined){
						next_map[row] = {};
					}
					if(next_map[row][colL] == undefined){
						next_map[row][colL] = {};
						next_map[row][colL].nb_neighbours = 0;
					}
					if(next_map[row][col] == undefined){
						next_map[row][col] = {};
						next_map[row][col].nb_neighbours = 0;
					}
					if(next_map[row][colR] == undefined){
						next_map[row][colR] = {};
						next_map[row][colR].nb_neighbours = 0;
					}

					if(next_map[rowB] == undefined){
						next_map[rowB] = {};
					}
					if(next_map[rowB][colL] == undefined){
						next_map[rowB][colL] = {};
						next_map[rowB][colL].nb_neighbours = 0;
					}
					if(next_map[rowB][col] == undefined){
						next_map[rowB][col] = {};
						next_map[rowB][col].nb_neighbours = 0;
					}
					if(next_map[rowB][colR] == undefined){
						next_map[rowB][colR] = {};
						next_map[rowB][colR].nb_neighbours = 0;
					}

					next_map[rowT][colL].nb_neighbours++; 
					next_map[rowT][col].nb_neighbours++; 
					next_map[rowT][colR].nb_neighbours++; 
					next_map[row][colL].nb_neighbours++; 
					next_map[row][col].alive = true;
					next_map[row][colR].nb_neighbours++; 
					next_map[rowB][colL].nb_neighbours++; 
					next_map[rowB][col].nb_neighbours++; 
					next_map[rowB][colR].nb_neighbours++;
				}
			}
		}

		matrice.init();

		for (var row in next_map) {
			for (var col in next_map[row]) {
				
				if(this.golRule(next_map[row][col].alive, next_map[row][col].nb_neighbours)){
					matrice.writeCell(row, col, true);
				}

			}
		}
	}
}