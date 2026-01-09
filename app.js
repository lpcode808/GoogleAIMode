const form = document.getElementById("search-form");
const queryInput = document.getElementById("query");
const baseUrlInput = document.getElementById("base-url");
const statusEl = document.getElementById("status");
const pasteBtn = document.getElementById("paste-btn");
const shareBtn = document.getElementById("share-btn");
const themeToggle = document.getElementById("theme-toggle");
const chips = document.querySelectorAll(".chip");
const launchBtn = form.querySelector('button[type="submit"]');
const urlError = document.getElementById("url-error");

const DEFAULT_BASE_URL = "https://g.ai";
const THEME_KEY = "gai_theme";
const HISTORY_KEY = "gai_query_history";
const MAX_HISTORY = 10;

// Auto-resize textarea
const autoResize = () => {
  queryInput.style.height = 'auto';
  queryInput.style.height = Math.min(queryInput.scrollHeight, 200) + 'px';
};

const validateUrl = (url) => {
  const trimmed = url.trim();
  if (!trimmed) return { valid: true, error: "" }; // Empty is OK, will use default

  try {
    const urlObj = new URL(trimmed);
    if (!urlObj.protocol.match(/^https?:$/)) {
      return { valid: false, error: "URL must start with http:// or https://" };
    }
    return { valid: true, error: "" };
  } catch (error) {
    return { valid: false, error: "Please enter a valid URL" };
  }
};

const loadBaseUrl = () => {
  const saved = localStorage.getItem("gai_base_url");
  baseUrlInput.value = saved || DEFAULT_BASE_URL;
};

const saveBaseUrl = () => {
  const trimmed = baseUrlInput.value.trim();
  const validation = validateUrl(trimmed);

  if (!validation.valid) {
    urlError.textContent = validation.error;
    baseUrlInput.classList.add("error");
    return false;
  }

  urlError.textContent = "";
  baseUrlInput.classList.remove("error");
  localStorage.setItem("gai_base_url", trimmed || DEFAULT_BASE_URL);
  statusEl.textContent = "Settings saved.";
  return true;
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
    return false;
  }

  // Show loading state
  launchBtn.disabled = true;
  launchBtn.dataset.originalText = launchBtn.textContent;
  launchBtn.textContent = "Launching...";
  statusEl.textContent = "Opening G.AI…";

  // Open in new tab
  window.open(finalUrl, "_blank");

  // Reset button state after a short delay
  setTimeout(() => {
    launchBtn.disabled = false;
    launchBtn.textContent = launchBtn.dataset.originalText || "Launch G.AI";
    statusEl.textContent = "";
  }, 1000);

  return true;
};

const applyTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  // Update button with icon and text
  themeToggle.innerHTML = nextTheme === "dark" ? '☀️ Light' : '🌙 Dark';
  localStorage.setItem(THEME_KEY, nextTheme);
};

// Query history management
const getHistory = () => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

const saveToHistory = (query) => {
  const trimmed = query.trim();
  if (!trimmed) return;

  let history = getHistory();
  // Remove if already exists
  history = history.filter(q => q !== trimmed);
  // Add to front
  history.unshift(trimmed);
  // Keep only MAX_HISTORY items
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
};

const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  statusEl.textContent = "History cleared.";
};

const renderHistory = () => {
  const historyList = document.getElementById("history-list");
  const historySection = document.getElementById("history-section");
  const history = getHistory();

  if (history.length === 0) {
    historySection.style.display = "none";
    return;
  }

  historySection.style.display = "";
  historyList.innerHTML = "";

  history.forEach((query) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip history-chip";
    chip.textContent = query.length > 50 ? query.substring(0, 50) + "..." : query;
    chip.title = query;
    chip.addEventListener("click", () => {
      queryInput.value = query;
      autoResize();
      queryInput.focus();
      statusEl.textContent = "Loaded from history.";
    });
    historyList.appendChild(chip);
  });
};

// Auto-resize on input
queryInput.addEventListener("input", autoResize);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) {
    statusEl.textContent = "Type something to launch.";
    queryInput.focus();
    return;
  }
  saveBaseUrl();
  saveToHistory(query);
  launchQuery(query);
});

baseUrlInput.addEventListener("change", saveBaseUrl);

// Real-time validation
baseUrlInput.addEventListener("input", () => {
  const validation = validateUrl(baseUrlInput.value);
  if (!validation.valid) {
    urlError.textContent = validation.error;
    baseUrlInput.classList.add("error");
  } else {
    urlError.textContent = "";
    baseUrlInput.classList.remove("error");
  }
});

const appendAddon = (addon) => {
  if (!addon) return;
  const current = queryInput.value;
  const needsSpaceBefore = current.length > 0 && !/\s$/.test(current);
  queryInput.value = `${current}${needsSpaceBefore ? " " : ""}${addon} `;
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const addon = chip.dataset.addon || "";
    appendAddon(addon);

    // Visual feedback
    chip.classList.add("chip-active");
    setTimeout(() => chip.classList.remove("chip-active"), 300);

    // Status feedback
    if (addon) {
      statusEl.textContent = `Added "${addon}" to query.`;
    }

    autoResize();
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

    const current = queryInput.value;
    const trimmedText = text.trim();

    // If input is empty, replace; otherwise append with space
    if (current.length === 0) {
      queryInput.value = trimmedText;
      statusEl.textContent = "Pasted from clipboard.";
    } else {
      const needsSpace = !/\s$/.test(current);
      queryInput.value = `${current}${needsSpace ? " " : ""}${trimmedText}`;
      statusEl.textContent = "Added to query.";
    }

    autoResize();
    queryInput.focus();
  } catch (error) {
    statusEl.textContent = "Clipboard access denied.";
  }
});

shareBtn.addEventListener("click", async () => {
  const query = queryInput.value.trim();

  if (!query) {
    statusEl.textContent = "Enter a query to share.";
    return;
  }

  // Generate shareable URL
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set('q', query);
  const shareLink = shareUrl.toString();

  // Try Web Share API first (mobile)
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'G.AI Quick Launch',
        text: `Search: ${query}`,
        url: shareLink
      });
      statusEl.textContent = "Shared successfully!";
      return;
    } catch (error) {
      // User cancelled or share failed, fall through to clipboard
      if (error.name !== 'AbortError') {
        console.log('Share failed:', error);
      }
    }
  }

  // Fallback to clipboard
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareLink);
      statusEl.textContent = "Link copied to clipboard!";
    } catch (error) {
      statusEl.textContent = "Failed to copy link.";
    }
  } else {
    statusEl.textContent = "Sharing not supported.";
  }
});

themeToggle.addEventListener("click", () => {
  const current = document.body.dataset.theme || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

// Clear history button
const clearHistoryBtn = document.getElementById("clear-history");
clearHistoryBtn.addEventListener("click", clearHistory);

loadBaseUrl();

// Auto-detect system theme preference on first load
const savedTheme = localStorage.getItem(THEME_KEY);
if (!savedTheme) {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
} else {
  applyTheme(savedTheme);
}

// Render history on load
renderHistory();

// Load query from URL parameter if present
const urlParams = new URLSearchParams(window.location.search);
const urlQuery = urlParams.get('q');
if (urlQuery) {
  queryInput.value = urlQuery;
  statusEl.textContent = "Query loaded from shared link.";
}

// Initial resize
autoResize();

queryInput.focus();
