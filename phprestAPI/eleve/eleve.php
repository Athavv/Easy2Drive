<?php
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Autoriser les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$id_eleve = $_GET['id'];

try {
    $query = "SELECT * FROM eleve WHERE id_eleve = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id_eleve, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $eleve = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($eleve);
    } else {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Élève non trouvé.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => 'Erreur serveur : ' . $e->getMessage()]);
}