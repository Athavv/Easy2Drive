<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Vérification de la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => 0, "message" => "Seules les requêtes POST sont autorisées."]);
    exit;
}

// Récupération des données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérification des champs obligatoires
if (empty($data['nom']) || empty($data['prenom']) || empty($data['date_naissance']) || empty($data['identifiant']) || empty($data['mot_de_passe']) || empty($data['genre']) || empty($data['id_autoecole'])) {
    echo json_encode(["success" => 0, "message" => "Tous les champs obligatoires doivent être remplis."]);
    exit;
}

try {
    // Préparation des valeurs
    $nom = htmlspecialchars(trim($data['nom']));
    $prenom = htmlspecialchars(trim($data['prenom']));
    $date_naissance = $data['date_naissance'];
    $adresse = $data['adresse'] ?? null;
    $date_inscription = date('Y-m-d'); // Date d'inscription automatique
    $npeh = $data['npeh'] ?? null;
    $etg = $data['etg'] ?? null;
    $identifiant = htmlspecialchars(trim($data['identifiant']));
    $mot_de_passe = password_hash($data['mot_de_passe'], PASSWORD_DEFAULT);
    $genre = $data['genre'];
    $id_autoecole = $data['id_autoecole'];

    // Requête d'insertion
    $query = "INSERT INTO eleve (nom, prenom, date_naissance, adresse, date_inscription, npeh, etg, identifiant, mot_de_passe, genre, id_autoecole) 
              VALUES (:nom, :prenom, :date_naissance, :adresse, :date_inscription, :npeh, :etg, :identifiant, :mot_de_passe, :genre, :id_autoecole)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindValue(':nom', $nom, PDO::PARAM_STR);
    $stmt->bindValue(':prenom', $prenom, PDO::PARAM_STR);
    $stmt->bindValue(':date_naissance', $date_naissance, PDO::PARAM_STR);
    $stmt->bindValue(':adresse', $adresse, PDO::PARAM_STR);
    $stmt->bindValue(':date_inscription', $date_inscription, PDO::PARAM_STR);
    $stmt->bindValue(':npeh', $npeh, PDO::PARAM_STR);
    $stmt->bindValue(':etg', $etg, PDO::PARAM_STR);
    $stmt->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt->bindValue(':mot_de_passe', $mot_de_passe, PDO::PARAM_STR);
    $stmt->bindValue(':genre', $genre, PDO::PARAM_STR);
    $stmt->bindValue(':id_autoecole', $id_autoecole, PDO::PARAM_INT);

    // Exécution de la requête
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["success" => 1, "message" => "Élève ajouté avec succès."]);
        exit;
    }
    
    echo json_encode(["success" => 0, "message" => "Erreur lors de l'ajout de l'élève."]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => 0, "message" => "Erreur serveur : " . $e->getMessage()]);
    exit;
}
