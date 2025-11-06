<?php
require_once 'config/database.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];
    $full_name = $_POST['full_name'];
    $user_type = $_POST['user_type'];
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, password, email, full_name, user_type) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$username, $password, $email, $full_name, $user_type]);
        
        echo json_encode(['success' => true]);
        exit();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Σφάλμα κατά την εγγραφή: ' . $e->getMessage()]);
        exit();
    }
}
?>