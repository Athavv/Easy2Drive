<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

// Récupérer la liste des auto-écoles
$query = "SELECT id, name FROM autoecoles";  // Remplace "autoecoles" par le nom de ta table contenant les auto-écoles
$stmt = $conn->prepare($query);
$stmt->execute();

$autoecoles = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $autoecoles[] = $row;
}

echo json_encode($autoecoles);
?>
