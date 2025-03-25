<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Gérer la requête OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$avisId = $_GET['id'] ?? null;
$eleveId = $_GET['id_eleve'] ?? null;

// Vérifier les paramètres
if (!$avisId || !$eleveId) {
    http_response_code(400);
    echo json_encode(["success" => 0, "message" => "Paramètres manquants."]);
    exit;
}

try {
    // Vérification propriétaire
    $checkQuery = "SELECT id_avis FROM avis WHERE id_avis = ? AND id_eleve = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->execute([$avisId, $eleveId]);
    
    if ($checkStmt->rowCount() === 0) {
        http_response_code(403);
        echo json_encode(["success" => 0, "message" => "Action non autorisée."]);
        exit;
    }

    // Suppression
    $deleteQuery = "DELETE FROM avis WHERE id_avis = ?";
    $deleteStmt = $conn->prepare($deleteQuery);
    $deleteStmt->execute([$avisId]);

    echo json_encode(["success" => 1, "message" => "Avis supprimé."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => 0, "message" => $e->getMessage()]);
}