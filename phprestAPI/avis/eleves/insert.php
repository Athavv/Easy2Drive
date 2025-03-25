<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Bad Request! Only POST method is allowed']);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_eleve) || !isset($data->commentaire)) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Veuillez remplir tous les champs requis.']);
    exit;
}

try {
    $id_eleve = intval($data->id_eleve);
    $commentaire = htmlspecialchars(trim($data->commentaire));

    // Insérer l'avis
    $query = "INSERT INTO avis (id_eleve, commentaire, date_commentaire, statut) 
              VALUES (:id_eleve, :commentaire, NOW(), 'En attente')";
    
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':id_eleve', $id_eleve, PDO::PARAM_INT);
    $stmt->bindValue(':commentaire', $commentaire, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => 1, 'message' => 'Avis ajouté avec succès.']);
        exit;
    }

    throw new Exception('Erreur lors de l\'ajout de l\'avis.');
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
    exit;
}
?>