<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Bad Request! Only PUT method is allowed']);
    exit;
}

require '../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_avis) || !isset($data->statut)) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Veuillez fournir l\'ID de l\'avis et le nouveau statut.']);
    exit;
}

try {
    $id_avis = intval($data->id_avis);
    $statut = htmlspecialchars(trim($data->statut));

    // Vérifier si l'avis existe
    $query_check = "SELECT id_avis FROM avis WHERE id_avis = :id_avis";
    $stmt_check = $conn->prepare($query_check);
    $stmt_check->bindValue(':id_avis', $id_avis, PDO::PARAM_INT);
    $stmt_check->execute();

    if ($stmt_check->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'L\'avis spécifié n\'existe pas.']);
        exit;
    }

    // Mettre à jour l'avis
    $query = "UPDATE avis SET statut = :statut WHERE id_avis = :id_avis";
    
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':statut', $statut, PDO::PARAM_STR);
    $stmt->bindValue(':id_avis', $id_avis, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => 1, 'message' => 'Avis mis à jour avec succès.']);
        exit;
    }

    throw new Exception('Erreur lors de la mise à jour de l\'avis.');
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
    exit;
}
?>