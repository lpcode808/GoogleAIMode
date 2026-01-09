# Changelog

All notable changes to G.AI Quick Launch will be documented in this file.

## [Unreleased]

### Phase 2: Quick Wins (2026-01-09)

#### Added
- **Query History**: Automatically saves last 10 queries to localStorage with collapsible "Recent Searches" section
- **Auto-detect Theme**: Respects system `prefers-color-scheme` preference on first load
- **Clear History**: Privacy-focused button to remove all saved queries

#### Changed
- **Launch Behavior**: Now opens G.AI in new tab instead of current window for better workflow
- **Theme Toggle**: Improved with emoji icons (☀️ sun / 🌙 moon) for better visual clarity
- **Button Labels**: Changed from "Light mode"/"Dark mode" to "☀️ Light"/"🌙 Dark" showing action instead of state

#### Improved
- History section auto-hides when empty
- Long queries in history truncated to 50 characters with ellipsis
- Launch button resets after 1 second for quick repeated searches

---

### Phase 1: Critical UX Fixes (2026-01-09)

#### Added
- **Loading State**: Launch button now shows "Launching..." and disables during navigation
- **Visual Feedback**: Chips pulse with accent color and scale animation when clicked
- **URL Validation**: Real-time validation in settings with clear error messages
- **Status Messages**: Clear feedback for all user actions (paste, chip clicks, validation errors)

#### Changed
- **Paste Behavior**: Now intelligently appends to existing text instead of overwriting
- Different status messages: "Pasted from clipboard" vs "Added to query"

#### Improved
- Button states prevent double-clicks during launch
- Visual error indicators (red border + shadow) for invalid URLs
- Settings confirmation: "Settings saved" message when URL validated
- Chip clicks show status: `Added "demystify" to query`

---

## Earlier Releases

### Initial Features
- Mobile-first single-page launcher for G.AI
- Customizable base URL with localStorage persistence
- Quick add-on chips for query modifiers
- Dark/light theme toggle
- Clipboard paste integration
- Gemini-inspired color palette
- Accessible semantic HTML
- Progressive reveal animations
- Responsive design with 520px mobile breakpoint
