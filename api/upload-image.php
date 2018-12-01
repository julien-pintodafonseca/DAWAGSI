<?php
 
header("Access-Control-Allow-Origin: *");
 
//Vérification de la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(array('status' => false));
  exit;
}
 
define('KB', 1024);
define('MB', 1048576);
define('GB', 1073741824);
define('TB', 1099511627776);
  
//Options
$path = './../uploads/'; //Répertoire où les images seront stockées
$renameToMd5 = true; //Génerer un nom aléatoire (true) ou garder le nom original (false)
$extAccepted = array('jpg','jpeg','png'); //Extensions autorisées
$maxSize = 60*MB; //Taille maximale (attention ! doit être inférieur à la valeur "post_max_size" de votre php.ini !)
 
if (isset($_FILES['image'])) {
  //Vérification de l'extension
  $originalName = $_FILES['image']['name'];
  $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
  $ext = strtolower($ext);
  
  $wrongExt = true;
  for ($i=0; $i<sizeof($extAccepted); $i++) { 
	if ($ext == '.'.$extAccepted[$i]) {
		$wrongExt = false;
	}
  }
  if ($wrongExt) {
	  echo json_encode(
		array('status' => false, 'msg' => $ext.' is an unauthorized extension.')
	  );
	  exit;
  }
  
  //Vérification de la taille du fichier
  
  $size = $_FILES['image']['size'];
  
  if ($size > $maxSize) {
    echo json_encode(
      array('status' => false, 'msg' => $size.' : the file is too big.')
	);
	exit;
  }
  
  //Renommage MD5
  if ($renameToMd5) {
	  $generatedName = md5($_FILES['image']['tmp_name']).$ext;
  } else {
	  $generatedName = $originalName;
  }
  $filePath = $path.$generatedName;
  
  //Vérifie les droits sur le répertoir de destination
  if (!is_writable($path)) {
    echo json_encode(
      array('status' => false, 'msg'    => 'Destination directory is not writable.')
	);
    exit;
  }
  
  //Stockage de l'image sur le serveur
  if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
    echo json_encode(array(
      'status'        => true,
      'originalName'  => $originalName,
      'generatedName' => $generatedName
    ));
  }
}
else {
  //Erreur
  echo json_encode(
    array('status' => false, 'msg' => 'Aborted.')
  );
  exit;
}
 
?> 