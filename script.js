// script.js for Web Dev Day 2026
// This file is connected at the bottom of index.html
 
// ---------- 1. Countdown to the event ----------
 
const countdown = document.getElementById("countdown");
 
// Months start from 0 in JavaScript, so 11 means December
const eventDate = new Date(2026, 11, 12);
const today = new Date();
 
// One day has 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
const oneDay = 24 * 60 * 60 * 1000;
const daysLeft = Math.ceil((eventDate - today) / oneDay);
 
if (daysLeft > 1) {
  countdown.textContent = daysLeft + " days left to register";
} else if (daysLeft === 1) {
  countdown.textContent = "Only 1 day left";
} else {
  countdown.textContent = "Registration is closed";
}
 
// ---------- 2. Character counter for the question box ----------
 
const questionBox = document.getElementById("message");
const charCount = document.getElementById("char-count");
 
questionBox.addEventListener("input", function () {
  charCount.textContent = questionBox.value.length + " / 200 characters";
});
 
// ---------- 3. Form validation and confirmation message ----------
 
const form = document.getElementById("register-form");
const formMessage = document.getElementById("form-message");
 
// A small helper function to show a message on the page
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
  formMessage.hidden = false;
}
 
form.addEventListener("submit", function (event) {
  // Stop the page from reloading
  event.preventDefault();
 
  // Read the values the user typed
  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const year = document.querySelector('input[name="year"]:checked').value;
  const checkedSessions = document.querySelectorAll('input[name="session"]:checked');
 
  // Check 1: name must have at least 3 letters
  if (name.length < 3) {
    showMessage("Please enter your full name (at least 3 letters).", "error");
    return;
  }
 
  // Check 2: at least one session must be selected
  if (checkedSessions.length === 0) {
    showMessage("Please choose at least one session.", "error");
    return;
  }
 
  // Collect the names of the selected sessions
  const sessionNames = [];
  checkedSessions.forEach(function (box) {
    sessionNames.push(box.parentElement.textContent.trim());
  });
 
  // Show the success message
  showMessage(
    "Thank you, " + name + ". You are registered as a " + year + " year student for: " +
    sessionNames.join(", ") + ". We will send a confirmation to " + email + ".",
    "success"
  );
 
  // Clear the form and the counter
  form.reset();
  charCount.textContent = "0 / 200 characters";
});
 
// When Reset is clicked, hide the old message too
form.addEventListener("reset", function () {
  formMessage.hidden = true;
  charCount.textContent = "0 / 200 characters";
});
 