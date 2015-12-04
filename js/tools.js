
Tools = function(){
	this.currentTool = new PenTool();


	this.changeTool = function(askedTool){
		this.currentTool.exit();
		this.previousTool = this.currentTool;
		gol.currentTool = askedTool;

		switch(askedTool) {
			case "pen":
			this.currentTool = new PenTool();
			break;
			case "brush":
			this.currentTool = new BrushTool();
			break;
			case "selector":
			this.currentTool = new SelectorTool();
			break;
			case "pattern":
			this.currentTool = new PatternManipulatorTool();
			break;
		}

// KILL MOUSE MOVE PSEUDO-TOOL
		if(gol.moveHand){
			gol.moveHand = !gol.moveHand;
			document.getElementById("movehand").style.opacity = "";
			document.body.style.cursor = "auto";
		}

		gol.drawCanvasTools();
		gol.hud.displayMsg.initMsg(askedTool.toUpperCase()+" TOOL");
	}


	this.click = function(){
		this.currentTool.click();
	}

	this.release = function(){
		this.currentTool.release();
	}

	this.mouseMove = function(){
		this.currentTool.mouseMove();
	}

	this.key = function(key){
		this.currentTool.key(key);
	}

	this.exit = function(){
		this.currentTool.exit();
	}
}


PenTool = function(){

	document.getElementById('pentool').className = "button highlight";

	gol.hud.showOptions("", true);

	this.click = function(){
		gol.invertCellState(gol.mouse.row, gol.mouse.col);
	}

	this.release = function(){

	}

	this.mouseMove = function(){
		if(gol.hud.mouseIsDown){
			gol.creatNewCell(gol.mouse.row, gol.mouse.col);
		}
	}
	this.key = function(key){
		if(key == ""){
		}
	}	
	this.exit = function(){
		document.getElementById('pentool').className = "button";

	}
}

BrushTool = function(){
	document.getElementById('brushtool').className = "button highlight";
	gol.hud.showOptions("brushTool", true);

	this.click = function(){
		gol.invertCellState(gol.mouse.row, gol.mouse.col);
	}

	this.release = function(){

	}

	this.mouseMove = function(){
		if(gol.hud.mouseIsDown){
			gol.creatNewCell(gol.mouse.row, gol.mouse.col);
		}
	}
	this.key = function(key){
		if(key == ""){
		}
	}	
	this.exit = function(){
		document.getElementById('brushtool').className = "button";

	}
}

SelectorTool = function(){
	document.getElementById('selectortool').className = "button highlight";

	gol.hud.showOptions("selectorTool", true);

	this.startCol=0;
	this.startRow=0;
	this.endCol=0;
	this.endRow=0;

	this.click = function(){
		this.startCol=gol.mouse.col;
		this.startRow=gol.mouse.row;
		this.endCol=gol.mouse.col;
		this.endRow=gol.mouse.row;

		if(this.startCol<this.endCol){
			startCol = this.startCol;
			endCol = this.endCol;
		}else{
			startCol = this.endCol;
			endCol = this.startCol;
		}
		if(this.startRow<this.endRow){
			startRow = this.startRow;
			endRow = this.endRow;
		}else{
			startRow = this.endRow;
			endRow = this.startRow;
		}

		gol.selection.startCol = startCol ;
		gol.selection.startRow = startRow ;
		gol.selection.endCol = endCol; 
		gol.selection.endRow = endRow ;
		gol.selection.state = true;
	}
	
	this.release = function(){

		//gol.drawPattern();
		//gol.selection.state = false;
		//gol.matricePattern.map = gol.matriceMap.extract(startY,startX,endY,endX).map;
	}

	this.mouseMove = function(){
		if(gol.hud.mouseIsDown){
			this.endCol=gol.mouse.col;
			this.endRow=gol.mouse.row;

			if(this.startCol<this.endCol){
				startCol = this.startCol;
				endCol = this.endCol;
			}else{
				startCol = this.endCol;
				endCol = this.startCol;
			}
			if(this.startRow<this.endRow){
				startRow = this.startRow;
				endRow = this.endRow;
			}else{
				startRow = this.endRow;
				endRow = this.startRow;
			}

			gol.selection.startCol = startCol ;
			gol.selection.startRow = startRow ;
			gol.selection.endCol = endCol; 
			gol.selection.endRow = endRow ;
		}
	}

	this.saveSelection = function(){
		gol.pause();
		this.selection = gol.matriceMap.extract(gol.selection.startRow, gol.selection.startCol, gol.selection.endRow, gol.selection.endCol);
	}

	this.eraseZone = function(){
		this.selection = gol.matriceMap.extract(gol.selection.startRow, gol.selection.startCol, gol.selection.endRow, gol.selection.endCol);
		gol.hud.tools.currentTool.selection.getSize();
		if(gol.hud.tools.currentTool.selection.width == 0 || gol.hud.tools.currentTool.selection.height == 0 || gol.selection.state == false){
			gol.hud.displayMsg.initMsg("YOU CAN'T ERASE AN EMPTY SELECTION");
		}else{

			gol.matriceMap.eraseZone(gol.selection.startRow, gol.selection.startCol, gol.selection.endRow, gol.selection.endCol);
		}
	}

	this.cut = function(){
		this.selection = gol.matriceMap.extract(gol.selection.startRow, gol.selection.startCol, gol.selection.endRow, gol.selection.endCol);
		gol.hud.tools.currentTool.selection.getSize();
		if(gol.hud.tools.currentTool.selection.width == 0 || gol.hud.tools.currentTool.selection.height == 0 || gol.selection.state == false){
			gol.hud.displayMsg.initMsg("YOU CAN'T CUT AN EMPTY SELECTION");
		}else{
			gol.matricePattern = this.selection;
			gol.hud.tools.changeTool("pattern");
		}
	}
	this.key = function(key){
		if(key == ""){
		}
	}	
	this.exit = function(){
		gol.selection.startCol = 0 ;
		gol.selection.startRow = 0 ;
		gol.selection.endCol = 0; 
		gol.selection.endRow = 0 ;

		gol.selection.state = false;
		document.getElementById('selectortool').className = "button";
	}

}

PatternManipulatorTool = function(){
	gol.hud.showOptions("patternTool", true);

	this.loadLib = function(patternToLoad){
		gol.importPattern(patternToLoad);
	}

	this.click = function(){
		// PATTERN WRITE
		gol.drawPattern();
	}

	this.release = function(){

	}
	this.nextGenPattern = function(){
		gol.process.geoProcess(gol.matricePattern);
		gol.matricePattern.normalise();
		gol.drawCanvasTools();
		gol.hud.displayMsg.initMsg("APPLY NEXT GENERATION ON PATTERN ");
	}

	this.key = function(key){
		if(key == "n"){
			this.nextGenPattern();
		}
	}	

	this.mouseMove = function(){

	}

	this.exit = function(){
		gol.matricePattern = null;
	}

}

MapDisplacementTool = function(){
	this.click = function(){
	}

	this.release = function(){

	}

	this.mouseMove = function(){

	}
	
	this.key = function(key){
		if(key == ""){
		}
	}	

	this.exit = function(){

	}
}






