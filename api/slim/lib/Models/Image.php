<?php
/*
 * Image
 */
namespace \Models;

/*
 * Image
 */
class Image {
    /* @var int $id ID de l&#39;image */
    private $id;
/* @var string $path Chemin de l&#39;image */
    private $path;
/* @var string $name Nom de l&#39;image */
    private $name;
/* @var int $editor ID de l&#39;éditeur lié à l&#39;image */
    private $editor;
/* @var int[] $annotations ID des annotations liées à l&#39;image */
    private $annotations;
/* @var int[] $relations ID des relations liées à l&#39;image */
    private $relations;
}
