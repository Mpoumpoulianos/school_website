<?php
session_start();
require_once 'config/database.php';

// Αποσύνδεση αν ζητηθεί
if(isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit();
}

// Προσαρμογή περιεχομένου βάσει τύπου χρήστη
$user_type = 'visitor'; // Προεπιλογή
if(isset($_SESSION['user_type'])) {
    $user_type = $_SESSION['user_type'];
}

// Ανάκτηση περιεχομένου για τον συγκεκριμένο τύπο χρήστη
$stmt = $pdo->prepare("SELECT content FROM page_content WHERE section_name = 'welcome' AND user_type = ?");
$stmt->execute([$user_type]);
$content = $stmt->fetch(PDO::FETCH_ASSOC);
$welcome_content = $content ? $content['content'] : 'Καλωσήρθατε στην ιστοσελίδα μας!';
?>
<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Σχολική Ιστοσελίδα - <?php echo ucfirst($user_type); ?></title>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body class="<?php echo $user_type; ?>-view">
  <!-- Header -->
  <header class="header">
    <h1>Καλωσήρθατε στην Ιστοσελίδα του Σχολείου</h1>
    
    <!-- Εμφάνιση τύπου χρήστη -->
    <div class="user-type-badge">
      <?php 
      $type_labels = [
          'student' => '👨‍🎓 Μαθητής',
          'teacher' => '👨‍🏫 Εκπαιδευτικός', 
          'visitor' => '👤 Επισκέπτης'
      ];
      echo $type_labels[$user_type];
      ?>
    </div>

    <div class="nav-row">
      <!-- Κύρια πλοήγηση -->
      <nav class="navbar">
        <a href="#" data-page="home">Αρχική</a>
        <a href="#" data-page="announcements">Ανακοινώσεις</a>
        <a href="#" data-page="lessons">Υλικό Μαθημάτων</a>
        <a href="#" data-page="calendar">Ημερολόγιο</a>
        <a href="#" data-page="activities">Δραστηριότητες</a>
        <a href="#" data-page="contact">Επικοινωνία</a>
      </nav>

      <!-- Κουμπί Σύνδεσης/Αποσύνδεσης -->
      <div class="login-wrap">
        <?php if(isset($_SESSION['user_id'])): ?>
          <span class="welcome-user">Καλώς όρισες, <?php echo $_SESSION['full_name']; ?>!</span>
          <a href="?logout=1" class="login-btn">Αποσύνδεση</a>
        <?php else: ?>
          <button id="authBtn" class="login-btn" type="button">
            Σύνδεση / Εγγραφή
          </button>
        <?php endif; ?>
      </div>
    </div>
  </header>

  <!-- Container -->
  <div class="container">
    <aside class="column left">
      <h2>Μενού</h2>
      <ul>
        <li><a href="#" data-page="home">Αρχική</a></li>
        <li><a href="#" data-page="services">Υπηρεσίες</a></li>
        <li><a href="#" data-page="products">Προϊόντα</a></li>
        <li><a href="#" data-page="news">Νέα</a></li>
        <?php if($user_type == 'teacher'): ?>
          <li><a href="#" data-page="admin">Διαχείριση</a></li>
        <?php endif; ?>
      </ul>
    </aside>

    <main class="column middle" id="main-content">
      <!-- Δυναμικό περιεχόμενο βάσει τύπου χρήστη -->
      <div id="welcome-section">
        <?php echo $welcome_content; ?>
        
        <?php if($user_type == 'teacher'): ?>
          <button class="edit-btn" onclick="openEditor('welcome', '<?php echo $user_type; ?>')">
            ✏️ Επεξεργασία Περιεχομένου
          </button>
        <?php endif; ?>
      </div>
    </main>

    <aside class="column right">
      <h2>Επιλογές Χρήστη</h2>
      <ul>
        <li><a href="#" data-page="profile">Προφίλ</a></li>
        <li><a href="#" data-page="settings">Ρυθμίσεις</a></li>
        <li><a href="#" data-page="help">Βοήθεια</a></li>
        <?php if($user_type == 'teacher'): ?>
          <li><a href="#" data-page="stats">Στατιστικά</a></li>
        <?php endif; ?>
      </ul>
    </aside>
  </div>

  <footer class="footer">
    <p>&copy; 2025 Σχολείο - Όλα τα δικαιώματα διατηρούνται.</p>
    <p>Επικοινωνία: <a href="mailto:contact@example.com">contact@example.com</a></p>
    <p>Σχεδιασμός & Ανάπτυξη από τον Mpoumpouliano</p>
  </footer>

  <!-- Modal Σύνδεσης/Εγγραφής -->
  <div id="authModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-card">
      <div class="modal-head">
        <div class="modal-title">Λογαριασμός</div>
        <button class="modal-close" type="button" aria-label="Κλείσιμο">✕</button>
      </div>
      
      <!-- Tabs -->
      <div class="tabs">
        <button class="tab-btn active" data-tab="loginTab">Σύνδεση</button>
        <button class="tab-btn" data-tab="registerTab">Εγγραφή</button>
      </div>

      <div class="modal-body">
        <!-- Φόρμα Σύνδεσης -->
        <form id="loginTab" class="tab-content active" method="POST" action="login.php">
          <div class="form-row">
            <label for="email">Email</label>
            <input class="form-input" type="email" id="email" name="email" required />
          </div>
          <div class="form-row">
            <label for="password">Κωδικός</label>
            <input class="form-input" type="password" id="password" name="password" required />
          </div>
          <div class="form-actions">
            <label style="display:flex; gap:8px;">
              <input type="checkbox" name="remember"> Να με θυμάσαι
            </label>
            <button type="submit" class="form-button">Είσοδος</button>
          </div>
        </form>

        <!-- Φόρμα Εγγραφής -->
        <form id="registerTab" class="tab-content" method="POST" action="register.php">
          <div class="form-row">
            <label for="regName">Ονοματεπώνυμο</label>
            <input class="form-input" type="text" id="regName" name="full_name" required />
          </div>
          <div class="form-row">
            <label for="regEmail">Email</label>
            <input class="form-input" type="email" id="regEmail" name="email" required />
          </div>
          <div class="form-row">
            <label for="regUsername">Όνομα Χρήστη</label>
            <input class="form-input" type="text" id="regUsername" name="username" required />
          </div>
          <div class="form-row">
            <label for="regPassword">Κωδικός</label>
            <input class="form-input" type="password" id="regPassword" name="password" minlength="8" required />
          </div>
          <div class="form-row">
            <label for="regPassword2">Επιβεβαίωση Κωδικού</label>
            <input class="form-input" type="password" id="regPassword2" name="password2" minlength="8" required />
          </div>
          <div class="form-row">
            <label for="userType">Τύπος Χρήστη</label>
            <select class="form-input" id="userType" name="user_type" required>
              <option value="student">Μαθητής</option>
              <option value="teacher">Εκπαιδευτικός</option>
              <option value="visitor">Επισκέπτης</option>
            </select>
          </div>
          <div class="form-actions">
            <label style="display:flex; gap:8px;">
              <input type="checkbox" name="terms" required> Αποδέχομαι τους όρους
            </label>
            <button type="submit" class="form-button">Εγγραφή</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Επεξεργασίας (μόνο για εκπαιδευτικούς) -->
  <div id="editorModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-card">
      <div class="modal-head">
        <div class="modal-title">Επεξεργασία Περιεχομένου</div>
        <button class="modal-close" type="button" aria-label="Κλείσιμο" onclick="closeEditor()">✕</button>
      </div>
      <div class="modal-body">
        <form id="editorForm">
          <input type="hidden" id="editorSection" name="section_name">
          <input type="hidden" id="editorUserType" name="user_type">
          <div class="form-row">
            <label for="editorContent">Περιεχόμενο:</label>
            <textarea class="form-input" id="editorContent" name="content" rows="10" style="width: 100%;"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="form-button">💾 Αποθήκευση</button>
            <button type="button" class="form-button cancel-btn" onclick="closeEditor()">❌ Ακύρωση</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="JS/script.js"></script>
</body>
</html>