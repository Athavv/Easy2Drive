<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../db_connect.php';
$database = new Operations();
$pdo = $database->dbConnection();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['id_eleve'])) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID élève manquant']);
    exit;
}

$eleveId = (int)$_GET['id_eleve'];

try {
    $query = "SELECT a.*, e.nom, e.prenom 
              FROM avis a
              JOIN eleve e ON a.id_eleve = e.id_eleve
              WHERE a.id_eleve = :id_eleve
              ORDER BY a.date_commentaire DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id_eleve', $eleveId, PDO::PARAM_INT);
    $stmt->execute();
    $avisList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => 1, 'data' => $avisList]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}