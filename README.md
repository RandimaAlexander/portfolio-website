# Randima Alexander Portfolio Website

A modern, responsive personal portfolio built with Flask, HTML, CSS, and JavaScript.

## Features
- Multi-page Flask routes for Home, About, Skills, Projects, and Contact.
- Smooth animations, hover effects, and a clean neutral palette.
- Contact form with simulated backend handling (no database required).

## Project Structure
```
portfolio-website/
├── app.py
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   └── contact.html
└── static/
    ├── style.css
    └── script.js
```

## How to Run Locally
1. Create and activate a virtual environment (optional but recommended).
2. Install Flask:
   ```bash
   pip install Flask
   ```
3. Start the server:
   ```bash
   python app.py
   ```
4. Visit `http://localhost:5000` in your browser.

## How It Works (Brief)
- **app.py** defines Flask routes for each page and simulates a contact form submission.
- **templates/** contains HTML templates that inherit from a shared base layout.
- **static/style.css** provides layout, colors, animations, and responsive styling.
- **static/script.js** applies a simple intersection observer for fade-in effects.
