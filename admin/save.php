<?php
// admin/save.php

// 1. Basic Security: Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// 2. Get the raw JSON data sent from our dashboard
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON data received"]);
    exit;
}

// 3. Define the path to our content.json file (one folder up)
$jsonFilePath = '../content.json';

// 4. Save the new data!
$saved = file_put_contents($jsonFilePath, json_encode($data, JSON_PRETTY_PRINT));

if ($saved) {
    echo json_encode(["status" => "success", "message" => "Database updated successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to write to content.json. Check file permissions on Hostinger."]);
}
?>