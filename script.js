// FOODIE reservation form connection
// This endpoint belongs to the FOODIE Google Apps Script web app.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbypgnUE-TQHlqkNWujl2B_EjvkmcjVUF71_uL0wmOREEJEUJ96nri6Azr9EFkNbq40UmA/exec";

const form = document.getElementById("reservationForm");
const statusMessage = document.getElementById("formStatus");
const dateInput = form.querySelector('input[name="date"]');

// Prevent customers from selecting a date in the past.
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  const formData = new FormData(form);
  const payload = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    payload.append(key, String(value).trim());
  }

  statusMessage.textContent = "Sending your reservation request…";
  statusMessage.className = "form-status";
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";

  try {
    // Apps Script accepts URL-encoded form parameters through e.parameter.
    // no-cors is used because Apps Script does not provide browser CORS headers.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    statusMessage.textContent =
      "Your request has been sent. Thank you! Our team will contact you to confirm your reservation.";
    statusMessage.className = "form-status success";
    form.reset();
    dateInput.min = localToday;
  } catch (error) {
    console.error("FOODIE reservation submission error:", error);
    statusMessage.textContent =
      "We couldn't send your request just now. Please check your internet connection and try again.";
    statusMessage.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
