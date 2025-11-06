document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const authModal = document.getElementById("authModal");
  const editorModal = document.getElementById("editorModal");
  const fileUploadModal = document.getElementById("fileUploadModal");
  const closeBtns = document.querySelectorAll(".modal-close");
  const mainContent = document.getElementById("main-content");

  // Σελίδες περιεχομένου για κάθε τύπο χρήστη
  const pages = {
    home: {
      student: `<h2>Αρχική - Μαθητές</h2>
                <p>Καλωσήρθατε μαθητές! Εδώ θα βρείτε όλο το υλικό και τις ανακοινώσεις.</p>
                <div class="content-grid">
                  <div class="content-card">
                    <h3>📚 Υλικό Μαθημάτων</h3>
                    <p>Πρόσβαση σε σημειώσεις, ασκήσεις και βοηθητικό υλικό</p>
                  </div>
                  <div class="content-card">
                    <h3>📅 Ημερολόγιο</h3>
                    <p>Δείτε τις ημερομηνίες των διαγωνισμάτων και εκδηλώσεων</p>
                  </div>
                  <div class="content-card">
                    <h3>📢 Ανακοινώσεις</h3>
                    <p>Σημαντικές πληροφορίες και ανακοινώσεις του σχολείου</p>
                  </div>
                </div>`,
      teacher: `<h2>Αρχική - Εκπαιδευτικοί</h2>
                <p>Καλωσήρθατε συνάδελφοι! Πλατφόρμα διαχείρισης εκπαιδευτικού υλικού.</p>
                <div class="content-grid">
                  <div class="content-card">
                    <h3>📝 Διαχείριση Υλικού</h3>
                    <p>Δημιουργία και επεξεργασία εκπαιδευτικού υλικού</p>
                  </div>
                  <div class="content-card">
                    <h3>📊 Στατιστικά</h3>
                    <p>Παρακολούθηση προόδου των μαθητών</p>
                  </div>
                  <div class="content-card">
                    <h3>👥 Διαχείριση</h3>
                    <p>Διαχείριση μαθητών και δημοσίευση ανακοινώσεων</p>
                  </div>
                </div>`,
      visitor: `<h2>Αρχική - Επισκέπτες</h2>
                <p>Καλωσήρθατε στην ιστοσελίδα του σχολείου μας!</p>
                <div class="content-grid">
                  <div class="content-card">
                    <h3>🏫 Πληροφορίες</h3>
                    <p>Γενικές πληροφορίες για το σχολείο και το εκπαιδευτικό έργο</p>
                  </div>
                  <div class="content-card">
                    <h3>📞 Επικοινωνία</h3>
                    <p>Στοιχεία επικοινωνίας και ωράριο λειτουργίας</p>
                  </div>
                  <div class="content-card">
                    <h3>📅 Εκδηλώσεις</h3>
                    <p>Πληροφορίες για προσεχείς εκδηλώσεις και δραστηριότητες</p>
                  </div>
                </div>`
    },
    announcements: {
      student: `<h2>Ανακοινώσεις για Μαθητές</h2>
                <div class="announcements-list">
                  <div class="announcement">
                    <h3>📅 Αναβολή Εκδρομής</h3>
                    <p>Η εκδρομή της Δευτέρας αναβάλλεται για την επόμενη εβδομάδα λόγω καιρού.</p>
                    <span class="date">01/11/2025</span>
                  </div>
                  <div class="announcement">
                    <h3>🎓 Γιορτή Λήξης</h3>
                    <p>Η γιορτή λήξης του σχολικού έτους θα γίνει στις 15 Ιουνίου στο κεντρικό αμφιθέατρο.</p>
                    <span class="date">28/10/2025</span>
                  </div>
                  <div class="announcement">
                    <h3>📝 Διαγώνισμα Μαθηματικών</h3>
                    <p>Διαγώνισμα Μαθηματικών για όλες τις τάξεις τη Δευτέρα 10:00.</p>
                    <span class="date">25/10/2025</span>
                  </div>
                </div>`,
      teacher: `<h2>Ανακοινώσεις Εκπαιδευτικών</h2>
                <div class="announcements-list">
                  <div class="announcement">
                    <h3>👥 Σύσκεψη Καθηγητών</h3>
                    <p>Σύσκεψη καθηγητών Παρασκευή 14:00 στην αίθουσα συσκέψεων.</p>
                    <span class="date">02/11/2025</span>
                  </div>
                  <div class="announcement">
                    <h3>📋 Υποβολή Βαθμολογιών</h3>
                    <p>Προθεσμία υποβολής βαθμολογιών για το πρώτο τετράμηνο: 30/11/2025.</p>
                    <span class="date">30/10/2025</span>
                  </div>
                  <div class="announcement">
                    <h3>🎯 Εκπαιδευτικό Σεμινάριο</h3>
                    <p>Εκπαιδευτικό σεμινάριο για νέες μεθόδους διδασκαλίας Σάββατο 9:00.</p>
                    <span class="date">28/10/2025</span>
                  </div>
                </div>`,
      visitor: `<h2>Γενικές Ανακοινώσεις</h2>
                <div class="announcements-list">
                  <div class="announcement">
                    <h3>🏫 Σχολικό Ωράριο</h3>
                    <p>Το σχολείο λειτουργεί Δευτέρα-Παρασκευή 8:00-14:00.</p>
                  </div>
                  <div class="announcement">
                    <h3>📞 Γραμματεία</h3>
                    <p>Η γραμματεία είναι ανοιχτή καθημερινά 9:00-13:00. Τηλ: 210-1234567</p>
                  </div>
                  <div class="announcement">
                    <h3>🎉 Ημέρα Ανοιχτών Πυλών</h3>
                    <p>Ημέρα ανοιχτών πυλών για γονείς και ενδιαφερόμενους: 25 Μαΐου 2025.</p>
                  </div>
                </div>`
    },
    lessons: {
      student: `<h2>Υλικό Μαθημάτων</h2>
                <div class="lesson-grid">
                  <div class="lesson-card">
                    <h3>📐 Μαθηματικά</h3>
                    <p>Κεφάλαιο 5: Διαφορικός Λογισμός</p>
                    <ul>
                      <li>📎 Σημειώσεις</li>
                      <li>📝 Ασκήσεις</li>
                      <li>🎥 Βίντεο</li>
                    </ul>
                  </div>
                  <div class="lesson-card">
                    <h3>🔬 Φυσική</h3>
                    <p>Κίνηση και Δυνάμεις</p>
                    <ul>
                      <li>📎 Πειράματα</li>
                      <li>📝 Ασκήσεις</li>
                    </ul>
                  </div>
                  <div class="lesson-card">
                    <h3>🇬🇷 Νέα Ελληνικά</h3>
                    <p>Σύνθεση και Ανάλυση Κειμένου</p>
                    <ul>
                      <li>📎 Υλικό</li>
                      <li>📝 Ασκήσεις</li>
                    </ul>
                  </div>
                </div>`,
      teacher: `<h2>Διαχείριση Υλικού</h2>
                <div class="manage-actions">
                  <button class="action-btn" onclick="addNewMaterial()">➕ Προσθήκη Νέου Υλικού</button>
                  <button class="action-btn" onclick="openEditor('lessons', 'teacher')">✏️ Επεξεργασία Υλικού</button>
                </div>
                <div class="lesson-grid">
                  <div class="lesson-card">
                    <h3>📐 Μαθηματικά</h3>
                    <p>Τελευταία τροποποίηση: 25/10/2025</p>
                    <div class="lesson-actions">
                      <button class="small-btn" onclick="previewMaterial('math')">👁️ Προεπισκόπηση</button>
                      <button class="small-btn" onclick="showStats('math')">📊 Στατιστικά</button>
                    </div>
                  </div>
                  <div class="lesson-card">
                    <h3>🔬 Φυσική</h3>
                    <p>Τελευταία τροποποίηση: 20/10/2025</p>
                    <div class="lesson-actions">
                      <button class="small-btn" onclick="previewMaterial('physics')">👁️ Προεπισκόπηση</button>
                      <button class="small-btn" onclick="showStats('physics')">📊 Στατιστικά</button>
                    </div>
                  </div>
                </div>`,
      visitor: `<h2>Πληροφορίες Μαθημάτων</h2>
                <p>Το σχολείο μας προσφέρει ένα ευρύ φάσμα μαθημάτων:</p>
                <div class="info-grid">
                  <div class="info-card">
                    <h3>📚 Ανθρωιστικές Επιστήμες</h3>
                    <p>Νέα Ελληνικά, Ιστορία, Φιλοσοφία, Θρησκευτικά</p>
                  </div>
                  <div class="info-card">
                    <h3>🔬 Θετικές Επιστήμες</h3>
                    <p>Μαθηματικά, Φυσική, Χημεία, Βιολογία</p>
                  </div>
                  <div class="info-card">
                    <h3>🎨 Καλλιτεχνικά</h3>
                    <p>Ζωγραφική, Μουσική, Θέατρο</p>
                  </div>
                  <div class="info-card">
                    <h3>⚽ Αθλητικά</h3>
                    <p>Κολύμβηση, Καλαθοσφαίριση, Ποδόσφαιρο</p>
                  </div>
                </div>`
    },
    calendar: {
      student: `<h2>Ημερολόγιο Μαθητών</h2>
                <p>Οι σημαντικές ημερομηνίες του σχολικού έτους:</p>
                <div class="calendar-events">
                  <div class="event">
                    <span class="event-date">10/11</span>
                    <span class="event-title">Διαγώνισμα Μαθηματικών</span>
                  </div>
                  <div class="event">
                    <span class="event-date">15/11</span>
                    <span class="event-title">Εκδρομή Αρχαιολογικούς Χώρους</span>
                  </div>
                  <div class="event">
                    <span class="event-date">20/11</span>
                    <span class="event-title">Γιορτή Αγίου Παντελεήμονα</span>
                  </div>
                  <div class="event">
                    <span class="event-date">25/11</span>
                    <span class="event-title">Παράσταση Θεάτρου</span>
                  </div>
                </div>`,
      teacher: `<h2>Ημερολόγιο Εκπαιδευτικών</h2>
                <p>Σημαντικές ημερομηνίες για το εκπαιδευτικό προσωπικό:</p>
                <div class="calendar-events">
                  <div class="event">
                    <span class="event-date">05/11</span>
                    <span class="event-title">Σύσκεψη Τμημάτων</span>
                  </div>
                  <div class="event">
                    <span class="event-date">12/11</span>
                    <span class="event-title">Προθεσμία Βαθμολογιών</span>
                  </div>
                  <div class="event">
                    <span class="event-date">18/11</span>
                    <span class="event-title">Επιθεώρηση Εκπαιδευτικού Έργου</span>
                  </div>
                  <div class="event">
                    <span class="event-date">25/11</span>
                    <span class="event-title">Εκπαιδευτικό Σεμινάριο</span>
                  </div>
                </div>`,
      visitor: `<h2>Ημερολόγιο Εκδηλώσεων</h2>
                <p>Οι δημόσιες εκδηλώσεις του σχολείου:</p>
                <div class="calendar-events">
                  <div class="event">
                    <span class="event-date">15/11</span>
                    <span class="event-title">Ημέρα Ανοιχτών Πυλών</span>
                  </div>
                  <div class="event">
                    <span class="event-date">20/11</span>
                    <span class="event-title">Παράσταση Θεάτρου Μαθητών</span>
                  </div>
                  <div class="event">
                    <span class="event-date">25/11</span>
                    <span class="event-title">Εκθέσεις Μαθητικών Έργων</span>
                  </div>
                </div>`
    },
    activities: {
      student: `<h2>Δραστηριότητες Μαθητών</h2>
                <div class="content-grid">
                  <div class="content-card">
                    <h3>⚽ Αθλητικές Ομάδες</h3>
                    <p>Καλαθοσφαίριση, Ποδόσφαιρο, Κολύμβηση</p>
                  </div>
                  <div class="content-card">
                    <h3>🎨 Καλλιτεχνικά Εργαστήρια</h3>
                    <p>Ζωγραφική, Θέατρο, Μουσική</p>
                  </div>
                  <div class="content-card">
                    <h3>🔬 Επιστημονικοί Όμιλοι</h3>
                    <p>Φυσική, Χημεία, Πληροφορική</p>
                  </div>
                </div>`,
      teacher: `<h2>Διαχείριση Δραστηριοτήτων</h2>
                <div class="manage-actions">
                  <button class="action-btn" onclick="addNewActivity()">➕ Νέα Δραστηριότητα</button>
                  <button class="action-btn" onclick="openEditor('activities', 'teacher')">✏️ Επεξεργασία</button>
                </div>
                <div class="content-grid">
                  <div class="content-card">
                    <h3>⚽ Αθλητικές Ομάδες</h3>
                    <p>Προπονητής: Κ. Παπαδόπουλος</p>
                    <div class="lesson-actions">
                      <button class="small-btn" onclick="editActivity('sports')">✏️ Επεξεργασία</button>
                    </div>
                  </div>
                  <div class="content-card">
                    <h3>🎨 Καλλιτεχνικά Εργαστήρια</h3>
                    <p>Υπεύθυνη: Κ. Ιωαννίδου</p>
                    <div class="lesson-actions">
                      <button class="small-btn" onclick="editActivity('arts')">✏️ Επεξεργασία</button>
                    </div>
                  </div>
                </div>`,
      visitor: `<h2>Σχολικές Δραστηριότητες</h2>
                <p>Το σχολείο μας προσφέρει ποικίλες δραστηριότητες:</p>
                <div class="info-grid">
                  <div class="info-card">
                    <h3>⚽ Αθλητισμός</h3>
                    <p>Ομάδες σε διάφορα αθλήματα</p>
                  </div>
                  <div class="info-card">
                    <h3>🎨 Τέχνες</h3>
                    <p>Εργαστήρια ζωγραφικής και μουσικής</p>
                  </div>
                  <div class="info-card">
                    <h3>🔬 Επιστήμη</h3>
                    <p>Εργαστήρια και επιστημονικοί όμιλοι</p>
                  </div>
                </div>`
    },
    contact: {
      student: `<h2>Επικοινωνία</h2>
                <div class="contact-info">
                  <p><strong>Γραμματεία:</strong> Δευτέρα - Παρασκευή 8:00-14:00</p>
                  <p><strong>Τηλέφωνο:</strong> 210-1234567</p>
                  <p><strong>Email:</strong> info@school.edu.gr</p>
                  <p><strong>Διεύθυνση:</strong> Σχολική 123, Αθήνα</p>
                </div>`,
      teacher: `<h2>Επικοινωνία</h2>
                <div class="contact-info">
                  <p><strong>Γραμματεία:</strong> Δευτέρα - Παρασκευή 8:00-14:00</p>
                  <p><strong>Τηλέφωνο:</strong> 210-1234567</p>
                  <p><strong>Email:</strong> info@school.edu.gr</p>
                  <p><strong>Διεύθυνση:</strong> Σχολική 123, Αθήνα</p>
                  <p><strong>Σύσκεψεις:</strong> Παρασκευή 14:00-15:00</p>
                </div>`,
      visitor: `<h2>Επικοινωνία</h2>
                <div class="contact-info">
                  <p><strong>Γραμματεία:</strong> Δευτέρα - Παρασκευή 8:00-14:00</p>
                  <p><strong>Τηλέφωνο:</strong> 210-1234567</p>
                  <p><strong>Email:</strong> info@school.edu.gr</p>
                  <p><strong>Διεύθυνση:</strong> Σχολική 123, Αθήνα</p>
                </div>`
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
          editBtn.textContent = '✏️ Επεξεργασία Περιεχομένου';
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
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Σύνδεση...';
    submitBtn.disabled = true;
    
    fetch('login.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        alert("✅ Σύνδεση επιτυχής!");
        closeModal(authModal);
        location.reload();
      } else {
        alert("❌ " + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("❌ Σφάλμα σύνδεσης!");
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

  // Επεξεργασία φόρμας εγγραφής (AJAX)
  document.getElementById("registerTab")?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Έλεγχος όρων χρήσης
    const termsCheckbox = this.querySelector('input[name="terms"]');
    if(!termsCheckbox.checked) {
      alert("Πρέπει να αποδεχτείτε τους όρους χρήσης");
      return;
    }
    
    // Έλεγχος κωδικών
    const password = this.querySelector('#regPassword').value;
    const password2 = this.querySelector('#regPassword2').value;
    if(password !== password2) {
      alert("Οι κωδικοί δεν ταιριάζουν");
      return;
    }
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Εγγραφή...';
    submitBtn.disabled = true;
    
    fetch('register.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        alert("✅ Εγγραφή επιτυχής! Μπορείτε τώρα να συνδεθείτε.");
        closeModal(authModal);
        // Αυτόματη σύνδεση μετά την εγγραφή
        document.querySelector('.tab-btn[data-tab="loginTab"]').click();
        document.getElementById('email').value = formData.get('email');
      } else {
        alert("❌ " + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("❌ Σφάλμα εγγραφής!");
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

  // Αρχικοποίηση Ημερολογίου
  initializeCalendar();
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

// Ανέβασμα αρχείου
function openFileUpload() {
  const fileUploadModal = document.getElementById("fileUploadModal");
  fileUploadModal.classList.add("active");
  fileUploadModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeFileUpload() {
  const fileUploadModal = document.getElementById("fileUploadModal");
  fileUploadModal.classList.remove("active");
  fileUploadModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// AJAX για αποθήκευση περιεχομένου
document.getElementById("editorForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Αποθήκευση...';
  submitBtn.disabled = true;
  
  fetch('update_content.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      alert("✅ Τα αλλαγές αποθηκεύτηκαν επιτυχώς!");
      closeEditor();
      location.reload();
    } else {
      alert("❌ " + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("❌ Σφάλμα αποθήκευσης!");
  })
  .finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

// AJAX για ανέβασμα αρχείου
document.getElementById("fileUploadForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Ανέβασμα...';
  submitBtn.disabled = true;
  
  fetch('file_upload.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      alert("✅ " + data.message);
      closeFileUpload();
      this.reset();
    } else {
      alert("❌ " + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("❌ Σφάλμα ανεβάσματος αρχείου!");
  })
  .finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

// Συναρτήσεις για τα κουμπιά διαχείρισης
function addNewMaterial() {
  const newMaterialHTML = `
    <div class="content-card">
      <h3>Νέο Υλικό</h3>
      <p>Κάντε κλικ στο κουμπί επεξεργασίας για να προσθέσετε περιεχόμενο</p>
      <button class="small-btn" onclick="editThisMaterial(this)">✏️ Επεξεργασία</button>
    </div>
  `;
  document.querySelector('.lesson-grid').insertAdjacentHTML('beforeend', newMaterialHTML);
}

function editThisMaterial(button) {
  const card = button.closest('.content-card');
  const title = card.querySelector('h3').textContent;
  const content = card.innerHTML;
  
  document.getElementById("editorSection").value = 'new_material';
  document.getElementById("editorUserType").value = 'teacher';
  document.getElementById("editorContent").value = content;
  
  openEditor('new_material', 'teacher');
}

function addNewActivity() {
  const newActivityHTML = `
    <div class="content-card">
      <h3>Νέα Δραστηριότητα</h3>
      <p>Προσθέστε περιεχόμενο για τη νέα δραστηριότητα</p>
      <button class="small-btn" onclick="editThisActivity(this)">✏️ Επεξεργασία</button>
    </div>
  `;
  document.querySelector('.content-grid').insertAdjacentHTML('beforeend', newActivityHTML);
}

function editThisActivity(button) {
  const card = button.closest('.content-card');
  const content = card.innerHTML;
  
  document.getElementById("editorSection").value = 'new_activity';
  document.getElementById("editorUserType").value = 'teacher';
  document.getElementById("editorContent").value = content;
  
  openEditor('new_activity', 'teacher');
}

function editActivity(type) {
  alert(`Επεξεργασία δραστηριότητας: ${type}`);
}

function previewMaterial(subject) {
  alert(`Προεπισκόπηση υλικού για ${subject}`);
}

function showStats(subject) {
  alert(`Στατιστικά για ${subject}`);
}

// Βελτιωμένο Ημερολόγιο
function initializeCalendar() {
  const calendarEl = document.getElementById('calendar');
  const eventsEl = document.getElementById('calendar-events');
  
  if (!calendarEl) return;
  
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  // Σημαντικές ημερομηνίες
  const importantDates = {
    '2025-11-10': 'Διαγώνισμα Μαθηματικών - Όλες οι τάξεις',
    '2025-11-15': 'Εκδρομή Αρχαιολογικούς Χώρους',
    '2025-11-20': 'Γιορτή Αγίου Παντελεήμονα - Σχολική γιορτή',
    '2025-11-25': 'Παράσταση Θεάτρου Μαθητών',
    '2025-11-30': 'Προθεσμία Υποβολής Βαθμολογιών',
    '2025-12-05': 'Σύσκεψη Καθηγητών',
    '2025-12-15': 'Χριστουγεννιάτικο Μπαζάρ'
  };
  
  function renderCalendar(month, year) {
    const monthNames = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
                       'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
    
    const dayNames = ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'];
    
    const today = new Date();
    
    let calendarHTML = `
      <div class="calendar-header">
        <button class="calendar-nav-btn" onclick="changeMonth(-1)">‹ Προηγ.</button>
        <span>${monthNames[month]} ${year}</span>
        <button class="calendar-nav-btn" onclick="changeMonth(1)">Επόμ. ›</button>
      </div>
      <div class="calendar-days-header">
        ${dayNames.map(day => `<div class="day-header">${day}</div>`).join('')}
      </div>
      <div class="calendar-days">
    `;
    
    // Πρώτη μέρα του μήνα
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    
    // Προηγούμενες μέρες
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Μέρες του τρέχοντος μήνα
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const hasEvent = importantDates[dateStr];
      
      let dayClass = 'calendar-day';
      if (isToday) dayClass += ' today';
      if (hasEvent) dayClass += ' has-event';
      
      calendarHTML += `<div class="${dayClass}" data-date="${dateStr}" onclick="selectDate('${dateStr}')">${day}</div>`;
    }
    
    // Επόμενες μέρες
    const totalCells = 42; // 6 εβδομάδες * 7 μέρες
    const daysSoFar = startingDay + lastDay.getDate();
    const remainingDays = totalCells - daysSoFar;
    
    for (let day = 1; day <= remainingDays; day++) {
      calendarHTML += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendarHTML += `</div>`;
    calendarEl.innerHTML = calendarHTML;
    
    // Εμφάνιση των events της σημερινής ημέρας
    const todayStr = today.toISOString().split('T')[0];
    showEventsForDate(todayStr);
  }
  
  function showEventsForDate(dateStr) {
    const eventsEl = document.getElementById('calendar-events');
    const eventText = importantDates[dateStr];
    
    if (eventText) {
      eventsEl.innerHTML = `
        <div class="event-highlight">
          <strong>📅 ${dateStr}:</strong><br>
          ${eventText}
        </div>
      `;
    } else {
      eventsEl.innerHTML = `
        <div style="text-align: center; color: #666; font-style: italic;">
          Δεν υπάρχουν εκδηλώσεις για αυτήν την ημερομηνία
        </div>
      `;
    }
  }
  
  // Αρχική απόδοση
  renderCalendar(currentMonth, currentYear);
  
  // Ολικές συναρτήσεις
  window.changeMonth = function(direction) {
    currentMonth += direction;
    
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    
    renderCalendar(currentMonth, currentYear);
  };
  
  window.selectDate = function(dateStr) {
    // Αφαίρεση επιλογής από όλες τις μέρες
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.classList.remove('selected');
    });
    
    // Προσθήκη επιλογής στην επιλεγμένη μέρα
    const selectedDay = document.querySelector(`[data-date="${dateStr}"]`);
    if (selectedDay) {
      selectedDay.classList.add('selected');
    }
    
    // Εμφάνιση events
    showEventsForDate(dateStr);
  };
}

// Προσθήκη CSS για το ημερολόγιο
const calendarStyles = `
<style>
.calendar-section {
  position: relative;
}

.calendar-events-list {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 10px;
}

.calendar-event-item {
  padding: 8px;
  margin: 4px 0;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #007bff;
  font-size: 0.8em;
}

.calendar-event-date {
  font-weight: bold;
  color: #007bff;
}

.calendar-event-title {
  color: #333;
}

@media (max-width: 768px) {
  .calendar-events-list {
    max-height: 120px;
  }
  
  .calendar-event-item {
    padding: 6px;
    font-size: 0.75em;
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', calendarStyles);

// CSS για τα νέα στοιχεία
const additionalStyles = `
<style>
.content-grid, .lesson-grid, .info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.content-card, .lesson-card, .info-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border-left: 4px solid #007bff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.content-card:hover, .lesson-card:hover, .info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.content-card h3, .lesson-card h3, .info-card h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 1.2em;
}

.announcements-list {
  margin-top: 20px;
}

.announcement {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.announcement h3 {
  margin-bottom: 8px;
  color: #333;
}

.date {
  color: #666;
  font-size: 0.9em;
  display: block;
  margin-top: 8px;
}

.calendar-events {
  margin-top: 20px;
}

.event {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #e9ecef;
  margin-bottom: 8px;
  border-radius: 6px;
}

.event-date {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 10px;
  font-weight: bold;
}

.event-title {
  flex: 1;
}

.contact-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.contact-info p {
  margin-bottom: 10px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.calendar-day.other-month {
  color: #ccc;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);