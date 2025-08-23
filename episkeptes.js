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
