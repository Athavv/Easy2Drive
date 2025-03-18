<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Gestion de la méthode OPTIONS
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);  // Réponse OK pour la vérification CORS
    exit();
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Récupérer le paramètre 'id' s'il est passé dans l'URL
$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : null;

// Préparer la requête SQL
$query = "SELECT id_autoecole, nom, adresse FROM autoecole";

if ($id) {
    $query .= " WHERE id_autoecole = :id";
}

$stmt = $conn->prepare($query);

if ($id) {
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
}

$stmt->execute();

$autoecoles = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $autoecoles[] = $row;
}

echo json_encode($autoecoles);
?>
