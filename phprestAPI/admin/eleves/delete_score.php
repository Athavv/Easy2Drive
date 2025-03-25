<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected. HTTP method should be DELETE',
    ]);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : null;

if (!$id) {
    echo json_encode(['success' => 0, 'message' => 'Veuillez fournir un ID valide pour le score.']);
    exit;
}

try {
    // Vérifier si le score existe
    $fetch_score = "SELECT * FROM `test` WHERE id_test=:id";
    $fetch_stmt = $conn->prepare($fetch_score);
    $fetch_stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) {
        // Supprimer le score
        $delete_score = "DELETE FROM `test` WHERE id_test=:id";
        $delete_stmt = $conn->prepare($delete_score);
        $delete_stmt->bindValue(':id', $id, PDO::PARAM_INT);

        if ($delete_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Score supprimé avec succès'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Impossible de supprimer. Une erreur est survenue.'
        ]);
        exit;
    } else {
        echo json_encode(['success' => 0, 'message' => 'ID invalide. Aucun score trouvé avec cet ID.']);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}