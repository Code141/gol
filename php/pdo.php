<?php
try
{
    $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $sql = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . '', DB_USER, DB_PASS, $pdo_options);
}

catch(Exception $e)
{
    die('Erreur : '.$e->getMessage());
}
