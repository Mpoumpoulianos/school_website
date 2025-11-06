<?php
session_start();
require_once 'config/database.php';

header('Content-Type: application/json');

// Έλεγχος αν ο χρήστης είναι εκπαιδευτικός
if(!isset($_SESSION['user_id']) || $_SESSION['user_type'] != 'teacher') {
    echo json_encode(['success' => false, 'error' => 'Δεν έχετε δικαίωμα ανεβάσματος αρχείων']);
    exit();
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $file_title = $_POST['file_title'] ?? '';
    $file_description = $_POST['file_description'] ?? '';
    
    if(empty($file_title)) {
        echo json_encode(['success' => false, 'error' => 'Συμπληρώστε τον τίτλο του αρχείου']);
        exit();
    }
    
    // Έλεγχος αν υπάρχει αρχείο
    if(!isset($_FILES['file_upload']) || $_FILES['file_upload']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'error' => 'Δεν επιλέχθηκε αρχείο ή υπήρξε σφάλμα']);
        exit();
    }
    
    $uploaded_file = $_FILES['file_upload'];
    $allowed_types = ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx'];
    $file_extension = strtolower(pathinfo($uploaded_file['name'], PATHINFO_EXTENSION));
    
    if(!in_array($file_extension, $allowed_types)) {
        echo json_encode(['success' => false, 'error' => 'Μη επιτρεπτός τύπος αρχείου. Επιτρέπονται: PDF, DOC, DOCX, TXT, PPT, PPTX']);
        exit();
    }
    
    // Δημιουργία φακέλου uploads αν δεν υπάρχει
    $upload_dir = 'uploads/';
    if(!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Δημιουργία μοναδικού ονόματος αρχείου
    $filename = uniqid() . '_' . basename($uploaded_file['name']);
    $filepath = $upload_dir . $filename;
    
    if(move_uploaded_file($uploaded_file['tmp_name'], $filepath)) {
        // Αποθήκευση πληροφοριών στη βάση
        try {
            $stmt = $pdo->prepare("INSERT INTO uploaded_files (title, description, filename, original_name, file_type, uploaded_by, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)");
            $stmt->execute([$file_title, $file_description, $filename, $uploaded_file['name'], $file_extension, $_SESSION['user_id']]);
            
            echo json_encode(['success' => true, 'message' => 'Το αρχείο ανέβηκε επιτυχώς!']);
        } catch(PDOException $e) {
            unlink($filepath); // Διαγραφή αρχείου αν αποτύχει η βάση
            echo json_encode(['success' => false, 'error' => 'Σφάλμα αποθήκευσης: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Σφάλμα κατά το ανέβασμα του αρχείου']);
    }
}
?>