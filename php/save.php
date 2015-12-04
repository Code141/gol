<?php


//-----------------------SAVE
if($type == "map"){

	$id = "";
	$name = $_POST['mapname'];
	$author = $_POST['authorname'];
	$star = "";
	$nbvote = "";
	$datetime = "CURRENT_TIMESTAMP";
	$version = VERSION;
	$livecell = $_POST['livecell'];
	$width = $_POST['width'];
	$height = $_POST['height'];
	$map = $_POST['map'];

	$preparedsql = $sql->prepare('INSERT INTO map VALUES (:id,:mapname,:author,:star,:nbvote,CURRENT_TIMESTAMP,:version,:livecell,:width,:height,:map);');

	$preparedsql->bindParam(":id", $id);
	$preparedsql->bindParam(":mapname", $name);
	$preparedsql->bindParam(":author", $author);
	$preparedsql->bindParam(":star", $star);
	$preparedsql->bindParam(":nbvote", $nbvote);
	$preparedsql->bindParam(":version", $version);
	$preparedsql->bindParam(":livecell", $livecell);
	$preparedsql->bindParam(":width", $width);
	$preparedsql->bindParam(":height", $height);
	$preparedsql->bindParam(":map", $map);

	$preparedsql->execute();
	$dernier_id =$sql->lastInsertId();


	echo '<script>gol.hud.exportMapResult("allOkay", '.$dernier_id.');</script>';



}elseif($type == "pattern"){

}




//-----------------------LOAD

/*
id
name
author
star
nbvote
date
version
livecell
width
height
map
*/
/*
$data['version']
$data['nbvote']
$data['map']
*/

if($action == "loadMap"){

	$requeteBase = $sql->query("SELECT * FROM map WHERE id='$idMap'");
	echo"<script>";
	while ($data = $requeteBase->fetch()){
		echo"		
		var loadedMatrice = '".$data['map']."';
		";
	}
	echo"</script>";
	$requeteBase->closeCursor();

}else{



if($type == "mapliste"){

	$requeteBase = $sql->query('SELECT * FROM map');
	echo"<script>";
	while ($data = $requeteBase->fetch()){
		echo"		
		var matrice = '".$data['map']."';
		gol.hud.importMapList('".$data['id']."','".$data['name']."','".$data['author']."','".$data['star']."','".$data['nbvote']."','".$data['date']."','".$data['version']."','".$data['livecell']."','".$data['width']."','".$data['height']."', matrice);
		";
	}
	echo"</script>";
	$requeteBase->closeCursor();
}

}
