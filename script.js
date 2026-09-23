// =========================================================
// MRINMOY SINGHA — CONTROL SYSTEMS WEBSITE
// =========================================================


// ================= THEME =================

const root = document.documentElement;
const themeButton = document.getElementById("theme");


function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}


function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Theme still works for this visit.
  }
}


function applyTheme(theme) {

  const isDark = theme === "dark";

  root.dataset.theme = isDark ? "dark" : "light";

  if (themeButton) {

    themeButton.textContent = isDark ? "☀" : "☾";

    themeButton.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }
}


const savedTheme = getStoredTheme();

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;


applyTheme(
  savedTheme ||
  (systemPrefersDark ? "dark" : "light")
);


// ================= THEME TOGGLE =================

if (themeButton) {

  themeButton.addEventListener("click", () => {

    const newTheme =
      root.dataset.theme === "dark"
        ? "light"
        : "dark";

    applyTheme(newTheme);

    storeTheme(newTheme);
  });
}


// ================= SYSTEM STATUS =================

// Gives the hero a subtle "alive" state-system feel.

const statusDot =
  document.querySelector(".status-dot");


if (statusDot) {

  let phase = 0;

  function updateSystem() {

    phase += 0.025;

    const intensity =
      0.55 +
      Math.sin(phase) * 0.35;

    statusDot.style.opacity =
      intensity.toFixed(2);

    requestAnimationFrame(updateSystem);
  }

  updateSystem();
}


// ================= CURRENT YEAR =================

const yearElements =
  document.querySelectorAll("[data-year]");


yearElements.forEach((element) => {
  element.textContent =
    new Date().getFullYear();
});