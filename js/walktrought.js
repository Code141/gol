fade = function(divName, delta, inOut){
	if(inOut == 'out'){
		document.getElementById(divName).style.opacity = delta/1000;
		if(delta>0){
			setTimeout(function(){fade(divName, delta-20, 'out');}, 1);
		}else{
			document.getElementById(divName).style.display = "none";
			document.getElementById(divName).style.opacity = 1;
		}
	}else if(inOut == 'in'){
		document.getElementById(divName).style.display = "block";
		document.getElementById(divName).style.opacity = (1000-delta)/1000;
		if(delta>0){
			setTimeout(function(){fade(divName, delta-20, 'in');}, 1);
		}else{
			document.getElementById(divName).style.opacity = 1;
		}
	}
}

unscope = function(cible){
	if(cible>gol.gridSize){
		gol.gridSize += 0.1;
		if(cible<gol.gridSize){
			gol.gridSize = cible;
			gol.drawCanvasGrid();
			return
		}
	}else{
		gol.gridSize -= 0.1;
		if(cible>gol.gridSize){
			gol.gridSize = cible;
			return
		}
	}
	gol.drawCanvasGrid();
	if(gol.gridSize!=cible){
		timeout0 = setTimeout(function(){

			unscope(cible);
		}, 1);
	}
}

strafRight = function(cible){
	if(cible>gol.cameraX){
		gol.cameraX += 0.8;
		if(cible<gol.cameraX){
			gol.cameraX = cible;
			gol.drawCanvasGrid();
			return
		}
	}else{
		gol.cameraX -= 0.8;
		if(cible>gol.cameraX){
			gol.cameraX = cible;
			return
		}
	}
	gol.drawCanvasGrid();
	if(gol.cameraX!=cible){
		timeout1 = setTimeout(function(){
			strafRight(cible);
		}, 1);
	}
}

strafDown = function(cible){
	if(cible>gol.cameraY){
		gol.cameraY += 0.8;
		if(cible<gol.cameraY){
			gol.cameraY = cible;
			gol.drawCanvasGrid();
			return
		}
	}else{
		gol.cameraY -= 0.8;
		if(cible>gol.cameraY){
			gol.cameraY = cible;
			return
		}
	}
	gol.drawCanvasGrid();
	if(gol.cameraY!=cible){
		timeout2 = setTimeout(function(){
			strafDown(cible);
		}, 1);
	}
}

runIntro = function(){
	document.getElementById('displaymsg').style.visibility = "hidden";

	decalX = Math.round(window.innerHeight/2/gol.gridSize)+15;
	decalY = Math.round(window.innerHeight/2/gol.gridSize)+15;
	gol.matriceMap.writeCell(0-decalX,1-decalY,true);
	gol.matriceMap.writeCell(1-decalX,2-decalY,true);
	gol.matriceMap.writeCell(2-decalX,0-decalY,true);
	gol.matriceMap.writeCell(2-decalX,1-decalY,true);
	gol.matriceMap.writeCell(2-decalX,2-decalY,true);

	gol.drawTrail = false;
	gol.rulers = false;

	gol.speed = 50;

	gol.drawCanvasGrid();
	gol.play();

	gol.animation();
}

welcomePass = function(){
	gol.drawTrail = true;
	gol.rulers = true;
	gol.speed = 0;
	gol.reset();
	document.getElementById('nocookie').style.display = 'none';
	
	fade('walktroughtgradiantradial', 1000, 'out');

	document.getElementById('walktrought').style.display = 'none';
	setTimeout(function(){
		fade('welcome', 1000, 'out');
	}, 500);

	document.getElementById('walktroughtfont').style.display = 'none';
	document.getElementById('hud').style.visibility = 'visible';
	document.getElementById('displaymsg').style.visibility = "visible";

	if(ACTION == "loadMap"){
		gol.matriceMap.map = JSON.parse(loadedMatrice);
				console.log(gol.matriceMap.map);

		gol.hud.displayMsg.initMsg('MAP N°'+IDMAP+' LOADED');
	}
	gol.animation();

}

walktrought1 = function(){
	document.getElementById('loading').style.display ="none";
	document.getElementById('nocookie').style.display ="none";
	document.getElementById('welcome').style.display ="none";
	document.getElementById('walktrought').style.display ="block";
	document.getElementById('slide1').style.display ="block";


}

