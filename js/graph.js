Graph = function(idHtmlConteneur, graphColor){
	this.htmlConteneur = document.getElementById(idHtmlConteneur);
	this.arrayValues = new Array();
	this.currentCount = 0;

	this.visible = true;
	this.graph = true;
	this.big = false;
	this.highlight = false;

	this.htmlCanvas = document.getElementById(idHtmlConteneur+"canvas");
	this.ctx = this.htmlCanvas.getContext("2d");
	this.htmlCanvas.width = this.htmlConteneur.clientWidth*2;
	this.htmlCanvas.height = this.htmlConteneur.clientHeight*2;
	this.color = graphColor;


	this.refresh = function(){
		this.ctx.clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);

		max = 0;
		for(id = 96 ; id >= 0 ; id--) {
			this.arrayValues[id] = this.arrayValues[id-1];
			if(this.arrayValues[id]>max){
				max = this.arrayValues[id];
			}
		}

		this.arrayValues[0] = this.currentCount;

		if(this.graph){
			this.ctx.fillStyle = this.color;
			for(id = 96 ; id >= 0 ; id--) {
				this.ctx.fillRect(91-id,this.htmlCanvas.height, 1, -((this.arrayValues[id]/max)*this.htmlCanvas.height));  
			}
		}

		this.ctx.fillStyle = "rgba(255,255,255,1)";
		this.ctx.font= "600 40px Rajdhani";
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.currentCount, this.htmlCanvas.width/2, (this.htmlCanvas.height/2)+13);
	}

	this.display = function(){
		legende = document.getElementById(this.htmlConteneur.id+"name");
		if(this.visible == true){
			this.htmlConteneur.style.display = "none";
			legende.style.display = "none";
			this.visible = false;
		}else{
			this.htmlConteneur.style.display = "block";
			legende.style.display = "block";
			this.visible = true;
		}
	}

	this.displayGraph = function(){
		if(this.graph == true){
			this.graph = false;
		}else{
			this.graph = true;
		}
	}

	this.displayBig = function(){
		if(this.big == true){
			this.htmlConteneur.className = "button";
			this.big = false;
		}else{
			this.htmlConteneur.className = "button monitorbig";
			this.big = true;
		}
	}
}



