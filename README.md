# Hive Auto Lab Website

Marketing site for **Hive Auto Lab**, a premium auto detailing business in **Brampton, ON**.

## Features

- One-page layout: services, pricing, booking form, and contact footer
- Hero video and brand styling (black & gold)
- Collage-style photo gallery of detailed vehicles
- Mobile-friendly navigation and scroll animations

## Tech stack

- HTML, CSS, JavaScript (no build step or framework)

## Run locally

```bash
cd "HiveAuto Website"
python3 -m http.server 5500
```

Open [http://localhost:5500](http://localhost:5500) in your browser.

## Project structure

```
├── index.html      # Main page
├── styles.css      # Styles
├── script.js       # Menu, gallery, form, animations
├── assets/         # Logo, hero video
└── Pictures/       # Gallery images
```

## Booking form

Submissions open the user’s email client with a pre-filled message to the business email configured in `script.js`.
