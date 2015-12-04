MapLib = function(){

	this.slots = {};
	this.historique = new Array();
	this.lastSaveSlot = null;

	this.load = function(slotId){
		loadedMap = new Matrice();

		loadedMap.fusion("alive", this.slots[slotId].matrice, 0, 0);

		gol.matriceMap = loadedMap;
		gol.hud.displayMsg.initMsg("SLOT "+slotId+" LOADED");
		gol.drawCanvasMap();

	}

	this.loadCookies = function(cookies){
		if(JSON.parse(cookies)){

			this.slots = JSON.parse(cookies);

		}

		for(key in this.slots){

			var matriceIntoObj = new Matrice;
			matriceIntoObj.map = this.slots[key].matrice.map;
			matriceIntoObj.name = this.slots[key].matrice.name;
			matriceIntoObj.height = this.slots[key].matrice.height;
			matriceIntoObj.width = this.slots[key].matrice.width;
			matriceIntoObj.minRow = this.slots[key].matrice.minRow;
			matriceIntoObj.maxRow = this.slots[key].matrice.maxRow;
			matriceIntoObj.minCol = this.slots[key].matrice.minCol;
			matriceIntoObj.maxCol = this.slots[key].matrice.maxCol;
			
			this.slots[key].matrice = matriceIntoObj;

			slotsSave = document.getElementsByClassName('slotmap save');

			gol.hud.saveMap(slotsSave.namedItem(key), this.slots[key].matrice.name, this.slots[key].matrice);
		}
	}

	this.deleteMap = function(slotId){
		this.slots[slotId] = undefined;
		jsonedSlots = JSON.stringify(this.slots);
		createCookie("map", jsonedSlots);
	}

	this.save = function(htmlSlot){
		htmlSlot = htmlSlot.parentElement;
		slotId = htmlSlot.id;
		mapName = htmlSlot.children[1].value;

		gol.matriceMap.getSize();
		if(gol.matriceMap.width == "0" && gol.matriceMap.height == "0"){
			gol.hud.displayMsg.initMsg("YOU CAN'T SAVE AN EMPTY MAP");
		}else{

			this.slots[slotId] = {};
			this.slots[slotId].matrice = new Matrice();
			this.slots[slotId].matrice.fusion("alive", gol.matriceMap, 0, 0);
			this.slots[slotId].matrice.name = mapName;
			
			jsonedSlot = JSON.stringify(this.slots);
			createCookie("map", jsonedSlot);

			gol.hud.saveMap(htmlSlot, mapName, this.slots[slotId].matrice);
		}
	}
	this.fastSave = function(){
		gol.mapLib.lastSaveSlot = new Matrice();
		gol.mapLib.lastSaveSlot.fusion("alive", gol.matriceMap, 0, 0);
		gol.hud.displayMsg.initMsg("QUICK SAVE");
	}

	this.lastSave = function(){

		if(gol.mapLib.lastSaveSlot == null){
			gol.hud.displayMsg.initMsg("YOU DON'T HAVE MAKE QUICK SAVE YET");
		}else{
			gol.runstate = false;
			document.getElementById('play').className = "button";
			document.getElementById('pause').className = "button highlight";
			
			setTimeout(function(){
				gol.matriceMap = new Matrice();
				gol.matriceTrailMap = new Matrice();

				gol.matriceMap.fusion("alive", gol.mapLib.lastSaveSlot, 0, 0);
				gol.hud.displayMsg.initMsg("QUICK LOAD");
				gol.hud.genGraph.currentCount = 0;
				gol.hud.genGraph.refresh();
				gol.canvasTrails.cleanFrame();
				gol.animation();
			}, 100);
		}
	}

	this.pushHistorique = function(matrice){
		var matrice = matrice.map;
if (matrice.length === 0){
	alert("end");
}
		for(var i = 19; i>0; i--){
			this.historique[i] = this.historique[i-1];
		}

		this.historique[0] = matrice;

	}

	this.historyBack = function(){
		
		if(gol.mapLib.historique.length != 0){
			if(gol.mapLib.historique[0] !=undefined){

				gol.runstate = false;
				document.getElementById('play').className = "button";
				document.getElementById('pause').className = "button highlight";
				setTimeout(function(){

					gol.matriceMap.map = gol.mapLib.historique[0];

					for(var i = 0; i<gol.mapLib.historique.length; i++){
						if(gol.mapLib.historique[i+1] == undefined){
							gol.mapLib.historique.splice(i, 1);
						}
						gol.mapLib.historique[i] = gol.mapLib.historique[i+1];
					}

					gol.matriceTrailMap = new Matrice();
					gol.hud.displayMsg.initMsg("PREVIOUS GENERATION");

					gol.hud.genGraph.currentCount = 0;
					gol.hud.genGraph.refresh();

					gol.canvasTrails.cleanFrame();
					gol.animation();
				}, 100);
			}else{
			gol.hud.displayMsg.initMsg("NO MORE PREVIOUS GENERATION");				
			}
		}else{
			gol.hud.displayMsg.initMsg("NO PREVIOUS GENERATION");
		}
	}
}









