<?php

include"html/start.html";
echo '<script>
VERSION = "'.VERSION.'";
';


if($action == "normal"){
	echo 'ACTION = "normal";
</script>';
}elseif($action == "loadmap"){
	echo 'ACTION = "loadMap";
	IDMAP = "'.$idMap.'";
	';

	$requeteBase = $sql->query("SELECT * FROM map WHERE id='".$idMap."'");
	while ($data = $requeteBase->fetch()){
		echo"loadedMatrice = '".$data['map']."';
		";
	}

	$requeteBase->closeCursor();
	echo"</script>";
}

include"html/map.html";
include"html/hud.html";
include"html/welcome.html";
include"html/end.html";





