<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../db_connect.php';

$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID manquant.']);
    exit;
}

try {
    $query = "DELETE FROM avis WHERE id_avis = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['success' => 1, 'message' => 'Avis supprimé.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
?>