<?php
/**
 * DAWAGSI Database API
 * @version 1.0.0
 */

require_once __DIR__ . '/vendor/autoload.php';

$app = new Slim\App();

/* REPAIR DATABASE */
function repair($DB) {
	$DB->exec("SET CHARACTER SET utf8");
	$req = $DB->prepare('
		CREATE TABLE IF NOT EXISTS `List` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de la liste\',
		  `name` varchar(100) NOT NULL COMMENT \'Nom de la liste\',
		  `description` varchar(255) DEFAULT NULL COMMENT \'Description de la liste\',
		  `images` text DEFAULT NULL COMMENT \'ID des images appartenant à la liste\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
		
		CREATE TABLE IF NOT EXISTS `Image` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de l\'\'image\',
		  `name` varchar(100) NOT NULL COMMENT \'Nom de l\'\'image\',
		  `path` varchar(255) NOT NULL COMMENT \'Chemin de l\'\'image\',
		  `editor` int(11) DEFAULT NULL COMMENT \'ID de l\'\'éditeur lié à l\'\'image\',
		  `annotations` text DEFAULT NULL COMMENT \'ID des annotations liées à l\'\'image\',
		  `relations` text DEFAULT NULL COMMENT \'ID des relations liées à l\'\'image\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
		
		CREATE TABLE IF NOT EXISTS `Editor` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de l\'\'éditeur\',
		  `name` varchar(100) NOT NULL COMMENT \'Nom de l\'\'éditeur\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
		
		CREATE TABLE IF NOT EXISTS `Annotation` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de l\'\'annotation\',
		  `tag` varchar(100) NOT NULL COMMENT \'Tag de l\'\'annotation\',
		  `position` text NOT NULL COMMENT \'Données de position de l\'\'annotation\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
		
		CREATE TABLE IF NOT EXISTS `Relation` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de la relation\',
		  `predicate` varchar(100) NOT NULL COMMENT \'Prédicat de relation\',
		  `annotation1` int(11) NOT NULL COMMENT \'ID de la première annotation de la relation\',
		  `annotation2` int(11) NOT NULL COMMENT \'ID de la seconde annotation de la relation\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
	');
	$req->execute();
}

/* PDO INSTANCE */
function connect() {
	$password = '6,T3PKiaWsvB';
	$user = 'skydefrc_ptut';
	$name = 'skydefrc_dawagsi';
	$server = 'localhost';
	$port = 3306;
	
	try {
		$DB = new PDO('mysql:host='.$server.':'.$port.';dbname='.$name.'',''.$user.'',''.$password.'');
		repair($DB);
		return $DB;
	} catch (Exception $e) {
		print_r($e->getMessage());
		return null;
	}
}


/**
 * GET connectDB
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
 * GET checkList
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/list', function($request, $response, $args) {
	
	try {
		$DB = connect();
		
		$req = "SHOW TABLES LIKE 'List';";
		$result = $DB->query($req)->rowCount();
		
		if ($result == 1) {
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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectLists
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
				$data[$count]["images"] = $row["images"];
				$count++;
			}
		} else {
			$data['message'] = 'an error has occurred : table \'List\' is empty';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
				$data["images"] = $row["images"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];
	$description = $queryParams['description'];
	$images = $queryParams['images'];
	
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];
		
	try {
		$DB = connect();
		
		$req = 'SELECT * FROM `List` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		
		if ($result) {
			if ($name != "") {
				$req = $req = "UPDATE `List` SET name = :newName, description = :newDescription, images = :newImages WHERE id = ".$id;
				$result = $DB->prepare($req);
				$result = $result->execute(array( 'newName' => $name, 'newDescription' => $description, 'newImages' => $images));
				$data['message'] = "successful operation";
			} else {
				$data['message'] = 'an error has occurred : name is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
		
		$req = "DELETE FROM `List` WHERE id=".$id;
		$result = $DB->exec($req);
		
		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET checkImage
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/image', function($request, $response, $args) {
	try {
		$DB = connect();
		
		$req = "SHOW TABLES LIKE 'Image';";
		$result = $DB->query($req)->rowCount();
		
		if ($result == 1) {
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
 * POST createImage
 * Summary: Crée une nouvelle image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/image/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];
	$path = $queryParams['path'];
	$editor = $queryParams['editor'];
	
	try {
		$DB = connect();

		if ($name != "" && $path != "") {
			if ($editor == "") {
				$req = 'INSERT INTO `Image` (name, path) VALUES(:name, :path)';
				$result = $DB->prepare($req);
				$result = $result->execute(array( 'name' => $name, 'path' => $path));
			} else {
				$req = 'INSERT INTO `Image` (name, path, editor) VALUES(:name, :path, :editor)';
				$result = $DB->prepare($req);
				$result = $result->execute(array('name' => $name, 'path' => $path, 'editor' => $editor));
			}
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : name or path is empty';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
				$data["name"] = $row["name"];
				$data["path"] = $row["path"];
				$data["editor"] = $row["editor"];
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
	$path = $queryParams['path'];
	$name = $queryParams['name'];
	$editor = $queryParams['editor'];
	$annotations = $queryParams['annotations'];
	$relations = $queryParams['relations'];

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		$req = 'SELECT * FROM `Image` WHERE id = '.$id;
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);

		if ($result) {
			if ($name != "" && $path != "") {
				$req = $req = "UPDATE `Image` SET name = :newName, path = :newPath, editor = :newEditor, annotations = :newAnnotations, relations = :newRelations WHERE id = ".$id;
				$result = $DB->prepare($req);		
				$result->execute(array( 'newName' => $name, 'newPath' => $path, 'newEditor' => $editor, 'newAnnotations' => $annotations,'newRelations' => $relations));		
				$data['message'] = 'successful operation';
			} else {
				$data['message'] = 'an error has occurred : name or path is empty';
			}
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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

		$req = "DELETE FROM `Image` WHERE id=".$id;
		$result = $DB->exec($req);

		if ($result) {
			$data['message'] = "successful operation";
		} else {
			$data['message'] = 'an error has occurred : id '.$id.' doesn\'t exist';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET checkEditor
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor', function($request, $response, $args) {

	try {
		$DB = connect();
		
		$req = "SHOW TABLES LIKE 'Editor';";
		$result = $DB->query($req)->rowCount();
		
		if ($result == 1) {
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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
	
});


/**
 * GET selectEditors
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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];

	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));

});


/**
 * GET checkAnnotation
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation', function($request, $response, $args) {
	try {
		$DB = connect();
		
		$req = "SHOW TABLES LIKE 'Annotation';";
		$result = $DB->query($req)->rowCount();
		
		if ($result == 1) {
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
 * POST createAnnotation
 * Summary: Crée une nouvelle annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/annotation/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$tag = $queryParams['tag'];    $position = $queryParams['position'];    
	$req = "INSERT INTO `Annotation` (tag, position) VALUES (".$tag.", ".$position.")";

	try {
		$DB = connect();
		if (($tag == "") || ($position == "")) {
			$data['message'] = 'an error has occurred : tag or position is empty';
		} else {
			$req = 'INSERT INTO `Annotation` (tag, position) VALUES(:tag, :position)';
			$result = $DB->prepare($req);		
			$result->execute(array( 'tag' => $tag, 'position' => $position));	
			$data['message'] = 'successful operation';
		}
	} catch(Exception $e){
		$response = 'Erreur : ' . $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
});


/**
 * GET selectAnnotation
 * Summary: Sélectionne une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation/{id}', function($request, $response, $args) {
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	$req = 'SELECT * FROM `Annotation` WHERE id ='.$id;
	try {
		$DB = connect();
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		foreach ($result as $row) {
			$data["tag"] = $row["tag"];
			$data["position"] = $row["position"];
		}
	} catch(Exception $e) {
		$data["message"] = 'Erreur : '.$e->getMessage();
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

	$queryParams = $request->getQueryParams();
	$tag = $queryParams['tag'];    $position = $queryParams['position'];    
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		if (($tag != "") && ($position != "")) {
			$req = $req = "UPDATE `Annotation` SET tag = :newTag, position = :newPosition WHERE id = ".$id;
			$result = $DB->prepare($req);		
			$result->execute(array('newTag' => $tag, 'newPosition' => $position));
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : tag or position is empty';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
		$DB->exec($req);
		$data['message'] = "successful operation";
	}catch(Exception $e){
		$data['message'] = 'Erreur : ' . $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
});


/**
 * GET checkRelation
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/relation', function($request, $response, $args) {
	try {
		$DB = connect();
		
		$req = "SHOW TABLES LIKE 'Relation';";
		$result = $DB->query($req)->rowCount();
		
		if ($result == 1) {
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
 * POST createRelation
 * Summary: Crée une nouvelle relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/relation/create', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$predicate = $queryParams['predicate'];    $annotation1 = $queryParams['annotation1'];    $annotation2 = $queryParams['annotation2'];    
	$req = "INSERT INTO `Relation` (predicate, annotation1, annotation2) VALUES (".$predicate.", ".$annotation1.", ".$annotation2.")";

	try {
		$DB = connect();
		if (($predicate == "") || ($annotation1 == "") || ($annotation2 == "")) {
			$data['message'] = 'an error has occurred : predicate, annotation1 or annotation2 is empty';
		} else {
			$req = 'INSERT INTO `Relation` (predicate, annotation1, annotation2) VALUES(:predicate, :annotation1, :annotation2)';
			$result = $DB->prepare($req);		
			$result->execute(array( 'predicate' => $predicate, 'annotation1' => $annotation1, 'annotation2' => $annotation2));	
			$data['message'] = 'successful operation';
		}
	} catch(Exception $e){
		$response = 'Erreur : ' . $e->getMessage();
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

	$req = 'SELECT * FROM `Relation` WHERE id ='.$id;
	try {
		$DB = connect();
		$result = $DB->query($req);
		$result = $result->fetchAll(PDO::FETCH_ASSOC);
		foreach ($result as $row) {
			$data["predicate"] = $row["predicate"];
			$data["annotation1"] = $row["annotation1"];
			$data["annotation2"] = $row["annotation2"];
		}
	} catch(Exception $e) {
		$data["message"] = 'Erreur : '.$e->getMessage();
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

	$queryParams = $request->getQueryParams();
	$predicate = $queryParams['predicate'];    $annotation1 = $queryParams['annotation1'];    $annotation2 = $queryParams['annotation2'];
	
	$json = json_encode($args);
	$json = json_decode($json, true);
	$id = (int) $json['id'];

	try {
		$DB = connect();

		if (($predicate != "") && ($annotation1 != "") && ($annotation2 != "")) {
			$req = $req = "UPDATE `Relation` SET predicate = :newPredicate, annotation1 = :newAnnotation1, annotation2 = :newAnnotation2 WHERE id = ".$id;
			$result = $DB->prepare($req);		
			$result->execute(array( 'newPredicate' => $predicate, 'newAnnotation1' => $annotation1, 'newAnnotation2' => $annotation2));		
			$data['message'] = 'successful operation';
		} else {
			$data['message'] = 'an error has occurred : predicate, annotation1 or annotation2 is empty';
		}
	} catch(Exception $e) {
		$data["exception"] = $e->getMessage();
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
		$DB->exec($req);
		$data['message'] = "successful operation";
	}catch(Exception $e){
		$data['message'] = 'Erreur : ' . $e->getMessage();
	}

	return $response->withStatus(200)
	->withHeader('Content-Type', 'application/json')
	->write(json_encode($data));
});


/* RUN APP */
$app->run();

