document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const authModal = document.getElementById("authModal");
  const editorModal = document.getElementById("editorModal");
  const closeBtns = document.querySelectorAll(".modal-close");
  const mainContent = document.getElementById("main-content");

  // Σελίδες περιεχομένου για κάθε τύπο χρήστη
  const pages = {
    home: {
      student: `<h2>Αρχική - Μαθητές</h2>
                <p>Καλωσήρθατε μαθητές! Εδώ θα βρείτε όλο το υλικό και τις ανακοινώσεις.</p>
                <ul>
                  <li>📚 Υλικό Μαθημάτων</li>
                  <li>📅 Ημερολόγιο Δραστηριοτήτων</li>
                  <li>📢 Σημαντικές Ανακοινώσεις</li>
                  <li>🏆 Αποτελέσματα & Βραβεία</li>
                </ul>`,
      teacher: `<h2>Αρχική - Εκπαιδευτικοί</h2>
                <p>Καλωσήρθατε συνάδελφοι! Πλατφόρμα διαχείρισης εκπαιδευτικού υλικού.</p>
                <ul>
                  <li>📝 Δημιουργία Νέου Υλικού</li>
                  <li>📊 Στατιστικά Παρακολούθησης</li>
                  <li>👥 Διαχείριση Μαθητών</li>
                  <li>📢 Δημοσίευση Ανακοινώσεων</li>
                </ul>`,
      visitor: `<h2>Αρχική - Επισκέπτες</h2>
                <p>Καλωσήρθατε στην ιστοσελίδα του σχολείου μας!</p>
                <ul>
                  <li>🏫 Γενικές Πληροφορίες</li>
                  <li>📞 Επικοινωνία</li>
                  <li>📅 Γεγονότα & Εκδηλώσεις</li>
                  <li>ℹ️ Πληροφορίες Εγγραφής</li>
                </ul>`
    },
    announcements: {
      student: `<h2>Ανακοινώσεις για Μαθητές</h2>
                <ul>
                  <li>📅 Η εκδρομή της Δευτέρας αναβάλλεται</li>
                  <li>🎓 Η γιορτή λήξης θα γίνει στις 15 Ιουνίου</li>
                  <li>📝 Διαγώνισμα Μαθηματικών - Δευτέρα 10:00</li>
                </ul>`,
      teacher: `<h2>Ανακοινώσεις Εκπαιδευτικών</h2>
                <ul>
                  <li>👥 Σύσκεψη Καθηγητών - Παρασκευή 14:00</li>
                  <li>📋 Προθεσμία Υποβολής Βαθμολογιών: 30/6</li>
                  <li>🎯 Εκπαιδευτικό Σεμινάριο - Σάββατο 9:00</li>
                </ul>`,
      visitor: `<h2>Γενικές Ανακοινώσεις</h2>
                <ul>
                  <li>🏫 Σχολικό Ωράριο: Δευτέρα-Παρασκευή 8:00-14:00</li>
                  <li>📞 Γραμματεία: 210-1234567</li>
                  <li>🎉 Ημέρα Ανοιχτών Πυλών: 25 Μαΐου</li>
                </ul>`
    },
    lessons: {
      student: `<h2>Υλικό Μαθημάτων</h2>
                <div class="lesson-grid">
                  <div class="lesson-card">📐 Μαθηματικά - Κεφάλαιο 5</div>
                  <div class="lesson-card">🔬 Φυσική - Πειράματα</div>
                  <div class="lesson-card">🇬🇷 Νέα Ελληνικά - Σύνθεση</div>
                  <div class="lesson-card">🌍 Ιστορία - Α' Παγκόσμιος</div>
                </div>`,
      teacher: `<h2>Διαχείριση Υλικού</h2>
                <button class="edit-btn" onclick="alert('Προσθήκη νέου υλικού')">➕ Προσθήκη Νέου Υλικού</button>
                <div class="manage-grid">
                  <div class="manage-card">✏️ Επεξεργασία Υλικού</div>
                  <div class="manage-card">📊 Προβολή Στατιστικών</div>
                  <div class="manage-card">👁️ Προεπισκόπηση</div>
                  <div class="manage-card">📤 Εξαγωγή Δεδομένων</div>
                </div>`,
      visitor: `<h2>Πληροφορίες Μαθημάτων</h2>
                <p>Το σχολείο μας προσφέρει ένα ευρύ φάσμα μαθημάτων:</p>
                <ul>
                  <li>📚 Ανθρωιστικές Επιστήμες</li>
                  <li>🔬 Θετικές Επιστήμες</li>
                  <li>🎨 Καλλιτεχνικά Μαθήματα</li>
                  <li>⚽ Αθλητικές Δραστηριότητες</li>
                </ul>`
    }
  };

  // Λειτουργίες Modal
  function openModal(modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Άνοιγμα modal σύνδεσης
  if(authBtn) {
    authBtn.addEventListener("click", () => openModal(authModal));
  }

  // Κλείσιμο modals
  closeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      const modal = this.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  // Κλείσιμο με click έξω από modal
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Κλείσιμο με Escape
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        if(modal.classList.contains('active')) closeModal(modal);
      });
    }
  });

  // Tabs switching
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Πλοήγηση στις σελίδες
  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      const userType = document.body.classList.contains('teacher-view') ? 'teacher' : 
                      document.body.classList.contains('student-view') ? 'student' : 'visitor';
      
      if (pages[page] && pages[page][userType]) {
        mainContent.innerHTML = pages[page][userType];
        
        // Προσθήκη κουμπιού επεξεργασίας για εκπαιδευτικούς
        if(userType === 'teacher' && page !== 'home') {
          const editBtn = document.createElement('button');
          editBtn.className = 'edit-btn';
          editBtn.textContent = '✏️ Επεξεργασία';
          editBtn.onclick = () => openEditor(page, userType);
          mainContent.appendChild(editBtn);
        }
      } else {
        mainContent.innerHTML = `<h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2>
                                <p>Η σελίδα είναι υπό κατασκευή.</p>`;
      }
    });
  });

  // Επεξεργασία φόρμας σύνδεσης (AJAX)
  document.getElementById("loginTab")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('login.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        alert("Σύνδεση επιτυχής!");
        closeModal(authModal);
        location.reload();
      } else {
        alert("Σφάλμα: " + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Σφάλμα σύνδεσης!");
    });
  });

  // Επεξεργασία φόρμας εγγραφής (AJAX)
  document.getElementById("registerTab")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('register.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        alert("Εγγραφή επιτυχής!");
        closeModal(authModal);
        location.reload();
      } else {
        alert("Σφάλμα: " + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Σφάλμα εγγραφής!");
    });
  });
});

// Συναρτήσεις Επεξεργασίας (για εκπαιδευτικούς)
function openEditor(sectionName, userType) {
  const editorModal = document.getElementById("editorModal");
  const content = document.querySelector('#main-content').innerHTML;
  
  document.getElementById("editorSection").value = sectionName;
  document.getElementById("editorUserType").value = userType;
  document.getElementById("editorContent").value = content;
  
  editorModal.classList.add("active");
  editorModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeEditor() {
  const editorModal = document.getElementById("editorModal");
  editorModal.classList.remove("active");
  editorModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// AJAX για αποθήκευση περιεχομένου
document.getElementById("editorForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  
  fetch('update_content.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      alert("Τα αλλαγές αποθηκεύτηκαν επιτυχώς!");
      closeEditor();
      location.reload();
    } else {
      alert("Σφάλμα: " + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Σφάλμα αποθήκευσης!");
  });
});