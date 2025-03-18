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

require '../../db_connect.php'; // Assurez-vous que ce fichier existe et configure la connexion à la base de données
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id_autoecole)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct Autoecole id.']);
    exit;
}

try {
    // Récupérer l'auto-école existante
    $fetch_post = "SELECT * FROM `autoecole` WHERE id_autoecole = :id_autoecole";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id_autoecole', $data->id_autoecole, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);

        // Récupérer les nouvelles valeurs ou conserver les anciennes si non fournies
        $nom = isset($data->nom) ? $data->nom : $row['nom'];
        $adresse = isset($data->adresse) ? $data->adresse : $row['adresse'];
        $telephone = isset($data->telephone) ? $data->telephone : $row['telephone'];
        $identifiant = isset($data->identifiant) ? $data->identifiant : $row['identifiant'];
        $mot_de_passe = isset($data->mot_de_passe) ? $data->mot_de_passe : $row['mot_de_passe'];

        // Requête SQL pour mettre à jour l'auto-école
        $update_query = "UPDATE `autoecole` SET 
            nom = :nom,
            adresse = :adresse,
            telephone = :telephone,
            identifiant = :identifiant,
            mot_de_passe = :mot_de_passe
            WHERE id_autoecole = :id_autoecole";

        $update_stmt = $conn->prepare($update_query);

        // Liaison des valeurs
        $update_stmt->bindValue(':nom', htmlspecialchars(strip_tags($nom)), PDO::PARAM_STR);
        $update_stmt->bindValue(':adresse', htmlspecialchars(strip_tags($adresse)), PDO::PARAM_STR);
        $update_stmt->bindValue(':telephone', htmlspecialchars(strip_tags($telephone)), PDO::PARAM_STR);
        $update_stmt->bindValue(':identifiant', htmlspecialchars(strip_tags($identifiant)), PDO::PARAM_STR);
        $update_stmt->bindValue(':mot_de_passe', htmlspecialchars(strip_tags($mot_de_passe)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id_autoecole', $data->id_autoecole, PDO::PARAM_INT);

        // Exécution de la requête
        if ($update_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Autoecole updated successfully'
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