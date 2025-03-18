<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Inclure la connexion à la base de données
include_once '../../db_connect.php'; // Assure-toi que ce fichier existe et configure la connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

// Vérifier si l'ID de l'auto-école est passé en paramètre
if (!isset($_GET['id_autoecole'])) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID de l\'auto-école manquant.']);
    exit;
}

$id_autoecole = filter_var($_GET['id_autoecole'], FILTER_VALIDATE_INT);

if (!$id_autoecole) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'ID de l\'auto-école invalide.']);
    exit;
}

try {
    // Requête SQL pour récupérer les élèves de l'auto-école
    $query = "SELECT * FROM eleve WHERE id_autoecole = :id_autoecole";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_autoecole', $id_autoecole, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $eleves = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les élèves au format JSON
        http_response_code(200);
        echo json_encode(['success' => 1, 'data' => $eleves]);
    } else {
        // Aucun élève trouvé pour cette auto-école
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Aucun élève trouvé pour cette auto-école.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}