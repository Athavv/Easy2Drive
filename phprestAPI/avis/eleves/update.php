<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Gérer la requête OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Lire les données PUT
$data = json_decode(file_get_contents("php://input"));

// Vérifier les données
if (!isset($data->id_avis, $data->commentaire, $data->id_eleve)) {
    http_response_code(400);
    echo json_encode(["success" => 0, "message" => "Données manquantes."]);
    exit;
}

try {
    // Vérification propriétaire
    $checkQuery = "SELECT id_avis FROM avis WHERE id_avis = ? AND id_eleve = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->execute([$data->id_avis, $data->id_eleve]);
    
    if ($checkStmt->rowCount() === 0) {
        http_response_code(403);
        echo json_encode(["success" => 0, "message" => "Action non autorisée."]);
        exit;
    }

    // Mise à jour
    $updateQuery = "UPDATE avis SET commentaire = ? WHERE id_avis = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->execute([$data->commentaire, $data->id_avis]);

    echo json_encode(["success" => 1, "message" => "Avis mis à jour."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => 0, "message" => $e->getMessage()]);
}