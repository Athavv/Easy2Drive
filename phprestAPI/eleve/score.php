<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");

require_once '../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$id_eleve = $_GET['id'];

try {
    $query = "SELECT * FROM examenblanc WHERE id_eleve = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id_eleve, PDO::PARAM_INT);
    $stmt->execute();

    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($scores);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => 'Erreur serveur : ' . $e->getMessage()]);
}