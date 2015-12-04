PatternViewer = function(matrice, size){
    htmlCanvas = document.createElement("canvas");
    htmlCanvas.style.display = "none"; 
    document.body.appendChild(htmlCanvas);

    ctx = htmlCanvas.getContext("2d");

    htmlCanvas.width = size;
    htmlCanvas.height = size;

    if(matrice.height>matrice.width){
        gridSize = size/matrice.height;

        htmlCanvas.width = (matrice.width*gridSize);
        htmlCanvas.height = size;
    }else{
        gridSize = size/matrice.width;

        htmlCanvas.width = size;
        htmlCanvas.height = (matrice.height*gridSize);
    }


    ctx.fillStyle = "rgba(255,255,255,1)";
    for (var row in matrice.map) {
        for (var col in matrice.map[row]) {
            if(matrice.map[row][col] == true){

                startY = row * gridSize;
                startX = col * gridSize;

                ctx.fillRect(startX,startY,gridSize,gridSize); 
            }
        }
    }

    document.body.removeChild(htmlCanvas);
    return htmlCanvas.toDataURL("image/png");
}

insertImgFromMatrice = function(matrice, size, where){
    img = document.createElement("img");
    img.src = PatternViewer(matrice, size);
    where.appendChild(img);
}