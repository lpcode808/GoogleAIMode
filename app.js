const form = document.getElementById("search-form");
const queryInput = document.getElementById("query");
const baseUrlInput = document.getElementById("base-url");
const statusEl = document.getElementById("status");
const pasteBtn = document.getElementById("paste-btn");
const themeToggle = document.getElementById("theme-toggle");
const chips = document.querySelectorAll(".chip");

const DEFAULT_BASE_URL = "https://g.ai";
const THEME_KEY = "gai_theme";

const loadBaseUrl = () => {
  const saved = localStorage.getItem("gai_base_url");
  baseUrlInput.value = saved || DEFAULT_BASE_URL;
};

const saveBaseUrl = () => {
  const trimmed = baseUrlInput.value.trim();
  localStorage.setItem("gai_base_url", trimmed || DEFAULT_BASE_URL);
};

const buildUrl = (base, query) => {
  const trimmedBase = base.trim();
  if (!trimmedBase) return null;
  const encoded = encodeURIComponent(query.trim());

  if (/[?&]q=/.test(trimmedBase)) {
    try {
      const url = new URL(trimmedBase);
      url.searchParams.set("q", query.trim());
      return url.toString();
    } catch (error) {
      return trimmedBase.replace(/([?&]q=)[^&]*/, `$1${encoded}`);
    }
  }

  const separator = trimmedBase.includes("?") ? "&" : "?";
  return `${trimmedBase}${separator}q=${encoded}`;
};

const launchQuery = (query) => {
  const baseUrl = baseUrlInput.value || DEFAULT_BASE_URL;
  const finalUrl = buildUrl(baseUrl, query);

  if (!finalUrl) {
    statusEl.textContent = "Add a base URL in settings first.";
    return;
  }

  statusEl.textContent = "Opening G.AI…";
  window.location.assign(finalUrl);
};

const applyTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem(THEME_KEY, nextTheme);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) {
    statusEl.textContent = "Type something to launch.";
    queryInput.focus();
    return;
  }
  saveBaseUrl();
  launchQuery(query);
});

baseUrlInput.addEventListener("change", saveBaseUrl);

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    queryInput.value = chip.dataset.query || "";
    queryInput.focus();
  });
});

pasteBtn.addEventListener("click", async () => {
  if (!navigator.clipboard?.readText) {
    statusEl.textContent = "Clipboard not available.";
    return;
  }

  try {
    const text = await navigator.clipboard.readText();
    if (!text) {
      statusEl.textContent = "Clipboard is empty.";
      return;
    }
    queryInput.value = text.trim();
    queryInput.focus();
    statusEl.textContent = "Pasted from clipboard.";
  } catch (error) {
    statusEl.textContent = "Clipboard access denied.";
  }
});

themeToggle.addEventListener("click", () => {
  const current = document.body.dataset.theme || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

loadBaseUrl();
applyTheme(localStorage.getItem(THEME_KEY) || "dark");
queryInput.focus();
