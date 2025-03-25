<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Répondre immédiatement aux requêtes OPTIONS (pré-vol)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../db_connect.php';

$database = new Operations();
$conn = $database->dbConnection();

// Récupérer les données de la requête PUT
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['id_avis']) || !isset($data['statut'])) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Données manquantes.']);
    exit;
}

try {
    $query = "UPDATE avis SET statut = :statut WHERE id_avis = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':statut', $data['statut']);
    $stmt->bindParam(':id', $data['id_avis'], PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => 1, 'message' => 'Statut mis à jour.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => 0, 'message' => 'Échec de la mise à jour.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
?>