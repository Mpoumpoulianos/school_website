<?php
session_start();
require_once 'config/database.php';

header('Content-Type: application/json');

// Έλεγχος αν ο χρήστης είναι εκπαιδευτικός
if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'teacher') {
    echo json_encode(['success' => false, 'error' => 'Δεν έχετε δικαίωμα επεξεργασίας']);
    exit();
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $section_name = $_POST['section_name'];
    $content = $_POST['content'];
    $user_type = $_POST['user_type'];
    $user_id = $_SESSION['user_id'];
    
    try {
        // Έλεγχος αν υπάρχει ήδη η ενότητα
        $stmt = $pdo->prepare("SELECT id FROM page_content WHERE section_name = ? AND user_type = ?");
        $stmt->execute([$section_name, $user_type]);
        $existing = $stmt->fetch();
        
        if($existing) {
            // Ενημέρωση υπάρχοντος
            $stmt = $pdo->prepare("UPDATE page_content SET content = ?, last_modified = NOW(), modified_by = ? WHERE section_name = ? AND user_type = ?");
            $stmt->execute([$content, $user_id, $section_name, $user_type]);
        } else {
            // Εισαγωγή νέου
            $stmt = $pdo->prepare("INSERT INTO page_content (section_name, content, user_type, modified_by) VALUES (?, ?, ?, ?)");
            $stmt->execute([$section_name, $content, $user_type, $user_id]);
        }
        
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>