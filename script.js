const TARGET_DATE = new Date("2026-08-01T00:00:00");

const welcomeScreen = document.getElementById("welcomeScreen");
const mapScreen = document.getElementById("mapScreen");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const greetingText = document.getElementById("greetingText");
const countdownText = document.getElementById("countdownText");

function calculateDaysUntil(targetDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffMs = target - today;
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

function updateCountdown() {
  const days = calculateDaysUntil(TARGET_DATE);
  countdownText.textContent = `${days} day${days === 1 ? "" : "s"} until Italy 🇮🇹`;
}

function showMapScreen(name) {
  const trimmedName = name.trim();
  greetingText.textContent = `Hi, ${trimmedName || "Traveler"}`;

  localStorage.setItem("italyTripName", trimmedName);
  updateCountdown();

  welcomeScreen.classList.remove("is-active");
  mapScreen.classList.add("is-active");
}

function restoreSavedState() {
  const savedName = localStorage.getItem("italyTripName");

  if (savedName) {
    nameInput.value = savedName;
    showMapScreen(savedName);
  }
}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showMapScreen(nameInput.value);
});

restoreSavedState();
updateCountdown();
