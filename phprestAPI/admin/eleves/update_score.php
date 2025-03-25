<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Méthode non autorisée. Seule la méthode PUT est acceptée.']);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_test) || !isset($data->theme) || !isset($data->date_test) || !isset($data->score)) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Tous les champs sont obligatoires.']);
    exit;
}

$id_test = filter_var($data->id_test, FILTER_VALIDATE_INT);
$theme = htmlspecialchars(strip_tags($data->theme));
$date_test = htmlspecialchars(strip_tags($data->date_test));
$score = filter_var($data->score, FILTER_VALIDATE_INT);

if (!$id_test || !$theme || !$date_test || $score === false) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Données invalides.']);
    exit;
}

try {
    $query = "UPDATE test SET theme = :theme, date_test = :date_test, score = :score WHERE id_test = :id_test";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':theme', $theme, PDO::PARAM_STR);
    $stmt->bindParam(':date_test', $date_test, PDO::PARAM_STR);
    $stmt->bindParam(':score', $score, PDO::PARAM_INT);
    $stmt->bindParam(':id_test', $id_test, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['success' => 1, 'message' => 'Score mis à jour avec succès.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => 0, 'message' => 'Échec de la mise à jour du score.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
?>