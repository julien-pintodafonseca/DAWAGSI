<?php
 
header("Access-Control-Allow-Origin: *");
 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(array('status' => false));
  exit;
}
 
$path = 'uploads/'; //Répertoire où les images seront stockées
$renameToMd5 = true; //Génerer un nom aléatoire (true) ou garder le nom original (false)
$extAccepted = array('jpg','jpeg','png'); //Extensions autorisées
 
if (isset($_FILES['image'])) {
  $originalName = $_FILES['image']['name'];
  $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
  
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
  
  if ($renameToMd5) {
	  $generatedName = md5($_FILES['image']['tmp_name']).$ext;
  } else {
	  $generatedName = $originalName;
  }
  $filePath = $path.$generatedName;
 
  if (!is_writable($path)) {
    echo json_encode(array(
      'status' => false,
      'msg'    => 'Destination directory is not writable.'
    ));
    exit;
  }
 
  if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
    echo json_encode(array(
      'status'        => true,
      'originalName'  => $originalName,
      'generatedName' => $generatedName
    ));
  }
}
else {
  echo json_encode(
    array('status' => false, 'msg' => 'Aborted.')
  );
  exit;
}
 
?> 