Canvas = function(canvasId){

    this.htmlCanvas = document.getElementById(canvasId);
    this.ctx = this.htmlCanvas.getContext("2d");

    this.drawMouse= function(tool){
        startY = gol.mouse.row * gol.gridSize + gol.cameraY+gol.centerY;
        startX = gol.mouse.col * gol.gridSize + gol.cameraX+gol.centerX;
        switch(tool) {
            case "pen":

        this.ctx.fillStyle = "rgba(0,255,0,0.7)";
        this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize);  
            break;
            case "brush":
        this.ctx.fillStyle = "rgba(0,255,0,1)";
        this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize); 
            break;
            case "selector":
        this.ctx.strokeStyle= "rgba(0,255,0,1)";
        this.ctx.setLineDash([gol.gridSize/4,gol.gridSize/4]);
        this.ctx.strokeRect(startX, startY, gol.gridSize, gol.gridSize);        
        this.ctx.setLineDash([]); 
            break;
            case "pattern":
            break;
        }
    }

    this.showCell = function(){
        startY = gol.mouse.row * gol.gridSize + gol.cameraY+gol.centerY;
        startX = gol.mouse.col * gol.gridSize + gol.cameraX+gol.centerX;

        this.ctx.fillStyle = "rgba(0,255,0,1)";

        this.ctx.font= "20px Rajdhani";
        this.ctx.fillText(gol.mouse.col, startX+(gol.gridSize/4), 18);
        this.ctx.fillText(gol.mouse.row, 5, startY+(gol.gridSize/2)+10);
    }

    this.drawSelection= function(){
        startY = gol.selection.startRow * gol.gridSize + gol.cameraY+gol.centerY;
        startX = gol.selection.startCol * gol.gridSize + gol.cameraX+gol.centerX;
        endY = (gol.selection.endRow+1) * gol.gridSize + gol.cameraY+gol.centerY-startY;
        endX = (gol.selection.endCol+1) * gol.gridSize + gol.cameraX+gol.centerX-startX;

        this.ctx.strokeStyle= "rgba(0,255,0,1)";
        this.ctx.setLineDash([gol.gridSize/4,gol.gridSize/4]);

        this.ctx.strokeRect(startX, startY, endX, endY);        

        this.ctx.setLineDash([]);

    }


    this.drawLine = function(startX, startY, endX, endY, size, color){

        startX = Math.round(startX * gol.gridSize + gol.cameraX+gol.centerX)+0.5;
        startY = Math.round(startY * gol.gridSize + gol.cameraY+gol.centerY)+0.5;
        endX = Math.round(endX * gol.gridSize + gol.cameraX+gol.centerX)+0.5;
        endY = Math.round(endY * gol.gridSize + gol.cameraY+gol.centerY)+0.5;

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size; 

        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);   

        this.ctx.stroke();
        this.ctx.closePath();
    }



    this.drawGrid = function(pas, rvb, opacityCoef){
        nb_cell_height = ((gol.canvasHeight-gol.cameraY+gol.centerY)/gol.gridSize)/pas;
        nb_cell_width = ((gol.canvasWidth-gol.cameraX+gol.centerX)/gol.gridSize)/pas;
      
        nb_cell_top = (gol.canvasHeight/2+gol.cameraY)/gol.gridSize;
        nb_cell_bottom = (gol.canvasHeight/2-gol.cameraY)/gol.gridSize;
        nb_cell_left = (gol.canvasWidth/2+gol.cameraX)/gol.gridSize; 
        nb_cell_right = (gol.canvasWidth/2-gol.cameraX)/gol.gridSize;

        opacity = ((gol.gridSize-0.5)/99)*(pas/2);
        color = "rgba("+rvb+","+opacity*opacityCoef+")";

        if(opacity>=0.03){
            //ROW
            for(row = 0; row < nb_cell_bottom/pas ; row++) {
                startX = -nb_cell_left;
                startY = row*pas;
                endX = nb_cell_right;
                endY = row*pas;
                this.drawLine(startX,startY,endX,endY, 1, color);
            }
            for(row = 1; row < nb_cell_top/pas ; row++) {
                startX = -nb_cell_left;
                startY = row*pas;
                endX = nb_cell_right;
                endY = row*pas;
                this.drawLine(startX,-startY,endX,-endY, 1, color);
            }
      
            for(cell = 0; cell < nb_cell_right/pas ; cell++) {
                startX = cell*pas;
                startY = -nb_cell_top ;
                endX = cell*pas;
                endY = nb_cell_bottom;
                this.drawLine(startX,startY,endX,endY, 1, color);
            }
            
            for(cell = 1; cell < nb_cell_left/pas ; cell++) {
                startX = -cell*pas;
                startY = -nb_cell_top ;
                endX = -cell*pas;
                endY = nb_cell_bottom;
                this.drawLine(startX,startY,endX,endY, 1, color);
            }

        }
    }

    this.drawRulers = function(){
        nb_cell_top = -((gol.canvasHeight/2+gol.cameraY)/gol.gridSize);
        nb_cell_bottom = (gol.canvasHeight/2-gol.cameraY)/gol.gridSize;
       
        nb_cell_left = -((gol.canvasWidth/2+gol.cameraX)/gol.gridSize); 
        nb_cell_right = (gol.canvasWidth/2-gol.cameraX)/gol.gridSize;

        this.drawLine(0,nb_cell_top-1,0,nb_cell_bottom+1, 1, "rgba(120,235,0,1)");
        this.drawLine(nb_cell_right+1,0,nb_cell_left-1,0, 1, "rgba(120,235,0,1)");

   }



    this.drawInCell = function(row, col, type){
        startY = row * gol.gridSize + gol.cameraY+gol.centerY;
        startX = col * gol.gridSize + gol.cameraX+gol.centerX;

        if(type == "aliveCell"){
            this.ctx.fillStyle = "rgba(255,255,255,1)";
            this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize);  

        }else if(type == "deadCell"){
            this.ctx.fillStyle = "rgba(255,255,255,0.1)";
            this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize);  
        }
    }



    this.drawMatrice = function(matrice){
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        for (var row in matrice.map) {
            for (var col in matrice.map[row]) {
                if(matrice.map[row][col] == true){
                    startY = row * gol.gridSize + gol.cameraY+gol.centerY;
                    startX = col * gol.gridSize + gol.cameraX+gol.centerX;
                    this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize); 
                }
            }
        }
    }

    this.drawTrails = function(matrice){
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        for (var row in matrice.map) {
            for (var col in matrice.map[row]) {
                if(matrice.map[row][col] == true && matrice.map[row][col] != gol.matriceTrails){
                    startY = row * gol.gridSize + gol.cameraY+gol.centerY;
                    startX = col * gol.gridSize + gol.cameraX+gol.centerX;
                    this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize); 
                }
            }
        }
    }

    this.drawPattern = function(matrice, y, x){

        this.ctx.fillStyle = "rgba(0,255,0,0.1)";
        this.ctx.fillRect(x*gol.gridSize+gol.cameraX+gol.centerX,y*gol.gridSize+gol.cameraY+gol.centerY,matrice.width*gol.gridSize,matrice.height*gol.gridSize); 

        for (var row in matrice.map) {
            for (var col in matrice.map[row]) {

                startY = row * gol.gridSize + gol.cameraY+gol.centerY + (y*gol.gridSize);
                startX = col * gol.gridSize + gol.cameraX+gol.centerX + (x*gol.gridSize);
                
                
                
                if(matrice.map[row][col] == true){

                    this.ctx.fillStyle = "rgba(0,255,0,0.5)";
                    this.ctx.fillRect(startX,startY,gol.gridSize,gol.gridSize); 

                }
            }
        }
    }

    this.cleanFrame = function(){

            this.ctx.clearRect(0, 0, gol.canvasWidth, gol.canvasHeight);

    }


}