walktrought2 = function(){
	document.getElementById('slide1').style.display ="none";
	document.getElementById('slide2').style.display ="block";
}
walktrought3 = function(){

	document.getElementById('slide2').style.display ="none";
	document.getElementById('slide3').style.display ="block";
}

walktrought4 = function(){
	timeout6=setTimeout(function(){
		strafRight(100);
	}, 12000);

	document.getElementById('slide3').style.display ="none";

	document.getElementById('slide4').style.display ="block";
	document.getElementById('slide4').style.marginTop = "80px";
	document.getElementById('walktroughttitle').style.marginTop = "-320px";

	gol.matriceMap = new Matrice();
	decalX = Math.round(window.innerHeight/2/gol.gridSize)+16;
	decalY = Math.round(window.innerHeight/2/gol.gridSize)+15;
	gol.matriceMap.writeCell(0-decalX,1-decalY,true);
	gol.matriceMap.writeCell(1-decalX,2-decalY,true);
	gol.matriceMap.writeCell(2-decalX,0-decalY,true);
	gol.matriceMap.writeCell(2-decalX,1-decalY,true);
	gol.matriceMap.writeCell(2-decalX,2-decalY,true);
	//BLOCK
	decalX = -8;
	decalY = -4;
	gol.matriceMap.writeCell(0+decalX,0+decalY,true);
	gol.matriceMap.writeCell(0+decalX,1+decalY,true);
	gol.matriceMap.writeCell(1+decalX,0+decalY,true);
	gol.matriceMap.writeCell(1+decalX,1+decalY,true);
	//BEEHIVE
	decalX = -3;
	decalY = 2;
	gol.matriceMap.writeCell(0+decalX,1+decalY,true);
	gol.matriceMap.writeCell(1+decalX,0+decalY,true);
	gol.matriceMap.writeCell(1+decalX,2+decalY,true);
	gol.matriceMap.writeCell(2+decalX,0+decalY,true);
	gol.matriceMap.writeCell(2+decalX,2+decalY,true);
	gol.matriceMap.writeCell(3+decalX,1+decalY,true);
	//LOAF
	decalX = -3;
	decalY = -5;
	gol.matriceMap.writeCell(0+decalX,1+decalY,true);
	gol.matriceMap.writeCell(0+decalX,2+decalY,true);
	gol.matriceMap.writeCell(1+decalX,0+decalY,true);
	gol.matriceMap.writeCell(1+decalX,3+decalY,true);
	gol.matriceMap.writeCell(2+decalX,0+decalY,true);
	gol.matriceMap.writeCell(2+decalX,2+decalY,true);
	gol.matriceMap.writeCell(3+decalX,1+decalY,true);
	//SHIP
	decalX = -8;
	decalY = 2;
	gol.matriceMap.writeCell(0+decalX,0+decalY,true);
	gol.matriceMap.writeCell(0+decalX,1+decalY,true);
	gol.matriceMap.writeCell(1+decalX,0+decalY,true);
	gol.matriceMap.writeCell(1+decalX,2+decalY,true);
	gol.matriceMap.writeCell(2+decalX,1+decalY,true);
	gol.matriceMap.writeCell(2+decalX,2+decalY,true);
}

