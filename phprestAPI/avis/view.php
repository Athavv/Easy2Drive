<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Only GET method is allowed']);
    exit;
}

require_once '../db_connect.php';
$database = new Operations();
$pdo = $database->dbConnection();

try {
    // Requête SQL pour récupérer uniquement les avis "Publié"
    $query = "SELECT a.id_avis, a.commentaire, a.date_commentaire, e.nom, e.prenom 
              FROM avis a 
              JOIN eleve e ON a.id_eleve = e.id_eleve 
              WHERE a.statut = 'Publié' 
              ORDER BY a.date_commentaire DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $avisList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($avisList) {
        echo json_encode(['success' => 1, 'data' => $avisList]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Aucun avis publié trouvé.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
?>