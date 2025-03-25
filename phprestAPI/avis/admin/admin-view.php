<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../../db_connect.php';

$database = new Operations();
$pdo = $database->dbConnection();

try {
    $query = "SELECT a.*, e.nom, e.prenom 
              FROM avis a
              JOIN eleve e ON a.id_eleve = e.id_eleve
              ORDER BY a.date_commentaire DESC";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $avisList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Debug : Afficher le résultat SQL
    error_log(print_r($avisList, true));
    
    echo json_encode(['success' => 1, 'data' => $avisList]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
}
?>