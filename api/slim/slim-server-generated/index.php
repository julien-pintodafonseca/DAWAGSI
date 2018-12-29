<?php
/**
 * DAWAGSI Database API
 * @version 1.1.0
 */

require_once __DIR__ . '/vendor/autoload.php';

$app = new Slim\App();


/**
 * POST createAnnotation
 * Summary: Crée une nouvelle annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/ptut/api/slim/annotation/create', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    $tag = $queryParams['tag'];    $x = $queryParams['x'];    $y = $queryParams['y'];    $width = $queryParams['width'];    $height = $queryParams['height'];    
            
            
            $response->write('How about implementing createAnnotation as a POST method ?');
            return $response;
            });


/**
 * DELETE deleteAnnotation
 * Summary: Supprime une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/ptut/api/slim/annotation/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing deleteAnnotation as a DELETE method ?');
            return $response;
            });


/**
 * GET findAnnotation
 * Summary: Cherche une annotation en fonction de sa position sur une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/annotation/find', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    $x = $queryParams['x'];    $y = $queryParams['y'];    $width = $queryParams['width'];    $height = $queryParams['height'];    
            
            
            $response->write('How about implementing findAnnotation as a GET method ?');
            return $response;
            });


/**
 * GET selectAllAnnotation
 * Summary: Sélectionne toutes les annotations d&#39;une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/annotation/selectAll', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    
            
            
            $response->write('How about implementing selectAllAnnotation as a GET method ?');
            return $response;
            });


/**
 * PUT updateAnnotation
 * Summary: Met à jour une annotation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/ptut/api/slim/annotation/{id}', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    $tag = $queryParams['tag'];    $x = $queryParams['x'];    $y = $queryParams['y'];    $width = $queryParams['width'];    $height = $queryParams['height'];    
            
            
            $response->write('How about implementing updateAnnotation as a PUT method ?');
            return $response;
            });


/**
 * GET checkDB
 * Summary: Vérifie la connexion à la base de données
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/database', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing checkDB as a GET method ?');
            return $response;
            });


/**
 * POST createEditor
 * Summary: Crée un nouvel éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/ptut/api/slim/editor/create', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $name = $queryParams['name'];    
            
            
            $response->write('How about implementing createEditor as a POST method ?');
            return $response;
            });


/**
 * DELETE deleteEditor
 * Summary: Supprime un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/ptut/api/slim/editor/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing deleteEditor as a DELETE method ?');
            return $response;
            });


/**
 * GET selectAllEditor
 * Summary: Sélectionne tous les éditeurs
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/editor/selectAll', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectAllEditor as a GET method ?');
            return $response;
            });


/**
 * GET selectEditor
 * Summary: Sélectionne un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/editor/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectEditor as a GET method ?');
            return $response;
            });


/**
 * PUT updateEditor
 * Summary: Met à jour un éditeur
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/ptut/api/slim/editor/{id}', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $name = $queryParams['name'];    
            
            
            $response->write('How about implementing updateEditor as a PUT method ?');
            return $response;
            });


/**
 * POST createImage
 * Summary: Crée une nouvelle image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/ptut/api/slim/image/create', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $list = $queryParams['list'];    $originalName = $queryParams['originalName'];    $generatedName = $queryParams['generatedName'];    $editor = $queryParams['editor'];    
            
            
            $response->write('How about implementing createImage as a POST method ?');
            return $response;
            });


/**
 * DELETE deleteImage
 * Summary: Supprime une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/ptut/api/slim/image/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing deleteImage as a DELETE method ?');
            return $response;
            });


/**
 * GET selectAllImage
 * Summary: Sélectionne toutes les images d&#39;une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/image/selectAll', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $list = $queryParams['list'];    
            
            
            $response->write('How about implementing selectAllImage as a GET method ?');
            return $response;
            });


/**
 * GET selectImage
 * Summary: Sélectionne une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/image/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectImage as a GET method ?');
            return $response;
            });


/**
 * PUT updateImage
 * Summary: Met à jour une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/ptut/api/slim/image/{id}', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $list = $queryParams['list'];    $originalName = $queryParams['originalName'];    $generatedName = $queryParams['generatedName'];    $editor = $queryParams['editor'];    
            
            
            $response->write('How about implementing updateImage as a PUT method ?');
            return $response;
            });


/**
 * POST createList
 * Summary: Crée une nouvelle liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/ptut/api/slim/list/create', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $name = $queryParams['name'];    $description = $queryParams['description'];    
            
            
            $response->write('How about implementing createList as a POST method ?');
            return $response;
            });


/**
 * DELETE deleteList
 * Summary: Supprime une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/ptut/api/slim/list/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing deleteList as a DELETE method ?');
            return $response;
            });


/**
 * GET selectAllList
 * Summary: Sélectionne toutes les listes
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/list/selectAll', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectAllList as a GET method ?');
            return $response;
            });


/**
 * GET selectList
 * Summary: Sélectionne une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/list/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectList as a GET method ?');
            return $response;
            });


/**
 * PUT updateList
 * Summary: Met à jour une liste
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/ptut/api/slim/list/{id}', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $name = $queryParams['name'];    $description = $queryParams['description'];    
            
            
            $response->write('How about implementing updateList as a PUT method ?');
            return $response;
            });


/**
 * POST createRelation
 * Summary: Crée une nouvelle relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->POST('/ptut/api/slim/relation/create', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    $predicate = $queryParams['predicate'];    $annotation1 = $queryParams['annotation1'];    $annotation2 = $queryParams['annotation2'];    
            
            
            $response->write('How about implementing createRelation as a POST method ?');
            return $response;
            });


/**
 * DELETE deleteRelation
 * Summary: Supprime une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->DELETE('/ptut/api/slim/relation/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing deleteRelation as a DELETE method ?');
            return $response;
            });


/**
 * GET selectAllRelation
 * Summary: Sélectionne toutes les relations d&#39;une image
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/relation/selectAll', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    
            
            
            $response->write('How about implementing selectAllRelation as a GET method ?');
            return $response;
            });


/**
 * GET selectRelation
 * Summary: Sélectionne une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->GET('/ptut/api/slim/relation/{id}', function($request, $response, $args) {
            
            
            
            
            $response->write('How about implementing selectRelation as a GET method ?');
            return $response;
            });


/**
 * PUT updateRelation
 * Summary: Met à jour une relation
 * Notes: 
 * Output-Formats: [application/json]
 */
$app->PUT('/ptut/api/slim/relation/{id}', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $image = $queryParams['image'];    $predicate = $queryParams['predicate'];    $annotation1 = $queryParams['annotation1'];    $annotation2 = $queryParams['annotation2'];    
            
            
            $response->write('How about implementing updateRelation as a PUT method ?');
            return $response;
            });



$app->run();
