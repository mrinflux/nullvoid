// =========================================================
// MRINMOY SINGHA — WEBSITE JAVASCRIPT
// =========================================================


// ================= THEME =================

const root = document.documentElement;
const themeButton = document.getElementById("theme");


// Safe localStorage helpers (storage can be blocked in private mode)
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
    // ignore: theme still works for this visit
  }
}


// Apply a theme and update the button
function applyTheme(theme) {
  const isDark = theme === "dark";

  root.dataset.theme = isDark ? "dark" : "light";

  if (themeButton) {
    themeButton.textContent = isDark ? "☀" : "☾";

    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}


// Saved theme first, otherwise follow the system setting
const savedTheme = getStoredTheme();

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

applyTheme(
  savedTheme || (systemPrefersDark ? "dark" : "light")
);


// ================= THEME TOGGLE =================

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const newTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    storeTheme(newTheme);
  });
}