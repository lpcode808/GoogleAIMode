# Changelog

All notable changes to G.AI Quick Launch will be documented in this file.

## [Unreleased]

### Auto-growing Textarea (2026-01-09)

#### Changed
- **Search Input**: Replaced single-line input with auto-growing textarea
- Starts compact at 54px height (2 lines)
- Grows smoothly as content increases
- Max height of 200px (~6 lines) before scrolling
- Better support for long, complex queries

#### Improved
- Multi-line queries now fully visible while typing
- Smooth height transitions (0.2s ease)
- Auto-resizes after paste, chip clicks, and history loads
- Similar UX to modern messaging apps and Twitter/X

---

### Phase 3: Polish (2026-01-09)

#### Added
- **URL Sharing**: New "Share" button creates shareable links with pre-filled queries
- **Web Share API**: Native mobile sharing on supported devices
- **Query Parameters**: Support for `?q=query` in URL to pre-fill search box
- Shareable links for viral distribution and collaboration

#### Changed
- **Button Consistency**: All buttons standardized to 44px minimum height
- **Touch Targets**: Improved spacing and sizing for mobile (44x44px minimum)
- **Actions Layout**: Three-button layout (Paste, Share, Launch)
- Search input height increased to 54px for better touch
- Chip gaps increased from 10px to 12px

#### Improved
- Mobile layout: Paste/Share side-by-side, Launch full-width below
- Better visual consistency across all interactive elements
- Flexbox button centering for perfect alignment
- Enhanced accessibility with larger touch areas

---

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
