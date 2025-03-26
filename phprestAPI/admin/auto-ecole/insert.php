<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => 0, 'message' => 'Méthode non autorisée']);
    exit;
}

require '../../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

// Validation des champs requis
$requiredFields = ['nom', 'adresse', 'telephone', 'identifiant', 'mot_de_passe'];
foreach ($requiredFields as $field) {
    if (!isset($data->$field)) {
        http_response_code(400);
        echo json_encode(['success' => 0, 'message' => "Champ manquant : $field"]);
        exit;
    }
}

try {
    // Préparation de la requête
    $query = "INSERT INTO autoecole 
              (nom, adresse, telephone, identifiant, mot_de_passe)
              VALUES 
              (:nom, :adresse, :telephone, :identifiant, :mot_de_passe)";
    
    $stmt = $conn->prepare($query);
    
    // Liaison des paramètres
    $stmt->bindValue(':nom', htmlspecialchars(trim($data->nom)), PDO::PARAM_STR);
    $stmt->bindValue(':adresse', htmlspecialchars(trim($data->adresse)), PDO::PARAM_STR);
    $stmt->bindValue(':telephone', htmlspecialchars(trim($data->telephone)), PDO::PARAM_STR);
    $stmt->bindValue(':identifiant', htmlspecialchars(trim($data->identifiant)), PDO::PARAM_STR);
    $stmt->bindValue(':mot_de_passe', password_hash($data->mot_de_passe, PASSWORD_DEFAULT), PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Auto-école créée avec succès',
            'id_autoecole' => $conn->lastInsertId()
        ]);
    } else {
        throw new Exception('Échec de l\'exécution de la requête');
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => 'Erreur base de données : ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => 'Erreur serveur : ' . $e->getMessage()
    ]);
}
?>