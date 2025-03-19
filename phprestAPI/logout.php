<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();
session_unset();
session_destroy();

http_response_code(200);
echo json_encode(['success' => 1, 'message' => 'Déconnexion réussie.']);