walktrought5 = function(){
	clearTimeout(timeout6);
	if (typeof timeout1 != 'undefined') {
		clearTimeout(timeout1);
	}

	gol.cameraY=-80;
	gol.cameraX=0;
	unscope(15);

	document.getElementById('slide4').style.display ="none";

	document.getElementById('slide5').style.display ="block";
	document.getElementById('slide5').style.marginTop = "80px";

	gol.matriceMap = new Matrice();
	//BLINKER
	decalX = -2;
	decalY = -10;
	gol.matriceMap.writeCell(0+decalX,0+decalY,true);
	gol.matriceMap.writeCell(0+decalX,1+decalY,true);
	gol.matriceMap.writeCell(1+decalX,0+decalY,true);
	gol.matriceMap.writeCell(1+decalX,1+decalY,true);
	gol.matriceMap.writeCell(2+decalX,2+decalY,true);
	gol.matriceMap.writeCell(2+decalX,3+decalY,true);
	gol.matriceMap.writeCell(3+decalX,2+decalY,true);
	gol.matriceMap.writeCell(3+decalX,3+decalY,true);

	//PULSAR
	decalX = -6;
	decalY = 0;

	gol.matriceMap.writeCell(0+decalX,2+decalY,true);
	gol.matriceMap.writeCell(0+decalX,3+decalY,true);
	gol.matriceMap.writeCell(0+decalX,4+decalY,true);
	gol.matriceMap.writeCell(0+decalX,8+decalY,true);
	gol.matriceMap.writeCell(0+decalX,9+decalY,true);
	gol.matriceMap.writeCell(0+decalX,10+decalY,true);

	gol.matriceMap.writeCell(5+decalX,2+decalY,true);
	gol.matriceMap.writeCell(5+decalX,3+decalY,true);
	gol.matriceMap.writeCell(5+decalX,4+decalY,true);
	gol.matriceMap.writeCell(5+decalX,8+decalY,true);
	gol.matriceMap.writeCell(5+decalX,9+decalY,true);
	gol.matriceMap.writeCell(5+decalX,10+decalY,true);

	gol.matriceMap.writeCell(7+decalX,2+decalY,true);
	gol.matriceMap.writeCell(7+decalX,3+decalY,true);
	gol.matriceMap.writeCell(7+decalX,4+decalY,true);
	gol.matriceMap.writeCell(7+decalX,8+decalY,true);
	gol.matriceMap.writeCell(7+decalX,9+decalY,true);
	gol.matriceMap.writeCell(7+decalX,10+decalY,true);

	gol.matriceMap.writeCell(12+decalX,2+decalY,true);
	gol.matriceMap.writeCell(12+decalX,3+decalY,true);
	gol.matriceMap.writeCell(12+decalX,4+decalY,true);
	gol.matriceMap.writeCell(12+decalX,8+decalY,true);
	gol.matriceMap.writeCell(12+decalX,9+decalY,true);
	gol.matriceMap.writeCell(12+decalX,10+decalY,true);



	gol.matriceMap.writeCell(2+decalX,0+decalY,true);
	gol.matriceMap.writeCell(3+decalX,0+decalY,true);
	gol.matriceMap.writeCell(4+decalX,0+decalY,true);
	gol.matriceMap.writeCell(8+decalX,0+decalY,true);
	gol.matriceMap.writeCell(9+decalX,0+decalY,true);
	gol.matriceMap.writeCell(10+decalX,0+decalY,true);

	gol.matriceMap.writeCell(2+decalX,5+decalY,true);
	gol.matriceMap.writeCell(3+decalX,5+decalY,true);
	gol.matriceMap.writeCell(4+decalX,5+decalY,true);
	gol.matriceMap.writeCell(8+decalX,5+decalY,true);
	gol.matriceMap.writeCell(9+decalX,5+decalY,true);
	gol.matriceMap.writeCell(10+decalX,5+decalY,true);

	gol.matriceMap.writeCell(2+decalX,7+decalY,true);
	gol.matriceMap.writeCell(3+decalX,7+decalY,true);
	gol.matriceMap.writeCell(4+decalX,7+decalY,true);
	gol.matriceMap.writeCell(8+decalX,7+decalY,true);
	gol.matriceMap.writeCell(9+decalX,7+decalY,true);
	gol.matriceMap.writeCell(10+decalX,7+decalY,true);

	gol.matriceMap.writeCell(2+decalX,12+decalY,true);
	gol.matriceMap.writeCell(3+decalX,12+decalY,true);
	gol.matriceMap.writeCell(4+decalX,12+decalY,true);
	gol.matriceMap.writeCell(8+decalX,12+decalY,true);
	gol.matriceMap.writeCell(9+decalX,12+decalY,true);
	gol.matriceMap.writeCell(10+decalX,12+decalY,true);

}

