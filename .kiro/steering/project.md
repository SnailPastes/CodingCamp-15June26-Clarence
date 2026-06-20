# Project Overview

This is a personal productivity dashboard web app built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools are used.

## Project Structure

```
Website/
├── html/
│   └── index.html       # Main HTML file
├── css/
│   └── index.css        # All styles, uses CSS custom properties for theming
└── js/
    └── index.js         # All JavaScript logic
```

## Features

- **Clock & Date** — Live updating time and date display
- **Greeting** — Personalized greeting using a saved username (stored in localStorage)
- **Focus Timer** — Configurable countdown timer (default 25 min), with start/stop/reset
- **Task List** — Add, complete, and delete tasks, persisted in localStorage
- **Quick Links** — Add and remove named bookmark links, persisted in localStorage
- **Dark/Light Mode Toggle** — Fixed button in top-right corner, preference saved in localStorage

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables) for theming, Google Fonts (Inter + JetBrains Mono)
- **JavaScript (ES Modules)** — Vanilla JS, no dependencies
- **localStorage** — Used for persisting tasks, links, username, and theme preference

## Theming

Dark mode is the default. Light mode is activated by setting `data-theme="light"` on the `<html>` element.

CSS variables are defined in `:root` (dark) and `[data-theme="light"]` (light override):

- `--bg` — background color
- `--border` — accent/border color (`#FF6A1C` orange, same in both themes)
- `--text` — text color

## Conventions

- All files use consistent indentation (4 spaces)
- JS is organized into sections with comment headers (Timer, Tasks, Links, Name, On Reload)
- CSS classes follow a simple naming convention: `.bigBtn`, `.smallBtn`, `.headDiv`, `.superDiv`, `.task`, `.link`
- No external libraries or package managers — open `html/index.html` directly in a browser
