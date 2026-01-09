# G.AI Quick Launch

A mobile-first one-page launcher that appends `q=` to a base G.AI URL and opens the AI mode fast.

## Features

- **Quick Launch**: Type a query and launch G.AI in a new tab with one tap
- **Query History**: Automatically saves your last 10 searches for easy re-use
- **Smart Paste**: Paste from clipboard - appends to existing text instead of replacing
- **Quick Add-ons**: Pre-defined query modifiers (demystify, explain, analyze)
- **Theme Toggle**: Light/dark mode with auto-detection of system preference
- **Customizable Base URL**: Change the G.AI endpoint in settings
- **Real-time Validation**: URL validation with clear error messages
- **Mobile-First Design**: Optimized for touch with accessible 44px+ targets
- **Visual Feedback**: Loading states, button animations, status messages
- **Privacy-Focused**: All data stored locally (localStorage only)

## Use

1. Open `index.html` in your browser
2. Enter a search query
3. (Optional) Click quick add-on chips to modify your query
4. Tap **Launch G.AI** to open in a new tab
5. Use **Recent Searches** to quickly re-launch previous queries

### Settings

- **G.AI Base URL**: Customize the endpoint if Google updates it (default: `https://g.ai`)
- **Theme**: Toggle between light and dark mode (auto-detects system preference on first load)
- **Recent Searches**: View and clear your query history

## Tech Stack

- Pure vanilla JavaScript (ES6+)
- HTML5 with semantic markup
- CSS3 with CSS custom properties
- No build tools or dependencies required

## Browser Support

- Modern browsers with ES6+ support
- Clipboard API for paste functionality
- `prefers-color-scheme` media query for theme detection
- LocalStorage for persistence

## Privacy

All data (queries, settings, theme preference) is stored locally in your browser's localStorage. Nothing is sent to external servers except when you launch G.AI.
