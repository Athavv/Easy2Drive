<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
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

if (
    !isset($data->nom) || !isset($data->adresse) || !isset($data->telephone) ||
    !isset($data->identifiant) || !isset($data->mot_de_passe)
) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Veuillez remplir tous les champs requis.']);
    exit;
}

try {
    $nom = htmlspecialchars(trim($data->nom));
    $adresse = htmlspecialchars(trim($data->adresse));
    $telephone = htmlspecialchars(trim($data->telephone));
    $identifiant = htmlspecialchars(trim($data->identifiant));
    $mot_de_passe = password_hash($data->mot_de_passe, PASSWORD_DEFAULT); 

    // Vérifier si l'identifiant est déjà utilisé
    $query_identifiant = "SELECT id_autoecole FROM autoecole WHERE identifiant = :identifiant";
    $stmt_identifiant = $conn->prepare($query_identifiant);
    $stmt_identifiant->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt_identifiant->execute();

    if ($stmt_identifiant->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['success' => 0, 'message' => 'L\'identifiant est déjà utilisé.']);
        exit;
    }

    // Requête SQL pour insérer une nouvelle auto-école
    $query = "INSERT INTO autoecole (nom, adresse, telephone, identifiant, mot_de_passe) 
              VALUES (:nom, :adresse, :telephone, :identifiant, :mot_de_passe)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':telephone', $telephone, PDO::PARAM_STR);
    $stmt->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt->bindValue(':mot_de_passe', $mot_de_passe, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => 1, 'message' => 'Auto-école ajoutée avec succès.']);
        exit;
    }

    throw new Exception('Erreur lors de l\'ajout de l\'auto-école.');
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
    exit;
}