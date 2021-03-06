﻿<?php
/**
 * DAWAGSI Database API
 * @version 1.1.0
 */

require_once __DIR__ . '/vendor/autoload.php';

$app = new Slim\App();


/* UPLOADS IMG FOLDER PATH */
function get_path_img() {
	$path_img = './../../uploads/';
	return $path_img;
}

/* PDO INSTANCE */
function connect() {
	$password = '6,T3PKiaWsvB';
	$user = 'skydefrc_ptut';
	$name = 'skydefrc_dawagsi';
	$server = 'localhost';
	$port = 3306;
	
	try {
		$DB = new PDO('mysql:host='.$server.':'.$port.';dbname='.$name.'',''.$user.'',''.$password.'', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
		return $DB;
	} catch (Exception $e) {
		print_r($e->getMessage());
		return null;
	}
}


/**
 * GET checkDB
 * Summary: Vérifie la connexion à la base de données
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/database', function($request, $response, $args) {
	
	try {
		$DB = connect();
		
		if ($DB) {
			$data['status'] = "Ok";
		} else {
			$data['status'] = "Unreachable";
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * POST createList
 * Summary: Crée une nouvelle liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/list/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];
	$description = $queryParams['description'];
		
	try {
		$DB = connect();

		if ($name != "") {
			if ($description != "") {
				$req = 'INSERT INTO `List` (name, description) VALUES(:name, :description)';
				$result = $DB->prepare($req);		
				$result = $result->execute(array( 'name' => $name, 'description' => $description));
			} else {
				$req = 'INSERT INTO `List` (name) VALUES(:name)';
				$result = $DB->prepare($req);		
				$result = $result->execute(array( 'name' => $name));
			}
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : name is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectAllList
 * Summary: Sélectionne toutes les listes
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/list/selectAll', function($request, $response, $args) {
	
	try {
		$DB = connect();
		
		$req = 'SELECT * FROM `List`';
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result) {
			$count = 0;
			foreach ($result as $row) {
				$data[$count]["id"] = $row["id"];
				$data[$count]["name"] = $row["name"];
				$data[$count]["description"] = $row["description"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : table \'List\' is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectList
 * Summary: Sélectionne une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/list/{id}', function($request, $response, $args) {
	
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
	
	try {
		$DB = connect();
		
		$req = 'SELECT * FROM `List` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result) {
			foreach ($result as $row) {
				$data["id"] = $row["id"];
				$data["name"] = $row["name"];
				$data["description"] = $row["description"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * PUT updateList
 * Summary: Met à jour une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/list/{id}', function($request, $response, $args) {
	
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
	
	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];
	$description = $queryParams['description'];
		
	try {
		$DB = connect();
		
		$req = 'SELECT * FROM `List` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result) {
			if ($name != "") {
				$req = $req = "UPDATE `List` SET name = :newName, description = :newDescription WHERE id = ".$id;
				$result = $DB->prepare($req);
				$result = $result->execute(array( 'newName' => $name, 'newDescription' => $description));
				$data['message'] = "successful operation";
			} else {
				$data['message'] = 'an error has occurred : name is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * DELETE deleteList
 * Summary: Supprime une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/list/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
	
	try {
		$DB = connect();
		
		/* Début suppression images serveur physique */
		
		$req_img = 'SELECT * FROM `Image` WHERE list ='.$id;
		$result_img = $DB->query($req_img);
		$result_img = $result_img->fetchAll(PDO::FETCH_ASSOC);
		
		$pass_step = false;
		if ($result_img) {
			$count_img = 0;
			foreach ($result_img as $row_img) {
				$data_img[$count_img]["id"] = $row_img["id"];
				$data_img[$count_img]["list"] = $row_img["list"];
				$data_img[$count_img]["originalName"] = $row_img["originalName"];
				$data_img[$count_img]["generatedName"] = $row_img["generatedName"];
				$data_img[$count_img]["editor"] = $row_img["editor"];
				$count_img++;
			}
		} else {
			// Aucune image à supprimer
			$pass_step = true;
		}
		
		if (!$pass_step) {
			for ($nbImg=0; $nbImg<$count_img; $nbImg++) {
				$file = get_path_img().$data_img[$nbImg]["generatedName"];
				$data['message_img'.$nbImg] = $file." removed successfully from server";
				
				if (file_exists($file)) {
					unlink($file);
				} else {
					$data['message_img'] = "Une erreur est survenue lors de la suppression d'une image :'+".$file;
				}
			}
		}
		
		/* Fin suppression images serveur physique */
		
		$req = "DELETE FROM `List` WHERE id=".$id;
		$result = $DB->exec($req);
		
		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * POST createImage
 * Summary: Crée une nouvelle image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/image/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$list = $queryParams['list'];
	$originalName = $queryParams['originalName'];
	$generatedName = $queryParams['generatedName'];
	$editor = $queryParams['editor'];
	
	try {
		$DB = connect();

		if ($list != "" && $originalName != "" && $generatedName != "") {
			if ($editor == "") {
				$req = 'INSERT INTO `Image` (list, originalName, generatedName) VALUES(:list, :originalName, :generatedName)';
				$result = $DB->prepare($req);
				$result = $result->execute(array('list' => $list, 'originalName' => $originalName, 'generatedName' => $generatedName));
			} else {
				$req = 'INSERT INTO `Image` (list, originalName, generatedName, editor) VALUES(:list, :originalName, :generatedName, :editor)';
				$result = $DB->prepare($req);
				$result = $result->execute(array('list' => $list, 'originalName' => $originalName, 'generatedName' => $generatedName, 'editor' => $editor));
			}
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : list, originalName or generatedName is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET selectAllImage
 * Summary: Sélectionne toutes les images d'une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/image/selectAll', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$list = $queryParams['list'];
	
	try {
		$DB = connect();
		
		$req = 'SELECT * FROM `Image` WHERE list ='.$list;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result) {
			$count = 0;
			foreach ($result as $row) {
				$data[$count]["id"] = $row["id"];
				$data[$count]["list"] = $row["list"];
				$data[$count]["originalName"] = $row["originalName"];
				$data[$count]["generatedName"] = $row["generatedName"];
				$data[$count]["editor"] = $row["editor"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : no images available for this list';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectImage
 * Summary: Sélectionne une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/image/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Image` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			foreach ($result as $row) {
				$data["id"] = $row["id"];
				$data["list"] = $row["list"];
				$data["originalName"] = $row["originalName"];
				$data["generatedName"] = $row["generatedName"];
				$data["editor"] = $row["editor"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * PUT updateImage
 * Summary: Met à jour une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/image/{id}', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$list = $queryParams['list'];
	$originalName = $queryParams['originalName'];
	$generatedName = $queryParams['generatedName'];
	$editor = $queryParams['editor'];

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Image` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			if ($list != "" && $originalName != "" && $generatedName != "") {
				$req = $req = "UPDATE `Image` SET list = :newList, originalName = :newOriginalName, generatedName = :newGeneratedName, editor = :newEditor WHERE id = ".$id;
				$result = $DB->prepare($req);		
				$result->execute(array('newList' => $list, 'newOriginalName' => $originalName, 'newGeneratedName' => $generatedName, 'newEditor' => $editor));		
				$data['message'] = 'successful operation';
			} else {
				$data['message'] = 'an error has occurred : list, originalName or generatedName is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * DELETE deleteImage
 * Summary: Supprime une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/image/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
	
	try {
		$DB = connect();
		
		/* Début suppression image serveur physique */
		
		$req_img = 'SELECT * FROM `Image` WHERE id = '.$id;
		$result_img = $DB->query($req_img);
		$result_img = $result_img->fetchAll(PDO::FETCH_ASSOC);

		if ($result_img) {
			foreach ($result_img as $row_img) {
				$data_img["id"] = $row_img["id"];
				$data_img["list"] = $row_img["list"];
				$data_img["originalName"] = $row_img["originalName"];
				$data_img["generatedName"] = $row_img["generatedName"];
				$data_img["editor"] = $row_img["editor"];
			}
		}
		
		$file = get_path_img().$data_img["generatedName"];
		
		if (file_exists($file)) {
			unlink($file);
			$data['message_img'] = $file." removed successfully from server";
		} else {
			$data['message_img'] = "Une erreur est survenue lors de la suppression d'une image :'+".$file;
		}
		
		/* Fin suppression image serveur physique */

		$req = "DELETE FROM `Image` WHERE id=".$id;
		$result = $DB->exec($req);

		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * POST createEditor
 * Summary: Crée un nouvel éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/editor/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];
	
	try {
		$DB = connect();

		if ($name != "") {
			$req = 'INSERT INTO `Editor` (name) VALUES(:name)';
			$result = $DB->prepare($req);		
			$result = $result->execute(array('name' => $name));
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : name is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectAllEditor
 * Summary: Sélectionne tous les éditeurs
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor/selectAll', function($request, $response, $args) {

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Editor`';
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			$count = 0;
			foreach ($result as $row) {
				$data[$count]["id"] = $row["id"];
				$data[$count]["name"] = $row["name"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : table \'Editor\' is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET selectEditor
 * Summary: Sélectionne un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Editor` WHERE id ='.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			foreach ($result as $row) {
				$data["id"] = $row["id"];
				$data["name"] = $row["name"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * PUT updateEditor
 * Summary: Met à jour un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/editor/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Editor` WHERE id ='.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			if ($name != "") {
				$req = $req = "UPDATE `Editor` SET name = :newName WHERE id = ".$id;
				$result = $DB->prepare($req);		
				$result = $result->execute(array('newName' => $name));		
				$data['message'] = 'successful operation';
			} else {
				$data['message'] = 'an error has occurred : name is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * DELETE deleteEditor
 * Summary: Supprime un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/editor/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
	
	try {
		$DB = connect();

		$req = "DELETE FROM `Editor` WHERE id=".$id;
		$result = $DB->exec($req);

		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * POST createAnnotation
 * Summary: Crée une nouvelle annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/annotation/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];
	$tag = $queryParams['tag'];
	$x = $queryParams['x'];
	$y = $queryParams['y'];
	$width = $queryParams['width'];
	$height = $queryParams['height'];

	try {
		$DB = connect();

		if ($image != "" && $tag != "" && $x != "" && $y != "" && $width != "" && $height != "") {
			$req = 'INSERT INTO `Annotation` (image, tag, x, y, width, height) VALUES(:image, :tag, :x, :y, :width, :height)';
			$result = $DB->prepare($req);		
			$result = $result->execute(array('image' => $image, 'tag' => $tag, 'x' => $x, 'y' => $y, 'width' => $width, 'height' => $height));	
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : image, tag or position is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET selectAllAnnotation
 * Summary: Sélectionne toutes les annotations d'une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation/selectAll', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Annotation` WHERE image ='.$image;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			$count = 0;
			foreach ($result as $row) {
				$data[$count]["id"] = $row["id"];
				$data[$count]["image"] = $row["image"];
				$data[$count]["tag"] = $row["tag"];
				$data[$count]["x"] = $row["x"];
				$data[$count]["y"] = $row["y"];
				$data[$count]["width"] = $row["width"];
				$data[$count]["height"] = $row["height"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : no annotations available for this image';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET findAnnotation
 * Summary: Cherche une annotation en fonction de sa position sur une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation/find', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];
	$x = $queryParams['x'];
	$y = $queryParams['y'];
	$width = $queryParams['width'];
	$height = $queryParams['height'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Annotation` WHERE image = '.$image.' AND x = '.$x.' AND y = '.$y.' AND width = '.$width.' AND height = '.$height;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			foreach ($result as $row) {
				$data["id"] = $row["id"];
				$data["image"] = $row["image"];
				$data["tag"] = $row["tag"];
				$data["x"] = $row["x"];
				$data["y"] = $row["y"];
				$data["width"] = $row["width"];
				$data["height"] = $row["height"];
			}
		} else {
			$data['message'] = 'an error has occurred : annotation not found';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * PUT updateAnnotation
 * Summary: Met à jour une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/annotation/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];
	$tag = $queryParams['tag'];
	$x = $queryParams['x'];
	$y = $queryParams['y'];
	$width = $queryParams['width'];
	$height = $queryParams['height'];
	
	try {
		$DB = connect();

		$req = 'SELECT * FROM `Annotation` WHERE id ='.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			if ($image != "" && $tag != "" && $x != "" && $y != "" && $width != "" && $height != "") {
				$req = $req = "UPDATE `Annotation` SET image = :newImage, tag = :newTag, x = :newX, y = :newY, width = :newWidth, height = :newHeight WHERE id = ".$id;
				$result = $DB->prepare($req);		
				$result = $result->execute(array('newImage' => $image, 'newTag' => $tag, 'newX' => $x, 'newY' => $y, 'newWidth' => $width, 'newHeight' => $height));
				$data['message'] = 'successful operation';
			} else {
				$data['message'] = 'an error has occurred : image, tag or position is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * DELETE deleteAnnotation
 * Summary: Supprime une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/annotation/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = "DELETE FROM `Annotation` WHERE id=".$id;
		$result = $DB->exec($req);

		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * POST createRelation
 * Summary: Crée une nouvelle relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/relation/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];
	$predicate = $queryParams['predicate'];
	$annotation1 = $queryParams['annotation1'];
	$annotation2 = $queryParams['annotation2'];

	try {
		$DB = connect();

		if ($image != "" && $predicate != "" && $annotation1 != "" && $annotation2 != "") {
			$req = 'INSERT INTO `Relation` (image, predicate, annotation1, annotation2) VALUES(:image, :predicate, :annotation1, :annotation2)';
			$result = $DB->prepare($req);		
			$result = $result->execute(array('image' => $image, 'predicate' => $predicate, 'annotation1' => $annotation1, 'annotation2' => $annotation2));	
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : image, predicate, annotation1 or annotation2 is empty';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET selectAllRelation
 * Summary: Sélectionne toutes les relations d'une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/relation/selectAll', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Relation` WHERE image ='.$image;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			$count = 0;
			foreach ($result as $row) {
				$data[$count]["id"] = $row["id"];
				$data[$count]["image"] = $row["image"];
				$data[$count]["predicate"] = $row["predicate"];
				$data[$count]["annotation1"] = $row["annotation1"];
				$data[$count]["annotation2"] = $row["annotation2"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : no relations available for this image';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET selectRelation
 * Summary: Sélectionne une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/relation/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Relation` WHERE id ='.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			foreach ($result as $row) {
				$data["image"] = $row["image"];
				$data["predicate"] = $row["predicate"];
				$data["annotation1"] = $row["annotation1"];
				$data["annotation2"] = $row["annotation2"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}
	
	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * PUT updateRelation
 * Summary: Met à jour une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/relation/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	$queryParams = $request->getQueryParams();
	$image = $queryParams['image'];
	$predicate = $queryParams['predicate'];
	$annotation1 = $queryParams['annotation1'];
	$annotation2 = $queryParams['annotation2'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Relation` WHERE id ='.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			if ($image != "" && $predicate != "" && $annotation1 != "" && $annotation2 != "") {
				$req = $req = "UPDATE `Relation` SET image = :newImage, predicate = :newPredicate, annotation1 = :newAnnotation1, annotation2 = :newAnnotation2 WHERE id = ".$id;
				$result = $DB->prepare($req);		
				$result = $result->execute(array('newImage' => $image, 'newPredicate' => $predicate, 'newAnnotation1' => $annotation1, 'newAnnotation2' => $annotation2));		
				$data['message'] = 'successful operation';
			} else {
				$data['message'] = 'an error has occurred : image, predicate, annotation1 or annotation2 is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * DELETE deleteRelation
 * Summary: Supprime une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/relation/{id}', function($request, $response, $args) {

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = "DELETE FROM `Relation` WHERE id=".$id;	
		$result = $DB->exec($req);

		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch (Exception $e) {
		$data['exception'] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/* RUN APP */
$app->run();
