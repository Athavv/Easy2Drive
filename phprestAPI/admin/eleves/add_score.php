<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow OPTIONS method
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../../db_connect.php'; // Connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->id_eleve) ||
    !isset($data->theme) ||
    !isset($data->date_test) ||
    !isset($data->score)
) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Données manquantes.']);
    exit;
}

try {
    $query = "INSERT INTO test (id_eleve, theme, date_test, score) VALUES (:id_eleve, :theme, :date_test, :score)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_eleve', $data->id_eleve, PDO::PARAM_INT);
    $stmt->bindParam(':theme', $data->theme, PDO::PARAM_STR);
    $stmt->bindParam(':date_test', $data->date_test, PDO::PARAM_STR);
    $stmt->bindParam(':score', $data->score, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => 1, 'message' => 'Score ajouté avec succès.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => 0, 'message' => 'Erreur lors de l\'ajout du score.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}