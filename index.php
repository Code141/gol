<?php
define('VERSION', '1'); // MUST BE INT (1,2,3,4...)

define('DB_HOST', 'localhost'); // Host name 
define('DB_NAME', 'gol'); // Database name 
define('DB_USER', 'root'); // Mysql username 
define('DB_PASS', 'root'); // Mysql password 

/* HTACCESS
#set max post size
php_value post_max_size 20M
*/

include"php/post.php";
include"php/pdo.php";

// $_GET = NORMAL LOAD (OR: AND INSERT UNIQUE LOAD)
if($road == "regularLoad"){
	include"php/regular.php";
}elseif($road = "ajax"){
	include"php/ajax.php";

}

?>