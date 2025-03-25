<?php
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Autoriser les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Votre code PHP existant...

require_once '../db_connect.php'; // Connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

// Vérifier si l'ID de l'élève est présent dans la requête
if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => 0, 'message' => 'ID de l\'élève manquant.']);
    exit;
}

// Valider et filtrer l'ID de l'élève
$id_eleve = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if (!$id_eleve) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => 0, 'message' => 'ID de l\'élève invalide.']);
    exit;
}

try {
    // Préparer et exécuter la requête SQL
    $query = "SELECT * FROM test WHERE id_eleve = :id_eleve";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_eleve', $id_eleve, PDO::PARAM_INT);
    $stmt->execute();

    // Vérifier si des résultats ont été trouvés
    if ($stmt->rowCount() > 0) {
        $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200); // OK
        echo json_encode(['success' => 1, 'data' => $scores]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(['success' => 0, 'message' => 'Aucun score trouvé pour cet élève.']);
    }
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => 0, 'message' => 'Erreur serveur : ' . $e->getMessage()]);
}