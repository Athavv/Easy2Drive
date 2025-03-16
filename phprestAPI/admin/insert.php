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

require '../db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->nom) || !isset($data->prenom) || !isset($data->date_naissance) ||
    !isset($data->date_inscription) || !isset($data->identifiant) || !isset($data->mot_de_passe) ||
    !isset($data->genre) || !isset($data->id_autoecole)
) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Veuillez remplir tous les champs requis.']);
    exit;
}

try {
    $nom = htmlspecialchars(trim($data->nom));
    $prenom = htmlspecialchars(trim($data->prenom));
    $date_naissance = htmlspecialchars(trim($data->date_naissance));
    $adresse = isset($data->adresse) ? htmlspecialchars(trim($data->adresse)) : null;
    $date_inscription = htmlspecialchars(trim($data->date_inscription));
    $npeh = isset($data->npeh) ? intval($data->npeh) : null;
    $identifiant = htmlspecialchars(trim($data->identifiant));
    $mot_de_passe = password_hash($data->mot_de_passe, PASSWORD_DEFAULT);
    $genre = htmlspecialchars(trim($data->genre));
    $id_autoecole = intval($data->id_autoecole);

    // Vérifier si l'auto-école existe
    $query_check = "SELECT id_autoecole FROM autoecole WHERE id_autoecole = :id_autoecole";
    $stmt_check = $conn->prepare($query_check);
    $stmt_check->bindValue(':id_autoecole', $id_autoecole, PDO::PARAM_INT);
    $stmt_check->execute();

    if ($stmt_check->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'L\'auto-école spécifiée n\'existe pas.']);
        exit;
    }

    // Vérifier si l'identifiant est unique
    $query_identifiant = "SELECT id_eleve FROM eleve WHERE identifiant = :identifiant";
    $stmt_identifiant = $conn->prepare($query_identifiant);
    $stmt_identifiant->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt_identifiant->execute();

    if ($stmt_identifiant->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['success' => 0, 'message' => 'L\'identifiant est déjà utilisé.']);
        exit;
    }

    // Insertion de l'élève
    $query = "INSERT INTO eleve (nom, prenom, date_naissance, adresse, date_inscription, npeh, identifiant, mot_de_passe, genre, id_autoecole) 
              VALUES (:nom, :prenom, :date_naissance, :adresse, :date_inscription, :npeh, :identifiant, :mot_de_passe, :genre, :id_autoecole)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':prenom', $prenom, PDO::PARAM_STR);
    $stmt->bindValue(':date_naissance', $date_naissance, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':date_inscription', $date_inscription, PDO::PARAM_STR);
    $stmt->bindValue(':npeh', $npeh !== null ? $npeh : null, $npeh !== null ? PDO::PARAM_INT : PDO::PARAM_NULL);
    $stmt->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt->bindValue(':mot_de_passe', $mot_de_passe, PDO::PARAM_STR);
    $stmt->bindValue(':genre', $genre, PDO::PARAM_STR);
    $stmt->bindValue(':id_autoecole', $id_autoecole, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['success' => 1, 'message' => 'Élève ajouté avec succès.']);
        exit;
    }

    throw new Exception('Erreur lors de l\'ajout de l\'élève.');
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => $e->getMessage()]);
    echo 
    exit;
}

