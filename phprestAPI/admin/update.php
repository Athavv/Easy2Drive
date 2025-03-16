<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed',
    ]);
    exit;
endif;

require '../db_connect.php'; // Assurez-vous que ce fichier existe et configure la connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_eleve)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Eleve id.']);
    exit;
}

try {
    // Récupérer l'élève existant
    $fetch_post = "SELECT * FROM `eleve` WHERE id_eleve = :id_eleve";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_eleve', $data->id_eleve, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);

        // Récupérer les données du formulaire ou utiliser les valeurs existantes
        $nom = isset($data->nom) ? $data->nom : $row['nom'];
        $prenom = isset($data->prenom) ? $data->prenom : $row['prenom'];
        $date_naissance = isset($data->date_naissance) ? $data->date_naissance : $row['date_naissance'];
        $adresse = isset($data->adresse) ? $data->adresse : $row['adresse'];
        $date_inscription = isset($data->date_inscription) ? $data->date_inscription : $row['date_inscription'];
        $npeh = isset($data->npeh) ? $data->npeh : $row['npeh'];
        $identifiant = isset($data->identifiant) ? $data->identifiant : $row['identifiant'];
        $mot_de_passe = isset($data->mot_de_passe) ? $data->mot_de_passe : $row['mot_de_passe'];
        $genre = isset($data->genre) ? $data->genre : $row['genre'];
        $id_autoecole = isset($data->id_autoecole) ? $data->id_autoecole : $row['id_autoecole'];

        // Requête SQL pour mettre à jour l'élève
        $update_query = "UPDATE `eleve` SET 
            nom = :nom,
            prenom = :prenom,
            date_naissance = :date_naissance,
            adresse = :adresse,
            date_inscription = :date_inscription,
            npeh = :npeh,
            identifiant = :identifiant,
            mot_de_passe = :mot_de_passe,
            genre = :genre,
            id_autoecole = :id_autoecole
            WHERE id_eleve = :id_eleve";

        $update_stmt = $conn->prepare($update_query);

        // Liaison des valeurs
        $update_stmt->bindValue(':nom', htmlspecialchars(strip_tags($nom)), PDO::PARAM_STR);
        $update_stmt->bindValue(':prenom', htmlspecialchars(strip_tags($prenom)), PDO::PARAM_STR);
        $update_stmt->bindValue(':date_naissance', htmlspecialchars(strip_tags($date_naissance)), PDO::PARAM_STR);
        $update_stmt->bindValue(':adresse', htmlspecialchars(strip_tags($adresse)), PDO::PARAM_STR);
        $update_stmt->bindValue(':date_inscription', htmlspecialchars(strip_tags($date_inscription)), PDO::PARAM_STR);
        $update_stmt->bindValue(':npeh', htmlspecialchars(strip_tags($npeh)), PDO::PARAM_STR);
        $update_stmt->bindValue(':identifiant', htmlspecialchars(strip_tags($identifiant)), PDO::PARAM_STR);
        $update_stmt->bindValue(':mot_de_passe', htmlspecialchars(strip_tags($mot_de_passe)), PDO::PARAM_STR);
        $update_stmt->bindValue(':genre', htmlspecialchars(strip_tags($genre)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id_autoecole', htmlspecialchars(strip_tags($id_autoecole)), PDO::PARAM_INT);
        $update_stmt->bindValue(':id_eleve', $data->id_eleve, PDO::PARAM_INT);

        // Exécution de la requête
        if ($update_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Record updated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not update. Something went wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}