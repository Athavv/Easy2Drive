<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    http_response_code(401);
    echo json_encode(['success' => 0, 'message' => 'Non connecté.']);
    exit;
}

http_response_code(200);
echo json_encode([
    'success' => 1,
    'user' => [
        'id' => $_SESSION['user_id'],
        'role' => $_SESSION['role']
    ]
]);