walktrought6 = function(){
	strafRight(-700);
	timeout2=setTimeout(function(){
		strafDown(-700);
	}, 12000);

	timeout4=setTimeout(function(){
		clearTimeout(timeout1);
		clearTimeout(timeout2);
	}, 21000);

	document.getElementById('slide5').style.display ="none";
	document.getElementById('slide6').style.display ="block";
	document.getElementById('slide6').style.marginTop = "80px";
	gol.matriceMap = new Matrice();
	//BLINKER
	decalX = -2;
	decalY = -20;
	gol.matriceMap.writeCell(0+decalX,0+decalY,true);
	gol.matriceMap.writeCell(0+decalX,3+decalY,true);
	gol.matriceMap.writeCell(1+decalX,4+decalY,true);
	gol.matriceMap.writeCell(2+decalX,0+decalY,true);
	gol.matriceMap.writeCell(2+decalX,4+decalY,true);
	gol.matriceMap.writeCell(3+decalX,1+decalY,true);
	gol.matriceMap.writeCell(3+decalX,2+decalY,true);
	gol.matriceMap.writeCell(3+decalX,3+decalY,true);
	gol.matriceMap.writeCell(3+decalX,4+decalY,true);

	decalX = 50;
	decalY = 20;
	gol.matriceMap.writeCell(0-decalX,1-decalY,true);
	gol.matriceMap.writeCell(1-decalX,2-decalY,true);
	gol.matriceMap.writeCell(2-decalX,0-decalY,true);
	gol.matriceMap.writeCell(2-decalX,1-decalY,true);
	gol.matriceMap.writeCell(2-decalX,2-decalY,true);
}

walktrought7 = function(){
	clearTimeout(timeout0);
	clearTimeout(timeout1);
	clearTimeout(timeout2);
	clearTimeout(timeout4);

	gol.matriceMap = new Matrice();
	gol.cameraY = 0;
	gol.cameraX = 0;
	gol.drawCanvasGrid();
	

	document.getElementById('slide6').style.display ="none";
	document.getElementById('slide7').style.display ="block";
	document.getElementById('slide7').style.marginTop = "80px";

	//
	// unscope(5);
	// HERE UNSCOPE CAMERA ZOOMOUT + FUCKING AWSOM PATTERNS !!!!!!!!!!!!!!!!!
	// HERE UNSCOPE CAMERA ZOOMOUT + FUCKING AWSOM PATTERNS !!!!!!!!!!!!!!!!!
	// HERE UNSCOPE CAMERA ZOOMOUT + FUCKING AWSOM PATTERNS !!!!!!!!!!!!!!!!!
	// HERE UNSCOPE CAMERA ZOOMOUT + FUCKING AWSOM PATTERNS !!!!!!!!!!!!!!!!!
	//
}

walktrought8 = function(){
	gol.reset();

	document.getElementById('slide7').style.display ="none";
	document.getElementById('slide8').style.display ="block";
	document.getElementById('slide8').style.width ="400px";
	document.getElementById('slide8').style.marginLeft ="-222px";
	
	document.getElementById('hud').style.visibility = "visible";

	fade('hud', 1000, 'in');
	fade('walktroughttitle', 1000, 'out');

	hudElements = document.getElementsByClassName('hudElement');
	for(var i=0;i<hudElements.length;i++){
		hudElements[i].style.zIndex = "1000";
		for(var j=0;j<hudElements[i].children.length;j++){
			hudElements[i].children[j].style.opacity = "1";

		}
	}

	document.getElementById('gen').style.opacity = "1";
	document.getElementById('livecell').style.opacity = "1";
	document.getElementById('gps').style.opacity = "1";
	document.getElementById('fps').style.opacity = "1";
	document.getElementById('nameoftools').style.display = "block";
}


