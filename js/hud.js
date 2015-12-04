this.Hud = function(){ 

	this.keyboard = new Keyboard();

	this.mouseIsDown = false;

	this.fpsGraph = new Graph('fps', "rgba(0,255,0,1)");
	this.gpsGraph = new Graph('gps', "rgba(255,153,0,1)");
	this.cellGraph = new Graph('livecell', "rgba(127,127,127,1)");
	this.genGraph = new Graph('gen');
	
	this.cellGraph.refresh();
	this.genGraph.graph = false;

	this.genGraph.refresh();

	monitor = function(){
		gol.hud.fpsGraph.refresh();
		gol.hud.fpsGraph.currentCount = 0;
		gol.hud.gpsGraph.refresh();
		gol.hud.gpsGraph.currentCount = 0;
		setTimeout(this.monitor, 1000);
	}

	this.init = function(){
		this.tools = new Tools();

		monitor();
		document.addEventListener( 'mousemove', this.mouseMove, true );

		document.getElementById('canvasTools').addEventListener( 'mousedown', this.mouseDown, true );
		document.getElementById('canvasTools').addEventListener( 'mouseup', this.mouseUp, true );
		
		document.getElementById('canvasTools').addEventListener("wheel", this.mouseWheel, false);
		document.getElementById('canvasTools').addEventListener("DOMMouseScroll", this.mouseWheel, false);
		
		//ZOOM
		document.getElementById('zoomin').addEventListener('mousedown', gol.hud.zoomin, true);
		document.getElementById('zoomout').addEventListener('mousedown', gol.hud.zoomout, true);
		document.getElementById('movehand').addEventListener('mousedown', gol.hud.move, true);
		
		//HISTORY
		document.getElementById('lastsave').addEventListener('mousedown', gol.mapLib.lastSave, true);
		document.getElementById('fastsave').addEventListener('mousedown', gol.mapLib.fastSave, true);
		document.getElementById('history').addEventListener('mousedown', gol.mapLib.historyBack, true);

		//CONTROL
		document.getElementById('pause').addEventListener('mousedown', this.pause, true);
		document.getElementById('play').addEventListener('mousedown', this.play, true);
		document.getElementById('onestep').addEventListener('mousedown', this.onestep, true);
		document.getElementById('speed').addEventListener('input', this.speed, true);

		//OPTIONS
		document.getElementById('fullscreen').addEventListener('mouseup', this.fullscreen, true);
		document.getElementById('drawtrail').addEventListener('mousedown', this.drawtrail, true);
		document.getElementById('showcell').addEventListener('mousedown', this.showcell, true);
		document.getElementById('showrulers').addEventListener('mousedown', this.showrulers, true);
		document.getElementById('showgrid').addEventListener('mousedown', this.showgrid, true);
		document.getElementById('bugbutton').addEventListener('mousedown', this.report, true);

		//MONITOR
		document.getElementById('displaygen').addEventListener('mousedown', this.displayGen, true);
		document.getElementById('displaycell').addEventListener('mousedown', this.displayCell, true);
		document.getElementById('displaygens').addEventListener('mousedown', this.displayGenS, true);
		document.getElementById('displayfps').addEventListener('mousedown', this.displayFps, true);
		document.getElementById('graphcell').addEventListener('mousedown', this.graphCell, true);
		document.getElementById('graphgens').addEventListener('mousedown', this.graphGenS, true);
		document.getElementById('graphfps').addEventListener('mousedown', this.graphFps, true);
		document.getElementById('biggen').addEventListener('mousedown', this.bigGen, true);
		document.getElementById('bigcell').addEventListener('mousedown', this.bigCell, true);
		document.getElementById('biggens').addEventListener('mousedown', this.bigGenS, true);
		document.getElementById('bigfps').addEventListener('mousedown', this.bigFps, true);

		//TOOLS
		document.getElementById('pentool').addEventListener('mousedown', this.pentool, true);
		document.getElementById('selectortool').addEventListener('mousedown', this.selectortool, true);

		//PATTERN TOOL
		document.getElementById('nextgenpattern').addEventListener('mousedown', this.nextGenPattern, true);
		document.getElementById('turnpatternclockwise').addEventListener('mousedown', this.turnpatternclockwise, true);
		document.getElementById('turnpatternanticlockwise').addEventListener('mousedown', this.turnpatternanticlockwise, true);
		document.getElementById('mirroringpatternx').addEventListener('mousedown', this.mirroringpatternx, true);
		document.getElementById('mirroringpatterny').addEventListener('mousedown', this.mirroringpatterny, true);
		
		//SELECTION TOOL
		document.getElementById('saveselection').addEventListener('mousedown', this.saveselection, true);
		document.getElementById('okaysavepattern').addEventListener('mousedown', this.okaysave, true);
		document.getElementById('cancelsavepattern').addEventListener('mousedown', this.cancelsave, true);
		document.getElementById('erasezone').addEventListener('mousedown', this.erasezone, true);
		document.getElementById('cut').addEventListener('mousedown', this.cut, true);

		//MAP
		document.getElementById('new').addEventListener('mousedown', this.newFile, true);
		document.getElementById('cancelnewmap').addEventListener('mousedown', this.cancelSaveMap, true);
		document.getElementById('export').addEventListener('mousedown', this.displayExportMap, true);
		document.getElementById('import').addEventListener('mousedown', this.displayInportMap, true);

		document.oncontextmenu = new Function("return false");

	}
	
	this.report=function(){
			document.getElementById('masque').style.display = "block";
			document.getElementById('report').style.display = "block";
	}
	
	this.sendReport=function(){
msg = document.getElementById('reportInput').value;

 			document.getElementById('masque').style.display = "none";
			document.getElementById('report').style.display = "none";

			var data = "action=report&type=report&msg="+msg;
			ajax('ajaxSocket', data);
	}
	this.fullscreen = function(){
		screenfull.toggle();
	}

	this.displayGen = function(){
		gol.hud.genGraph.display();
	}

	this.displayCell = function(){
		gol.hud.cellGraph.display();
	}

	this.displayGenS = function(){
		gol.hud.gpsGraph.display();
	}

	this.displayFps = function(){
		gol.hud.fpsGraph.display();
	}

	this.graphCell = function(){
		gol.hud.cellGraph.displayGraph();
		gol.hud.cellGraph.refresh();
	}

	this.graphGenS = function(){
		gol.hud.gpsGraph.displayGraph();
		gol.hud.gpsGraph.refresh();
	}

	this.graphFps = function(){
		gol.hud.fpsGraph.displayGraph();
		gol.hud.fpsGraph.refresh();
	}
	this.bigGen = function(){
		gol.hud.genGraph.displayBig();
	}
	this.bigCell = function(){
		gol.hud.cellGraph.displayBig();
	}

	this.bigGenS = function(){
		gol.hud.gpsGraph.displayBig();
	}

	this.bigFps = function(){
		gol.hud.fpsGraph.displayBig();
	}

	this.speed = function(event){
		gol.speed= 2000-event.target.value;

		if(gol.speed != 0){
			document.getElementById('legendspeed').innerHTML = "SPEED :<br>"+(1000/gol.speed).toFixed(1)+" Gen/s";
		}else{
			document.getElementById('legendspeed').innerHTML = "SPEED :<br>MAX";
		}
	}

	this.patternClick = function(name){ 
		gol.hud.tools.changeTool("pattern");
		gol.hud.tools.currentTool.loadLib(name);
	}


	this.pentool = function(){ 
		gol.hud.tools.changeTool("pen");
	}

	this.selectortool = function(){ 
		gol.hud.tools.changeTool("selector");
	}

	this.nextGenPattern = function(){ 
		gol.hud.tools.currentTool.nextGenPattern();
	}

	this.turnpatternclockwise = function(){ 
		gol.matricePattern.turnMatrice("clockwise");
		gol.hud.displayMsg.initMsg('CLOCKWISE ROTATION');
		gol.drawCanvasTools();

	}
	this.turnpatternanticlockwise = function(){ 
		gol.matricePattern.turnMatrice("anticlockwise");
		gol.hud.displayMsg.initMsg('ANTICLOCKWISE ROTATION');
		gol.drawCanvasTools();

	}

	this.mirroringpatternx = function(){ 
		gol.matricePattern.mirroringMatrice("x");
		gol.hud.displayMsg.initMsg('MIRRORING VERTICALLY');
		gol.drawCanvasTools();

	}
	this.mirroringpatterny = function(){ 
		gol.matricePattern.mirroringMatrice("y");
		gol.hud.displayMsg.initMsg('MIRRORING HORIZONTALLY');
		gol.drawCanvasTools();

	}

	this.saveselection = function(){
		gol.hud.tools.currentTool.saveSelection();
		gol.hud.tools.currentTool.selection.getSize();
		if(gol.hud.tools.currentTool.selection.width == 0 || gol.hud.tools.currentTool.selection.height == 0 || gol.selection.state == false){
			gol.hud.displayMsg.initMsg("YOU CAN'T SAVE AN EMPTY SELECTION");
		}else{
			img = document.getElementById('patternviewer');
			img.innerHTML="";
			insertImgFromMatrice(gol.hud.tools.currentTool.selection, 230, img);

			document.getElementById('masque').style.display = "block";
			document.getElementById('pattern').style.zIndex = "400";

			document.getElementById('quickfixpattern').style.display = "none";
			document.getElementById('showpattern').style.opacity = "1";
			document.getElementById('showpattern').style.width = "383px";
			document.getElementById('showpattern').style.height = "100%";
			document.getElementById('perso').style.color = "white";
			document.getElementById('persoliste').style.display = "block";
			document.getElementById('patternSaver').style.display = "block";

			document.getElementById('patternsavername').value = "PATTERN NAME";
			document.getElementById('patternsavername').style.border = "2px solid white";
			document.getElementById('patternsavername').style.color = "white";
		}
	}

	this.cancelsave = function(){
		document.getElementById('masque').style.display = "";
		document.getElementById('pattern').style.zIndex = "";

		document.getElementById('quickfixpattern').style.display = "";
		document.getElementById('showpattern').style.width = "";
		document.getElementById('showpattern').style.height = "";
		document.getElementById('showpattern').style.opacity = "";
		document.getElementById('perso').style.color = "";
		document.getElementById('persoliste').style.display = "";
		document.getElementById('patternSaver').style.display = "";
	}

	this.okaysave = function(){ 
		name = document.getElementById('patternsavername').value;
		pattern = gol.hud.tools.currentTool.selection;
		if(gol.patternLib.savePattern(pattern, name)){
			gol.hud.creatPatternElement(pattern, name);
			gol.hud.displayMsg.initMsg('PATTERN '+slotId+' SAVED');

		}else{
			document.getElementById('patternsavername').style.border = "2px solid red"
			document.getElementById('patternsavername').style.color = "red"
		}
	}

	this.creatPatternElement = function(pattern, name){
		document.getElementById('patternsavername').style.border = "2px solid white"
		document.getElementById('patternsavername').style.color = "white"
		gol.hud.cancelsave();
		document.getElementById('nosaveyet').innerHTML ="";
		mainDiv = document.createElement("div");
		mainDiv.className = "patterndiv";
		mainDiv.id = "PersoPattern-"+name;
		document.getElementById('persoliste').appendChild(mainDiv);
		patternDiv = document.createElement("div");
		patternDiv.className = "pattern_select";
		mainDiv.appendChild(patternDiv);
		insertImgFromMatrice(pattern, 60, patternDiv);
		span = document.createElement("span");
		span.innerHTML = name;
		mainDiv.appendChild(span);
		mainDiv.setAttribute('onClick', "gol.hud.patternClick('perso"+name+"')");
	}


	this.erasezone = function(){
		gol.hud.tools.currentTool.eraseZone();
		gol.drawCanvasMap();
	}

	this.cut = function(){ 
		gol.hud.tools.currentTool.cut();
		gol.drawCanvasTools();
	}

	this.newFile = function(mapToLoad){ 
		document.getElementById('masque').style.display = "block";
		document.getElementById('file').style.zIndex = "400";

		gol.pause();
		document.getElementById('quickfixfile').style.display ="none";
		document.getElementById('showfile').style.opacity = "1";
		document.getElementById('showfile').style.width = "383px";
		document.getElementById('showfile').style.height = "100%";

		document.getElementById('save').style.color = "white";
		document.getElementById('savefile').style.display = "block";
		document.getElementById('loadfile').style.display = "none";

		document.getElementById("newfile").style.display = "block";


		if(mapToLoad >=0 && mapToLoad <= 9){
			document.getElementById('alerttitle').innerHTML = "LOAD SLOT MAP N°"+mapToLoad;
			document.getElementById('okaynewmap').setAttribute('onclick', 'gol.reset();gol.hud.cancelSaveMap();gol.mapLib.load('+mapToLoad+');');

		}else{
			document.getElementById('alerttitle').innerHTML = "NEW EMPTY MAP";
			document.getElementById('okaynewmap').setAttribute('onclick', 'gol.reset();gol.hud.cancelSaveMap();');
		}
	}

	this.cancelSaveMap = function(){
		document.getElementById('masque').style.display = "";
		document.getElementById('file').style.zIndex = "";

		document.getElementById('quickfixfile').style.display = "";
		document.getElementById('showfile').style.opacity = "";
		document.getElementById('showfile').style.width = "";
		document.getElementById('showfile').style.height = "";
		
		document.getElementById('save').style.color = "";
		document.getElementById('savefile').style.display = "";
		document.getElementById('loadfile').style.display = "";

		document.getElementById('newfile').style .display= "";

	}

	this.saveMap = function(slot, mapName, matrice){
		var imgmatrice = new Matrice();
		imgmatrice.fusion("alive", matrice, 0, 0);
		imgmatrice.normalise();


		slotId = slot.id;
		slot.children[0].style.display = "none";
		slot.children[1].style.opacity = "1";
		slot.children[1].style.color = "white";
		slot.children[1].style.marginLeft = "-67.5px";
		slot.children[4].style.color = "white";

		slot.children[4].innerHTML = "["+imgmatrice.width+"*"+imgmatrice.height+"]";

		slot.children[1].value = mapName;

		slotsLoad = document.getElementsByClassName('slotmap load');

		slotsLoad.namedItem(slotId).children[0].innerHTML = mapName;
		slotsLoad.namedItem(slotId).style.color = "white";

		slot.children[5].innerHTML = "";
		insertImgFromMatrice(imgmatrice, 350, slot.children[5]);

		slotsLoad.namedItem(slotId).children[1].innerHTML = "";
		insertImgFromMatrice(imgmatrice, 350, slotsLoad.namedItem(slotId).children[1]);
		gol.hud.displayMsg.initMsg("SLOT "+slotId+" SAVED");

	}

	this.loadMap = function(slot){
	}

	this.deleteMap = function(slot){
		slot = slot.parentElement;
		slotId = slot.id;

		gol.hud.displayMsg.initMsg("SLOT "+slotId+" DELETED");
		gol.mapLib.deleteMap(slotId);

		slot.children[0].style.display = "block";

		slot.children[1].style.opacity = "";
		slot.children[1].style.color = "";
		slot.children[1].style.marginLeft = "";
		slot.children[4].style.color = "";
		slot.children[4].innerHTML = "[EMPTY]";

		slot.children[1].value = "Type map name here";
		slot.children[5].innerHTML = "";

		slotsLoad = document.getElementsByClassName('slotmap load');
		slotsLoad.namedItem(slotId).children[0].innerHTML = "SLOT "+slotId;
		slotsLoad.namedItem(slotId).style.color = "";
		slotsLoad.namedItem(slotId).children[1].innerHTML = "";

	}

	this.displayExportMap = function(slot){

		var imgmatrice = new Matrice();

		imgmatrice.fusion("alive", gol.matriceMap, 0, 0);
		imgmatrice.normalise();

		if(imgmatrice.width == "0" && imgmatrice.height == "0"){
			gol.hud.displayMsg.initMsg("YOU CAN'T EXPORT AN EMPTY MAP");
		}else{
			document.getElementById('masque').style.display = "block";
			document.getElementById('exportmapviewer').innerHTML = "";
			document.getElementById('exportmapmapname').value = "MAP NAME";

			insertImgFromMatrice(imgmatrice, 230, document.getElementById('exportmapviewer'));

			document.getElementById('exportmap').style.display = "block";
		}
	}

	this.exportMap = function(){
		mapName = document.getElementById('exportmapmapname').value;
		authorName = document.getElementById('exportmapauthorname').value;


		gol.matriceMap.getSize();

		var data = "action=save&type=map&mapname="+mapName+"&authorname="+authorName+"&livecell="+gol.hud.cellGraph.currentCount+"&width="+gol.matriceMap.width+"&height="+gol.matriceMap.height+"&map="+JSON.stringify(gol.matriceMap.map);
		ajax('ajaxSocket', data);

	}

	this.exportMapResult = function(result, lastId){
		if(result == "allOkay"){
			document.getElementById('sharemap').style.display = "block";
			document.getElementById('urlmap').innerHTML = 'http://code141.fr/projects/gameoflife/?loadMap='+lastId;




			gol.hud.displayMsg.initMsg("CURRENT MAP EXPORTED");
			document.getElementById('exportmap').style.display = "none";
		}
	}

	this.displayInportMap = function(){
		gol.pause();
		document.getElementById('importmap').style.display = "block";

		var data = "action=load&type=mapliste";

		ajax('allmap', data);	
	}

	this.importMapList = function(id, name, author, star, nbvote, date, version, livecell, width, height, map){
		var current = new Matrice();
		current.map = JSON.parse(map);
		current.normalise();

		mainDiv = document.createElement("div");
		mainDiv.className = "bddmap";
		mainDiv.id = "map_"+id;
		document.getElementById('allmap').appendChild(mainDiv);

		mainDiv.innerHTML = '<div class="bddmapimg button" id="mapImg_'+id+'" onMouseDown="gol.hud.importMap('+id+')"></div>';
		
		div = document.getElementById('mapImg_'+id);
		insertImgFromMatrice(current, 200, div);

		p = document.createElement("p");
		p.innerHTML = '<span class="mapnamelist">'+name+'</span><br>by '+author+'<br>'+star+' Stars - '+nbvote+' Votes<br>'+date;
		mainDiv.appendChild(p);
		
		mapP = document.createElement("p");
		mapP.id = "map_map_"+id;
		mapP.style.display = "none";
		mapP.innerHTML = map;
		mainDiv.appendChild(mapP);

	}





	this.importMap = function(id, valid){
		if(valid == undefined){
			document.getElementById("importmap").style.display = "none";
			document.getElementById('masque').style.display = "block";
			document.getElementById('file').style.zIndex = "400";

			gol.pause();
			document.getElementById('quickfixfile').style.display ="none";
			document.getElementById('showfile').style.opacity = "1";
			document.getElementById('showfile').style.width = "383px";
			document.getElementById('showfile').style.height = "100%";

			document.getElementById('save').style.color = "white";
			document.getElementById('savefile').style.display = "block";
			document.getElementById('loadfile').style.display = "none";
			document.getElementById("newfile").style.display = "block";

			document.getElementById('alerttitle').innerHTML = "IMPORT MAP ID°"+id;
			document.getElementById('okaynewmap').setAttribute('onclick', 'gol.hud.cancelSaveMap();gol.hud.importMap('+id+', true);');
		}else{

			gol.reset();
			map = document.getElementById("map_map_"+id).innerHTML;
			gol.matriceMap.map = JSON.parse(map);
			gol.hud.displayMsg.initMsg("MAP ID : "+id+" IMPORTED");
			gol.drawCanvasMap();
		}
	}


	this.zoomin = function(){ 
		gol.zoom(1);
		gol.hud.displayMsg.initMsg('ZOOM IN');

	}
	this.zoomout = function(){ 
		gol.zoom(-1);
		gol.hud.displayMsg.initMsg('ZOOM OUT');

	}

	this.move = function(){
		if(!gol.moveHand){
			gol.moveHand = !gol.moveHand;
			document.getElementById("movehand").style.opacity = "1";
			document.body.style.cursor = "grab";
		}else{
			gol.moveHand = !gol.moveHand;
			document.getElementById("movehand").style.opacity = "";
			document.body.style.cursor = "auto";
		}
	}


	this.pause = function(){ 
		gol.pause();
	}

	this.play = function(){ 
		gol.play();
	}

	this.onestep = function(){ 
		gol.oneStepRun();
	}

	this.drawtrail = function(){ 
		if(gol.drawTrail){
			gol.drawTrail = false;
		}else{
			gol.drawTrail = true;
		}
		gol.redrawGrid = true;
	}

	this.showcell = function(){ 
		if(gol.showCell){
			gol.showCell = false;
		}else{
			gol.showCell = true;
		}
	}

	this.showrulers = function(){ 
		if(gol.rulers){
			gol.rulers = false;
		}else{
			gol.rulers = true;
		}
		gol.drawCanvasGrid();
	}
	this.showgrid = function(){ 
		if(gol.grid){
			gol.grid = false;
		}else{
			gol.grid = true;
		}
		gol.drawCanvasGrid();
	}

	this.mouseDown = function(event) {
		gol.hud.mouseIsDown = true;

			if(gol.hud.keyboard.keys["espace"] != true && gol.moveHand != true){
				gol.hud.tools.click();
			}

		gol.mouse.lastRawClickX = event.clientX;
		gol.mouse.lastRawClickY = event.clientY;

	}

	this.mouseUp = function(event) {
		gol.hud.mouseIsDown = false;
		gol.hud.tools.release();
	}

	this.mouseMove = function(mouse){
		if(mouse.target.id == "canvasTools"){
			gol.cellMousePosition(mouse);
			gol.mouse.state = true;

			if(gol.hud.keyboard.keys["espace"] == true || gol.moveHand == true){
				if(gol.hud.mouseIsDown){
					x = mouse.clientX-gol.mouse.lastRawClickX;
					y = mouse.clientY-gol.mouse.lastRawClickY;
					gol.move(x,y);
					gol.mouse.lastRawClickX = mouse.clientX;
					gol.mouse.lastRawClickY = mouse.clientY;
				}
			}else{
				gol.hud.tools.mouseMove();

			}
			gol.drawCanvasTools();

		}else{
			gol.mouse.state = false;
			
			currentCenterX = (-gol.cameraX)/gol.gridSize;
			currentCenterY = (-gol.cameraY)/gol.gridSize;
			gol.mouse.row = currentCenterY;
			gol.mouse.col = currentCenterX;
			gol.drawCanvasTools();
		}
	}

	this.mouseWheel = function(mouse) {
		// cross-browser wheel delta

		gol.mouseZoom(mouse);
		return false;
	}

	this.showOptions = function(wichOptions, show){
		
		document.getElementById('toolboxoptions').style.display = "none";
		optliste = document.getElementById('toolboxoptions').children;

		for( var i = 0; i<optliste.length; i++){
			optliste[i].style.display = "none";
		}

		if(show){
			if(wichOptions == "patternTool"){
				document.getElementById('toolboxoptions').style.display = "block";
				document.getElementById('patternoptions').style.display = "block";
			}else if(wichOptions == "selectorTool"){
				document.getElementById('toolboxoptions').style.display = "block";
				document.getElementById('selectoroptions').style.display = "block";
			}else if(wichOptions == "brushTool"){
				document.getElementById('toolboxoptions').style.display = "block";
				document.getElementById('brushoptions').style.display = "block";
			}
		}
	}

	this.displayMsg = new MessageDisplayer();

}

