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
		  `description` varchar(255) NOT NULL COMMENT \'Description de la liste\',
		  `images` text NOT NULL COMMENT \'ID des images appartenant à la liste\',
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM DEFAULT CHARSET=latin1;
		
		CREATE TABLE IF NOT EXISTS `Image` (
		  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT \'ID de l\'\'image\',
		  `path` varchar(255) NOT NULL COMMENT \'Chemin de l\'\'image\',
		  `name` varchar(100) NOT NULL COMMENT \'Nom de l\'\'image\',
		  `editeur` int(11) NOT NULL COMMENT \'ID de l\'\'éditeur lié à l\'\'image\',
		  `annotations` text NOT NULL COMMENT \'ID des annotations liées à l\'\'image\',
		  `relations` text NOT NULL COMMENT \'ID des relations liées à l\'\'image\',
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

/* $DB PDO INSTANCE */
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
	}
	catch (Exception $e) {
		//print_r('Exception : ' . $e->getMessage());
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
	$DB = connect();
	
	if ($DB) {
		$data['status'] = "Ok";
	} else {
		$data['status'] = "Unreachable";
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
	$DB = connect();
	
	$req = "
		SHOW TABLES LIKE 'List';
	";
	
	$result = $DB->query($req)->rowCount();
	
	if ($result == 1) {
		$data['status'] = "Ok";	
	} else {
		$data['status'] = "Unreachable";
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
	$name = $queryParams['name'];    $description = $queryParams['description'];    


	$response->write('How about implementing createList as a POST method ?');
	return $response;
});


/**
 * GET selectLists
 * Summary: Sélectionne toutes les listes
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/list/selectAll', function($request, $response, $args) {




	$response->write('How about implementing selectLists as a GET method ?');
	return $response;
});


/**
 * GET selectList
 * Summary: Sélectionne une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/list/{id}', function($request, $response, $args) {




	$response->write('How about implementing selectList as a GET method ?');
	return $response;
});


/**
 * PUT updateList
 * Summary: Met à jour une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/list/{id}', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$name = $queryParams['name'];    $description = $queryParams['description'];    $images = $queryParams['images'];    


	$response->write('How about implementing updateList as a PUT method ?');
	return $response;
});


/**
 * DELETE deleteList
 * Summary: Supprime une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/list/{id}', function($request, $response, $args) {




	$response->write('How about implementing deleteList as a DELETE method ?');
	return $response;
});


/**
 * GET checkImage
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/image', function($request, $response, $args) {
	$DB = connect();
	
	$req = "
		SHOW TABLES LIKE 'Image';
	";
	
	$result = $DB->query($req)->rowCount();
	
	if ($result == 1) {
		$data['status'] = "Ok";	
	} else {
		$data['status'] = "Unreachable";
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
	$path = $queryParams['path'];    $name = $queryParams['name'];    $editor = $queryParams['editor'];    


	$response->write('How about implementing createImage as a POST method ?');
	return $response;
});


/**
 * GET selectImage
 * Summary: Sélectionne une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/image/{id}', function($request, $response, $args) {




	$response->write('How about implementing selectImage as a GET method ?');
	return $response;
});


/**
 * PUT updateImage
 * Summary: Met à jour une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/image/{id}', function($request, $response, $args) {

	$queryParams = $request->getQueryParams();
	$path = $queryParams['path'];    $name = $queryParams['name'];    $editor = $queryParams['editor'];    $annotations = $queryParams['annotations'];    $relations = $queryParams['relations'];    


	$response->write('How about implementing updateImage as a PUT method ?');
	return $response;
});


/**
 * DELETE deleteImage
 * Summary: Supprime une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/image/{id}', function($request, $response, $args) {




	$response->write('How about implementing deleteImage as a DELETE method ?');
	return $response;
});


/**
 * GET checkEditor
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor', function($request, $response, $args) {
	$DB = connect();
	
	$req = "
		SHOW TABLES LIKE 'Editor';
	";
	
	$result = $DB->query($req)->rowCount();
	
	if ($result == 1) {
		$data['status'] = "Ok";	
	} else {
		$data['status'] = "Unreachable";
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


	$response->write('How about implementing createEditor as a POST method ?');
	return $response;
});


/**
 * GET selectEditors
 * Summary: Sélectionne tous les éditeurs
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor/selectAll', function($request, $response, $args) {




	$response->write('How about implementing selectEditors as a GET method ?');
	return $response;
});


/**
 * GET selectEditor
 * Summary: Sélectionne un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/editor/{id}', function($request, $response, $args) {




	$response->write('How about implementing selectEditor as a GET method ?');
	return $response;
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


	$response->write('How about implementing updateEditor as a PUT method ?');
	return $response;
});


/**
 * DELETE deleteEditor
 * Summary: Supprime un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/editor/{id}', function($request, $response, $args) {




	$response->write('How about implementing deleteEditor as a DELETE method ?');
	return $response;
});


/**
 * GET checkAnnotation
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation', function($request, $response, $args) {
	$DB = connect();
	
	$req = "
		SHOW TABLES LIKE 'Annotation';
	";
	
	$result = $DB->query($req)->rowCount();
	
	if ($result == 1) {
		$data['status'] = "Ok";	
	} else {
		$data['status'] = "Unreachable";
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


	$response->write('How about implementing createAnnotation as a POST method ?');
	return $response;
});


/**
 * GET selectAnnotation
 * Summary: Sélectionne une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/annotation/{id}', function($request, $response, $args) {




	$response->write('How about implementing selectAnnotation as a GET method ?');
	return $response;
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


	$response->write('How about implementing updateAnnotation as a PUT method ?');
	return $response;
});


/**
 * DELETE deleteAnnotation
 * Summary: Supprime une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/annotation/{id}', function($request, $response, $args) {




	$response->write('How about implementing deleteAnnotation as a DELETE method ?');
	return $response;
});


/**
 * GET checkRelation
 * Summary: Vérifie si la table est opérationnelle
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/relation', function($request, $response, $args) {
	$DB = connect();
	
	$req = "
		SHOW TABLES LIKE 'Relation';
	";
	
	$result = $DB->query($req)->rowCount();
	
	if ($result == 1) {
		$data['status'] = "Ok";	
	} else {
		$data['status'] = "Unreachable";
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


	$response->write('How about implementing createRelation as a POST method ?');
	return $response;
});


/**
 * GET selectRelation
 * Summary: Sélectionne une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/relation/{id}', function($request, $response, $args) {




	$response->write('How about implementing selectRelation as a GET method ?');
	return $response;
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


	$response->write('How about implementing updateRelation as a PUT method ?');
	return $response;
});


/**
 * DELETE deleteRelation
 * Summary: Supprime une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/relation/{id}', function($request, $response, $args) {




	$response->write('How about implementing deleteRelation as a DELETE method ?');
	return $response;
});


/* RUN APP */
$app->run();
