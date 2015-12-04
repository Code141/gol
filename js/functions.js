function pageLoad(){

	document.getElementById('nojs').style.display = "none";

	if(canvasTest()){
		document.getElementById('nocanvas').style.display = "none";

		intiAll();


		if(!readCookie(VERSION+"firstvisite")){
			runIntro();
			document.getElementById('nocookie').style.display = "block";
			createCookie('firstvisite', true);
		}else{
			welcomePass();
			setTimeout(function(){fade('welcome', 1000, 'out');}, 1000);
		}
	}

facebookInit();

}

function canvasTest(){
	var canvas = document.getElementById('canvasTest');
	var context = canvas.getContext('2d');
	if(!context)
	{
		return false;
	}
	return true;
}

function intiAll(){
	document.getElementById('version').innerHTML = VERSION;
	gol = new game_of_life();
	gol.hud.init();
	loadJSON("pattern");
	gol.mapLib.loadCookies(readCookie(VERSION+"map"));
	gol.patternLib.loadCookies(readCookie(VERSION+"pattern"));
	gol.reset();
	gol.windowSetSize();
	window.addEventListener( 'resize', gol.windowSetSize, false );

	gol.hud.displayMsg.initMsg('GAME INITIALISED');

	gol.animation();
}

function ajax(cible, data){
	var xmlhttp;
	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  	xmlhttp=new XMLHttpRequest();
  }

  xmlhttp.onreadystatechange=function()
  {
  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
  	{
  		
  		target = document.getElementById(cible);
  		target.innerHTML=xmlhttp.responseText;
  		
  		var scripts = target.getElementsByTagName('script');
  		for(var i=0; i < scripts.length;i++)
  		{
  			window.eval(scripts[i].text);
  		}
  	}
  }
  xmlhttp.open("POST","/projets/gol/",true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(data);
}

function loadJSON(fileToLoad) {   
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'json/'+fileToLoad+'.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			objects = JSON.parse(xobj.responseText);
			gol.patternLib.getJson(fileToLoad, objects);
		}
	};
	xobj.send(null);  
}

function createCookie(name,value) {
	var date = new Date();
	date.setTime(date.getTime()+(2*365*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = VERSION+name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var cookiesArray = document.cookie.split(';');
	for(var i=0;i < cookiesArray.length;i++) {
		var c = cookiesArray[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function facebookInit(){

	(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.3&appId=254325597951651";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

}
