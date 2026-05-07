<?php
// taz-admin101/upload.php
// Auto-converts any uploaded image to WebP and resizes to max 1200px wide.
// Client uploads a 3MB PNG — server saves an optimised ~200-400KB WebP.

session_start();
if (!isset($_SESSION['logged_in'])) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorised']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['product_image'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No file received']);
    exit;
}

$file      = $_FILES['product_image'];
$targetDir = '../assets/images/';

// ── Validate it's actually an image ──────────────────────────────────────────
$imgInfo = getimagesize($file['tmp_name']);
if ($imgInfo === false) {
    echo json_encode(['status' => 'error', 'message' => 'File is not a valid image.']);
    exit;
}

$mimeType = $imgInfo['mime'];
$allowed  = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
if (!in_array($mimeType, $allowed)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Use JPG, PNG, or WEBP.']);
    exit;
}

// ── Check GD is available for conversion ─────────────────────────────────────
if (!function_exists('imagecreatefromjpeg')) {
    // GD not available — fall back to saving original file without conversion
    $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', basename($file['name']));
    $target   = $targetDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $target)) {
        echo json_encode(['status' => 'success', 'path' => 'assets/images/' . $fileName]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Upload failed. Check folder permissions.']);
    }
    exit;
}

// ── Load image into GD based on source type ───────────────────────────────────
$sourceImage = null;
switch ($mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
        $sourceImage = imagecreatefromjpeg($file['tmp_name']);
        break;
    case 'image/png':
        $sourceImage = imagecreatefrompng($file['tmp_name']);
        break;
    case 'image/webp':
        $sourceImage = imagecreatefromwebp($file['tmp_name']);
        break;
    case 'image/gif':
        $sourceImage = imagecreatefromgif($file['tmp_name']);
        break;
}

if (!$sourceImage) {
    echo json_encode(['status' => 'error', 'message' => 'Could not process image.']);
    exit;
}

// ── Resize to max 1200px wide (preserves aspect ratio) ───────────────────────
$originalW = imagesx($sourceImage);
$originalH = imagesy($sourceImage);
$maxWidth  = 1200;

if ($originalW > $maxWidth) {
    $newW        = $maxWidth;
    $newH        = (int) round(($originalH / $originalW) * $maxWidth);
    $resized     = imagecreatetruecolor($newW, $newH);

    // Preserve transparency for PNG/WebP sources
    imagealphablending($resized, false);
    imagesavealpha($resized, true);
    $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
    imagefill($resized, 0, 0, $transparent);

    imagecopyresampled($resized, $sourceImage, 0, 0, 0, 0, $newW, $newH, $originalW, $originalH);
    imagedestroy($sourceImage);
    $sourceImage = $resized;
}

// ── Save as WebP at 82% quality ───────────────────────────────────────────────
// 82% is visually identical to the original but 70-80% smaller in file size.
$fileName  = time() . '_' . preg_replace('/\.[^.]+$/', '', preg_replace('/[^a-zA-Z0-9._-]/', '', basename($file['name']))) . '.webp';
$outputPath = $targetDir . $fileName;

$saved = imagewebp($sourceImage, $outputPath, 82);
imagedestroy($sourceImage);

if ($saved) {
    echo json_encode([
        'status'  => 'success',
        'path'    => 'assets/images/' . $fileName,
        'message' => 'Image converted to WebP and saved.',
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save WebP. Check folder permissions.']);
}
?>