<?php
try {
    // Χρήση SQLite - δεν χρειάζεται server
    $pdo = new PDO("sqlite:school_website.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Δημιουργία πινάκων
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        user_type VARCHAR(20) DEFAULT 'visitor',
        full_name VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    $pdo->exec("CREATE TABLE IF NOT EXISTS page_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section_name VARCHAR(100) NOT NULL,
        content TEXT,
        user_type VARCHAR(20) DEFAULT 'visitor',
        last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_by INTEGER
    )");
    
    // Εισαγωγή δοκιμαστικών δεδομένων
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    if($stmt->fetchColumn() == 0) {
        $hashed_password = password_hash('password123', PASSWORD_DEFAULT);
        
        $pdo->exec("INSERT INTO users (username, password, email, user_type, full_name) VALUES 
            ('teacher1', '$hashed_password', 'teacher@school.com', 'teacher', 'Καθηγητής Πρωτάρχης'),
            ('student1', '$hashed_password', 'student@school.com', 'student', 'Μαθητής Αντώνης'),
            ('visitor1', '$hashed_password', 'visitor@example.com', 'visitor', 'Επισκέπτης Γιώργος')");
        
        $pdo->exec("INSERT INTO page_content (section_name, content, user_type) VALUES 
            ('welcome', '<h2>Καλωσήρθατε Μαθητές!</h2><p>Αυτή είναι η πλατφόρμα για τους μαθητές του σχολείου. Εδώ θα βρείτε υλικό μαθημάτων, ασκήσεις και ανακοινώσεις.</p>', 'student'),
            ('welcome', '<h2>Καλωσήρθατε Συνάδελφοι!</h2><p>Πλατφόρμα εκπαιδευτικών. Μπορείτε να δημοσιεύετε υλικό, να διαχειρίζεστε ανακοινώσεις και να επεξεργάζεστε το περιεχόμενο.</p>', 'teacher'),
            ('welcome', '<h2>Καλωσήρθατε Επισκέπτες!</h2><p>Γενικές πληροφορίες για το σχολείο μας. Μπορείτε να δείτε γενικές πληροφορίες και να επικοινωνήσετε μαζί μας.</p>', 'visitor')");
    }
    
    echo "<!-- Βάση δεδομένων ready! -->";
    
} catch(PDOException $e) {
    die("Σφάλμα σύνδεσης: " . $e->getMessage());
}
?>