<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Only GET method is allowed']);
    exit;
}

require_once '../../db_connect.php';
$database = new Operations();
$pdo = $database->dbConnection();

$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : null;

try {
    $query = "SELECT e.*, a.nom AS autoecole_nom 
              FROM eleve e 
              JOIN autoecole a ON e.id_autoecole = a.id_autoecole";

    if ($id) {
        $query .= " WHERE e.id_eleve = :id";
    } else {
        $query .= " ORDER BY e.id_eleve";
    }

    $stmt = $pdo->prepare($query);
    if ($id) $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => 1, 'data' => $id ? ($data[0] ?? null) : $data]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
