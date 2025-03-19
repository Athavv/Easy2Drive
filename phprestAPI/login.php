<?php
// Démarrer la session au début du script
session_start();

// En-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Gérer les requêtes OPTIONS (pré-vérification CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
require_once 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Lire les données JSON envoyées dans la requête
$data = json_decode(file_get_contents("php://input"));

// Vérifier que toutes les données requises sont présentes
if (!isset($data->identifiant) || !isset($data->mot_de_passe) || !isset($data->role)) {
    http_response_code(400);
    echo json_encode(['success' => 0, 'message' => 'Données manquantes.']);
    exit;
}

// Nettoyer et valider les données
$identifiant = htmlspecialchars(trim($data->identifiant));
$mot_de_passe = htmlspecialchars(trim($data->mot_de_passe));
$role = htmlspecialchars(trim($data->role)); // 'admin' ou 'eleve'

try {
    // Déterminer la table à interroger en fonction du rôle
    if ($role === 'admin') {
        $query = "SELECT id_admin, nom, mot_de_passe FROM admin WHERE identifiant = :identifiant";
    } elseif ($role === 'eleve') {
        $query = "SELECT id_eleve, nom, mot_de_passe FROM eleve WHERE identifiant = :identifiant";
    } else {
        http_response_code(400);
        echo json_encode(['success' => 0, 'message' => 'Rôle invalide.']);
        exit;
    }

    // Préparer et exécuter la requête SQL
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':identifiant', $identifiant, PDO::PARAM_STR);
    $stmt->execute();

    // Vérifier si un utilisateur a été trouvé
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Vérifier le mot de passe
        if (password_verify($mot_de_passe, $user['mot_de_passe'])) {
            // Mot de passe correct : stocker les informations de session
            $_SESSION['user_id'] = $role === 'admin' ? $user['id_admin'] : $user['id_eleve'];
            $_SESSION['role'] = $role;

            // Réponse JSON en cas de succès
            http_response_code(200);
            echo json_encode([
                'success' => 1,
                'message' => 'Connexion réussie.',
                'user' => [
                    'id' => $user[$role === 'admin' ? 'id_admin' : 'id_eleve'],
                    'nom' => $user['nom'],
                    'role' => $role
                ]
            ]);
        } else {
            // Mot de passe incorrect
            http_response_code(401);
            echo json_encode(['success' => 0, 'message' => 'Identifiant ou mot de passe incorrect.']);
        }
    } else {
        // Utilisateur non trouvé
        http_response_code(404);
        echo json_encode(['success' => 0, 'message' => 'Utilisateur non trouvé.']);
    }
} catch (PDOException $e) {
    // Gestion des erreurs de base de données
    http_response_code(500);
    echo json_encode(['success' => 0, 'message' => 'Erreur serveur : ' . $e->getMessage()]);
}