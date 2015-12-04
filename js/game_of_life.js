game_of_life = function() {

	this.speed = 0;
	this.runstate = false;

	this.drawTrail = true;
	this.grid = true;
	this.rulers = true;
	this.showCell = true;
	this.moveHand = false;

	this.mouse = {state: false, row: "?", col: "?"};
	this.selection = {state: false, startRow: "?", startCol: "?", endRow: "?", endCol: "?"};
	this.currentTool = null;

	this.canvasGrid = new Canvas("canvasGrid");
	this.canvasTrails = new Canvas("canvasTrails");
	this.canvasMap = new Canvas("canvasMap");
	this.canvasTools = new Canvas("canvasTools");
	this.process = new Processor();
	this.patternLib = new PatternLib();
	this.mapLib = new MapLib();
	this.hud = new Hud();

	this.matriceMap = new Matrice();
	this.matriceTrailMap = new Matrice();

	this.cellMousePosition = function(mouse){
		gol.mouse.row = Math.round(((mouse.clientY-gol.centerY-gol.cameraY)/gol.gridSize)-0.6);
		gol.mouse.col = Math.round(((mouse.clientX-gol.centerX-gol.cameraX)/gol.gridSize)-0.6);;
	}

	this.mouseZoom = function(mouse){
		delta = Math.max(-1, Math.min(1, (mouse.wheelDelta || -mouse.detail)));

		mouseDiffX = -(mouse.clientX-this.centerX)
		mouseDiffY = -(mouse.clientY-this.centerY)

		x = (mouseDiffX+this.cameraX)/this.gridSize;
		y = (mouseDiffY+this.cameraY)/this.gridSize; 

		gridDelta = (((this.gridSize))/100);
		add = delta*(gridDelta*4);

		if((this.gridSize += add)<=0.5){
			this.gridSize = 0.5;
		}else if((this.gridSize += add)>=100){
			this.gridSize = 100;
		}else{
			this.gridSize += add;
		}

		x = x*this.gridSize-(mouseDiffX+this.cameraX);
		y = y*this.gridSize-(mouseDiffY+this.cameraY); 
		this.move(x, y);
		if(delta>0){
			gol.hud.displayMsg.initMsg("ZOOM IN");
		}else{
			gol.hud.displayMsg.initMsg("ZOOM OUT");
		}
	}

	this.zoom = function(delta){
		x = this.cameraX/this.gridSize;
		y = this.cameraY/this.gridSize; 


		gridDelta = (((this.gridSize))/100);
		add = delta*(gridDelta*4);
		if((this.gridSize += add)<=0.5){
			this.gridSize = 0.5;
		}else if((this.gridSize += add)>=100){
			this.gridSize = 100;
		}else{
			this.gridSize += add;
		}

		x = x*this.gridSize-(this.cameraX);
		y = y*this.gridSize-(this.cameraY); 

		this.move(x,y);
	}
	
	this.cameraX = 0;
	this.cameraY = 0;

	this.move = function(x, y){
		gol.cameraX += x;
		gol.cameraY += y;

		this.redrawGrid = true;
		gol.animation();
	}

	this.windowSetSize = function(){
		gol.canvasWidth = window.innerWidth;
		gol.canvasHeight = window.innerHeight;

		gol.centerX = Math.round(gol.canvasWidth/2);
		gol.centerY = Math.round(gol.canvasHeight/2);

		gol.canvasTrails.htmlCanvas.width = gol.canvasWidth;
		gol.canvasTrails.htmlCanvas.height = gol.canvasHeight;

		gol.canvasGrid.htmlCanvas.width = gol.canvasWidth;
		gol.canvasGrid.htmlCanvas.height = gol.canvasHeight;

		gol.canvasMap.htmlCanvas.width = gol.canvasWidth;
		gol.canvasMap.htmlCanvas.height = gol.canvasHeight;

		gol.canvasTools.htmlCanvas.width = gol.canvasWidth;
		gol.canvasTools.htmlCanvas.height = gol.canvasHeight;
		
		gol.redrawGrid = true;
		gol.animation();

	}


	this.reset = function(){
		this.pause();
		this.gridSize = 20;
		this.padding = this.gridSize/50;
		this.cameraX = 0;
		this.cameraY = 0;

		gol.hud.tools.changeTool("pen");

		this.matricePattern = null;
		this.matriceMap = new Matrice();
		this.matriceTrailMap = new Matrice();

		gol.hud.cellGraph.currentCount = 0;
		this.hud.cellGraph.refresh();
		this.hud.genGraph.currentCount = 0;
		this.hud.genGraph.refresh();

		this.redrawGrid = true;
		gol.animation();

		gol.hud.displayMsg.initMsg('REINITIALIZED');
	}

	this.startStop = function(){
		if(this.runstate){
			this.pause();
		}else{
			this.play();
		}
	}

	this.play = function(){
		this.runstate = true;
		this.nextGeneration();
		document.getElementById('play').className = "button highlight";
		document.getElementById('pause').className = "button";
		gol.hud.displayMsg.initMsg("PLAY");

	}

	this.pause = function(){
		this.runstate = false;
		document.getElementById('play').className = "button";
		document.getElementById('pause').className = "button highlight";
		gol.hud.displayMsg.initMsg("PAUSE");

	}

	this.oneStepRun = function(){
		this.pause();
		this.nextGeneration();
		document.getElementById('play').className = "button";
		document.getElementById('pause').className = "button highlight";
		gol.hud.displayMsg.initMsg("ONE STEP");

	}


	this.invertCellState = function(row, col){
		if(this.matriceMap.readCell(row, col) == true){
			this.killCell(row, col);
		}else{
			this.creatNewCell(row, col);
		}
	}

	this.killCell = function(row, col){

		this.matriceMap.writeCell(row, col, false);
		
		this.hud.cellGraph.refresh();
		this.drawCanvasMap()
	}

	this.creatNewCell = function(row, col){
		this.matriceMap.writeCell(row, col, true);
		this.hud.cellGraph.refresh();
		this.canvasMap.drawInCell(row, col, "aliveCell");
		this.canvasTrails.drawInCell(row, col, "aliveCell");
	}

	this.importPattern = function(patternName){
		this.matricePattern = this.patternLib.get(patternName);
	}

	this.drawPattern = function(){
		this.matriceMap.fusion("alive", this.matricePattern, Math.round(this.mouse.row-this.matricePattern.height/2), Math.round(this.mouse.col-this.matricePattern.width/2));
		this.hud.cellGraph.refresh();
		this.drawCanvasMap();
	}

	this.nextGeneration = function() {
		this.mapLib.pushHistorique(this.matriceMap);
		
		if(this.drawTrail){
			this.matriceTrailMap.fusion("alive", this.matriceMap, 0, 0);
		}else{
			this.matriceTrailMap.init();
		}

		gol.hud.cellGraph.currentCount = 0;
		this.process.geoProcess(this.matriceMap);
		this.hud.cellGraph.refresh();
		
		gol.animation();
		
		this.hud.gpsGraph.currentCount++;
		this.hud.genGraph.currentCount++;
		this.hud.genGraph.refresh();

		if(this.runstate) {
			setTimeout(function(){gol.nextGeneration();}, this.speed);
		}
		

	}


	this.animation= function(){

		if(this.redrawGrid){
			this.drawCanvasGrid();
		}
		
		if(this.drawTrail){
			this.drawCanvasTrails();
		}

		this.drawCanvasMap();
		this.drawCanvasTools();
		this.hud.fpsGraph.currentCount++;
	}

	this.drawCanvasGrid = function(){
		this.redrawGrid = false;
		this.canvasGrid.cleanFrame();
		this.canvasTrails.cleanFrame();
		if(this.grid){
			this.canvasGrid.drawGrid(1, "255,255,255", 1);

		}
		if(this.rulers){
			this.canvasGrid.drawGrid(10, "0,255,0", 0.1);
			this.canvasGrid.drawGrid(50, "0,255,0", 0.1);
			this.canvasGrid.drawGrid(500, "0,255,0", 0.1);
			this.canvasGrid.drawRulers();
		}

		this.canvasTrails.drawTrails(this.matriceTrailMap);
	}

	this.drawCanvasTrails = function(){
		this.canvasTrails.drawTrails(this.matriceMap);
	}

	this.drawCanvasMap = function(){
		this.canvasMap.cleanFrame();
		this.canvasMap.drawMatrice(this.matriceMap);
	}

	this.drawCanvasTools = function(){
		this.canvasTools.cleanFrame();

		if(this.matricePattern){
			this.canvasTools.drawPattern(this.matricePattern, Math.round(this.mouse.row-this.matricePattern.height/2), Math.round(this.mouse.col-this.matricePattern.width/2));
		}
		
		if(this.selection.state){
			this.canvasTools.drawSelection();
		}
		
		if(this.mouse.state){
			this.canvasTools.drawMouse(this.currentTool);
			if(this.showCell){
				this.canvasTools.showCell();
			}
		}
	}



}