Keyboard = function(){ 
	that = this;
	this.keys = new Array();

	this.keyDown = function(event) {

		if(gol.mouse.state){
		if(event.key == " "){key = "espace";}else{key=event.key}
		that.keys[key] = true;
		that.shortKey(key);
		gol.hud.tools.key(key);
}
	}

	this.keyUp = function(event) {
		if(event.key == " "){key = "espace";}else{key=event.key}
		that.keys[key] = false;
	}

	this.shortKey = function(key){
		switch(key) {
			case "s":
			gol.startStop();
			break;
			case "S":
			gol.oneStepRun();
			break;
			case "a":
			gol.hud.tools.changeTool("selector");
			break;
			case "z":
			gol.hud.tools.changeTool("pen");
			break;
			case "r":
			gol.hud.newFile();
			break;
			case "m":
			gol.mapLib.fastSave();
			break;
			case "l":
			gol.mapLib.lastSave();
			break;
			case "h":
			gol.mapLib.historyBack();
			break;
			}
	}

	document.addEventListener("keydown", this.keyDown, false);
	document.addEventListener("keyup", this.keyUp, false);
}



MessageDisplayer = function(){
	this.initMsg = function(msg){
		clearTimeout(this.timeout);
		this.time = 2000;
		this.msg = msg;		
		document.getElementById('displaymsg').style.opacity = 1;
		document.getElementById('displaymsg').innerHTML = this.msg;	
		document.getElementById('displaymsg').style.display = "block";
		this.timeout = setTimeout(function(){gol.hud.displayMsg.fade();}, this.time);
		this.time = 10;
	}

	this.fade = function(){
		var fade = document.getElementById('displaymsg').style.opacity;
		document.getElementById('displaymsg').style.opacity = fade/1.1;

		if(fade>=0.05){
			this.timeout = setTimeout(function(){gol.hud.displayMsg.fade();}, this.time);

		}else{
			document.getElementById('displaymsg').style.display = "none";
			document.getElementById('displaymsg').style.opacity = 1;
		}
	}
}


