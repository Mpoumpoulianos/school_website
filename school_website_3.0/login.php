<?php
session_start();
require_once 'config/database.php';

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if(empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'Συμπληρώστε όλα τα πεδία']);
        exit();
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['user_type'] = $user['user_type'];
            $_SESSION['email'] = $user['email'];
            
            echo json_encode(['success' => true]);
            exit();
        } else {
            echo json_encode(['success' => false, 'error' => 'Λάθος email ή κωδικός πρόσβασης']);
            exit();
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Σφάλμα βάσης δεδομένων: ' . $e->getMessage()]);
        exit();
    }
}

echo json_encode(['success' => false, 'error' => 'Μη έγκυρη μέθοδος']);
?>