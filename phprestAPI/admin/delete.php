<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

require '../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : null;

if (!$id) {
    echo json_encode(['success' => 0, 'message' => 'Veuillez fournir un ID valide pour l\'élève.']);
    exit;
}

try {
    $fetch_eleve = "SELECT * FROM `eleve` WHERE id_eleve=:id";
    $fetch_stmt = $conn->prepare($fetch_eleve);
    $fetch_stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) {
        $delete_eleve = "DELETE FROM `eleve` WHERE id_eleve=:id";
        $delete_stmt = $conn->prepare($delete_eleve);
        $delete_stmt->bindValue(':id', $id, PDO::PARAM_INT);

        if ($delete_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Élève supprimé avec succès'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Impossible de supprimer. Une erreur est survenue.'
        ]);
        exit;
    } else {
        echo json_encode(['success' => 0, 'message' => 'ID invalide. Aucun élève trouvé avec cet ID.']);
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
