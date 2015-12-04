PatternLib = function(){

	this.library = {};

	this.get = function(name){
		loadedPattern = new Matrice();
		loadedPattern.fusion("alive", this.library[name], 0, 0);
		loadedPattern.height = this.library[name].height;
		loadedPattern.width = this.library[name].width;
		return loadedPattern;
	}

	this.savePattern = function(pattern, name){
		name = name.replace(/[^a-z0-9 ]/gi,'');
		alreadyExiste = false;
		for(key in this.library){
			if (key == "perso"+name){
				alreadyExiste = true;
			}
		}

		if(!alreadyExiste){
			this.library["perso"+name] = pattern;
			
			persoToCookies = {};
			for(key in this.library){
				if(key.substring(0, 5) == "perso"){
					persoToCookies[key] = this.library[key];
				}
			}
			
			jsonedSlot = JSON.stringify(persoToCookies);
			createCookie("pattern", jsonedSlot);
			
			return true
		}else{
			return false
		}
	}

	this.loadCookies = function(cookies){
		if(JSON.parse(cookies)){
			this.library = JSON.parse(cookies);
		}
		for(key in this.library){
			gol.hud.creatPatternElement(this.library[key], key.substring(5, key.length))
		}
	}

	this.getJson = function(name, objects){

		generalListe = document.getElementById('generalliste');

		for(categorie in objects){

			catName = document.createElement("div");
			catName.className = "patterngeneralcats";
			generalListe.appendChild(catName);
			catName.innerHTML = categorie;

			cat = document.createElement("div");
			cat.className = "patterntype";
			catName.appendChild(cat);
			
			for(name in objects[categorie]){
				loadedPattern = new Matrice();

				loadedPattern.width = objects[categorie][name].width;
				loadedPattern.height = objects[categorie][name].height;
				loadedPattern.map = objects[categorie][name].map;

				mainDiv = document.createElement("div");
				mainDiv.className = "patterndiv";
				mainDiv.id = "generalPattern-"+name;
				
				cat.appendChild(mainDiv);

				patternDiv = document.createElement("div");
				patternDiv.className = "pattern_select";
				mainDiv.appendChild(patternDiv);
				insertImgFromMatrice(loadedPattern, 50, patternDiv);

				span = document.createElement("span");
				span.innerHTML = name;
				mainDiv.appendChild(span);

				mainDiv.setAttribute('onClick', "gol.hud.patternClick('"+name+"')");

				this.library[name] = loadedPattern;
			}
			catName.innerHTML+="<hr>";
		}
	}

}













