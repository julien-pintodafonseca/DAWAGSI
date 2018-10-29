<?php
function connect() {
	$password = '6,T3PKiaWsvB';
	$user = 'skydefrc_ptut';
	$name = 'skydefrc_dawagsi';
	$server = 'localhost';
	$port = 3306;
	
	try {
		$bdd = new PDO('mysql:host='.$server.':'.$port.';dbname='.$name.'',''.$user.'',''.$password.'');
		return $bdd;
	}
	catch (Exception $e) {
		die('Erreur : ' . $e->getMessage());
		return null;
	}
}

$bdd = connect();

$req = $bdd->prepare('
CREATE IS NOT EXISTS TABLE `Annotation` (
  `idAnnotation` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
');
$req->execute();

$select = 'SELECT * FROM Personne;';
$result = $bdd->query($select);

while ($data = $result->fetch())
{
?>
    <p>
	idPersonne <b><?php echo($data['idPersonne']); ?></b> | name <b><?php echo($data['name']); ?></b>.
   </p>
<?php
}

$result->closeCursor();

?>