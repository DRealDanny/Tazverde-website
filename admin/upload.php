<?php
// admin/upload.php
session_start();
if (!isset($_SESSION['logged_in'])) { exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['product_image'])) {
    $file = $_FILES['product_image'];
    $targetDir = "../assets/images/";
    
    // Clean up the filename (remove spaces/weird characters)
    $fileName = time() . '_' . basename($file["name"]);
    $targetFilePath = $targetDir . $fileName;

    // Check if it's actually an image
    $check = getimagesize($file["tmp_name"]);
    if($check !== false) {
        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            // Return the path relative to the root for the JSON database
            echo json_encode(["status" => "success", "path" => "assets/images/" . $fileName]);
        } else {
            echo json_encode(["status" => "error", "message" => "Upload failed."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "File is not an image."]);
    }
}
?>