<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Méthode non autorisée. Seule la méthode DELETE est acceptée.']);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Récupérer l'ID depuis les paramètres GET
$id_test = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : null;

if (!$id_test) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID du test manquant ou invalide.']);
    exit;
}

try {
    // Vérifier si le test existe
    $check_query = "SELECT * FROM test WHERE id_test = :id_test";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bindParam(':id_test', $id_test, PDO::PARAM_INT);
    $check_stmt->execute();

    if ($check_stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Aucun test trouvé avec cet ID.']);
        exit;
    }

    // Supprimer le test
    $delete_query = "DELETE FROM test WHERE id_test = :id_test";
    $delete_stmt = $conn->prepare($delete_query);
    $delete_stmt->bindParam(':id_test', $id_test, PDO::PARAM_INT);

    if ($delete_stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => 1, 'message' => 'Test supprimé avec succès.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => 0, 'message' => 'Échec de la suppression du test.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}