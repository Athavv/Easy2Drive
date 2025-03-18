<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../db_connect.php'; // Connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

if (!isset($_GET['id_eleve'])) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID de l\'élève manquant.']);
    exit;
}

$id_eleve = filter_var($_GET['id_eleve'], FILTER_VALIDATE_INT);

if (!$id_eleve) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID de l\'élève invalide.']);
    exit;
}

try {
    $query = "SELECT * FROM test WHERE id_eleve = :id_eleve";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_eleve', $id_eleve, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(['success' => 1, 'data' => $scores]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Aucun score trouvé pour cet élève.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}