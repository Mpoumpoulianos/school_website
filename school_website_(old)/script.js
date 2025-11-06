document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const authModal = document.getElementById("authModal");
  const closeBtn = authModal.querySelector(".modal-close");

  function openModal() {
    authModal.classList.add("active");
    authModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
  function closeModal() {
    authModal.classList.remove("active");
    authModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  authBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  authModal.addEventListener("click", e => { if (e.target === authModal) closeModal(); });
  window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

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

  // Demo submit σύνδεσης
  document.getElementById("loginTab").addEventListener("submit", e => {
    e.preventDefault();
    alert("Συνδέθηκες επιτυχώς!");
    closeModal();
  });

  // Demo submit εγγραφής
  document.getElementById("registerTab").addEventListener("submit", e => {
    e.preventDefault();
    const pass1 = e.target.password.value;
    const pass2 = e.target.password2.value;
    if (pass1 !== pass2) {
      alert("Οι κωδικοί δεν ταιριάζουν!");
      return;
    }
    alert("Εγγραφή επιτυχής!");
    closeModal();
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    const pages = {
        home: `<h2>Αρχική</h2><p>Καλωσήρθατε στην ιστοσελίδα του σχολείου μας!</p>`,
        announcements: `<h2>Ανακοινώσεις</h2><ul><li>Η εκδρομή της Δευτέρας αναβάλλεται.</li><li>Η γιορτή λήξης θα γίνει στις 15 Ιουνίου.</li></ul>`,
        lessons: `<h2>Υλικό Μαθημάτων</h2><p>Κατεβάστε τις σημειώσεις και ασκήσεις από εδώ.</p>`,
        calendar: `<h2>Ημερολόγιο</h2><p>Δείτε όλες τις εκδηλώσεις και δραστηριότητες του σχολείου.</p>`,
        activities: `<h2>Δραστηριότητες</h2><p>Σχολικές δράσεις, όμιλοι και εκδηλώσεις.</p>`,
        contact: `<h2>Επικοινωνία</h2><p>Στείλτε μας μήνυμα στο contact@example.com</p>`,
        services: `<h2>Υπηρεσίες</h2><p>Δείτε τις εκπαιδευτικές υπηρεσίες μας.</p>`,
        products: `<h2>Προϊόντα</h2><p>Βιβλία και σχολικά είδη διαθέσιμα.</p>`,
        news: `<h2>Νέα</h2><p>Όλες οι τελευταίες ειδήσεις του σχολείου.</p>`,
        profile: `<h2>Προφίλ</h2><p>Προσωπικές ρυθμίσεις και στοιχεία.</p>`,
        settings: `<h2>Ρυθμίσεις</h2><p>Αλλάξτε τις προτιμήσεις σας.</p>`,
        help: `<h2>Βοήθεια</h2><p>Συχνές ερωτήσεις και οδηγίες χρήσης.</p>`
    };

    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            if (pages[page]) {
                mainContent.innerHTML = pages[page];
            }
        });
    });
});