walktrought9 = function(){
	document.getElementById('slide8').style.display ="none";
	document.getElementById('nameoftools').style.visibility ="hidden";

	document.getElementById('slide9').style.display ="block";
	document.getElementById('slide9').style.width ="400px";
	document.getElementById('slide9').style.marginLeft ="-222px";
	document.getElementById('optfps').style.height ="100%";

	monitorname = document.getElementsByClassName('monitorname');
	for(var i=0;i<monitorname.length;i++){
		monitorname[i].style.opacity = "1";
	}

	document.getElementById('zoomin').firstChild.style.marginLeft = "70px";
	document.getElementById('zoomout').firstChild.style.marginLeft = "70px";
	document.getElementById('movehand').firstChild.style.marginLeft = "70px";
	document.getElementById('lastsave').firstChild.style.marginLeft = "-270px";
	document.getElementById('history').firstChild.style.marginLeft = "-270px";
	document.getElementById('fastsave').firstChild.style.marginLeft = "-270px";

	document.getElementById('legendpen').style.bottom = "-12px";
	document.getElementById('legendpen').style.opacity = "1";
	document.getElementById('legendselector').style.bottom = "-12px";
	document.getElementById('legendselector').style.opacity = "1";


	document.getElementById('legendplay').style.top = "130px";
	document.getElementById('legendplay').style.opacity = "1";

	document.getElementById('legendpause').style.top = "130px";
	document.getElementById('legendpause').style.marginLeft = "-230px";
	document.getElementById('legendpause').style.opacity = "1";

	document.getElementById('legendonestep').style.top = "130px";
	document.getElementById('legendonestep').style.marginLeft = "10px";
	document.getElementById('legendonestep').style.opacity = "1";

	document.getElementById('legendspeedalt').style.display = "block";
	document.getElementById('legendspeedalt').style.top = "80px";
	
	document.getElementById('showpattern').style.width = "383px";
	document.getElementById('showpattern').style.height = "100%";
	
	document.getElementById('showfile').style.width = "383px";
	document.getElementById('showfile').style.height = "100%";

	document.getElementById('quickfixfile').style.display = "none";
	document.getElementById('quickfixpattern').style.display = "none";

	hudElements = document.getElementsByClassName('hudElement');
	for(var i=0;i<hudElements.length;i++){
		for(var j=0;j<hudElements[i].children.length;j++){
			for(var k=0;k<hudElements[i].children[j].children.length;k++){
				hudElements[i].children[j].children[k].style.opacity = "1";

			}
		}
	}


}


walktroughtExit = function(){
	document.getElementById('walktrought').style.display ="none";
	document.getElementById('walktroughtgradiantradial').style.display ="none";
	document.getElementById('walktroughtfont').style.display ="none";

	document.getElementById('zoomin').firstChild.style.marginLeft = "";
	document.getElementById('zoomout').firstChild.style.marginLeft = "";
	document.getElementById('movehand').firstChild.style.marginLeft = "";
	document.getElementById('lastsave').firstChild.style.marginLeft = "";
	document.getElementById('history').firstChild.style.marginLeft = "";
	document.getElementById('fastsave').firstChild.style.marginLeft = "";

	document.getElementById('legendpen').style.bottom = "";
	document.getElementById('legendpen').style.opacity = "";
	document.getElementById('legendselector').style.bottom = "";
	document.getElementById('legendselector').style.opacity = "";


	document.getElementById('legendplay').style.top = "";
	document.getElementById('legendplay').style.opacity = "";

	document.getElementById('legendpause').style.top = "";
	document.getElementById('legendpause').style.marginLeft = "";
	document.getElementById('legendpause').style.opacity = "";

	document.getElementById('legendonestep').style.top = "";
	document.getElementById('legendonestep').style.marginLeft = "";
	document.getElementById('legendonestep').style.opacity = "";

	document.getElementById('legendspeedalt').style.display = "";
	document.getElementById('legendspeedalt').style.top = "";
	
	document.getElementById('showpattern').style.width = "";
	document.getElementById('showpattern').style.height = "";
	
	document.getElementById('showfile').style.width = "";
	document.getElementById('showfile').style.height = "";

	document.getElementById('quickfixfile').style.display = "";
	document.getElementById('quickfixpattern').style.display = "";

	document.getElementById('gen').style.opacity = "";
	document.getElementById('livecell').style.opacity = "";
	document.getElementById('gps').style.opacity = "";
	document.getElementById('fps').style.opacity = "";
	document.getElementById('optfps').style.height ="";

	monitorname = document.getElementsByClassName('monitorname');
	for(var i=0;i<monitorname.length;i++){
		monitorname[i].style.opacity = "";
	}
	hudElements = document.getElementsByClassName('hudElement');
	for(var i=0;i<hudElements.length;i++){
		hudElements[i].style.opacity = "";
		hudElements[i].style.zIndex = "";

		for(var j=0;j<hudElements[i].children.length;j++){
			hudElements[i].children[j].style.opacity = "";

			for(var k=0;k<hudElements[i].children[j].children.length;k++){
				hudElements[i].children[j].children[k].style.opacity = "";

			}
		}
	}
	gol.drawTrail = true;
	gol.rulers = true;

	gol.speed = 0;
	gol.reset();

	gol.drawCanvasGrid();
	gol.animation();

	document.getElementById('displaymsg').style.visibility = "visible";

welcomePass();
}

