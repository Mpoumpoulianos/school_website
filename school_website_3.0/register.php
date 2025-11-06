<?php
require_once 'config/database.php';

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $password2 = $_POST['password2'] ?? '';
    $email = $_POST['email'] ?? '';
    $full_name = $_POST['full_name'] ?? '';
    $user_type = $_POST['user_type'] ?? 'visitor';
    $terms = $_POST['terms'] ?? '';
    
    // Έλεγχος συμπλήρωσης πεδίων
    if(empty($username) || empty($password) || empty($email) || empty($full_name) || empty($terms)) {
        echo json_encode(['success' => false, 'error' => 'Συμπληρώστε όλα τα υποχρεωτικά πεδία']);
        exit();
    }
    
    // Έλεγχος κωδικών
    if($password !== $password2) {
        echo json_encode(['success' => false, 'error' => 'Οι κωδικοί δεν ταιριάζουν']);
        exit();
    }
    
    if(strlen($password) < 6) {
        echo json_encode(['success' => false, 'error' => 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες']);
        exit();
    }
    
    try {
        // Κρυπτογράφηση κωδικού
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("INSERT INTO users (username, password, email, full_name, user_type) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$username, $hashed_password, $email, $full_name, $user_type]);
        
        echo json_encode(['success' => true]);
        exit();
    } catch(PDOException $e) {
        if(strpos($e->getMessage(), 'UNIQUE constraint failed') !== false) {
            echo json_encode(['success' => false, 'error' => 'Το username ή email χρησιμοποιείται ήδη']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Σφάλμα κατά την εγγραφή: ' . $e->getMessage()]);
        }
        exit();
    }
}

echo json_encode(['success' => false, 'error' => 'Μη έγκυρη μέθοδος']);
?>