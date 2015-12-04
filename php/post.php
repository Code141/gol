<?php

// $_GET = NORMAL LOAD (OR: AND INSERT UNIQUE LOAD)

$road = "regularLoad";
if(isset($_GET['loadMap'])){
	$idMap = intval($_GET['loadMap']);
	$action = "loadmap";
}else{
	$action = "normal";
}


// $_POST = AJAX REQUEST

if(isset($_POST['action'])){// SAVE - LOAD
$road = "ajax";
	
	$action = $_POST['action'];//report

	if(isset($_POST['type'])){ 
		$type = $_POST['type'];//map/idmap/pattern
	}else{
		$type = "none";
	}

	if(isset($_POST['msg'])){ 
		$msg = $_POST['msg'];
	}
}






/*	$_POST['mapname'];
	$_POST['authorname'];
	$_POST['livecell'];
	$_POST['width'];
	$_POST['height'];
	$_POST['map'];

*/