# CampusFind

**CampusFind** is a web-based lost-and-found management system designed for university students and staff. It allows users to report lost or found items, browse and search reported items, identify possible matches, and manage the status of their reports.

**Live deployment:** [https://is-project-2026.github.io/campusfind-134706/](https://is-project-2026.github.io/campusfind-134706/)

## Features

- **Dashboard** — Overview stats and recently reported items
- **Report Lost/Found** — Submit detailed reports with optional photos
- **Search & Filter** — Keyword search with filters by type, category, location, date, and status
- **Item Details** — Full item view with contact and management actions
- **Match Detection** — Automatic possible match detection between lost and found items
- **My Reports** — View and manage your submitted reports
- **Responsive Design** — Works on desktop, tablet, and mobile

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage (browser persistence)
- Git / GitHub (version control & workflow)
- GitHub Pages (deployment)

## Running Locally

```bash
git clone https://github.com/IS-PROJECT-2026/campusfind-134706.git
cd campusfind-134706
```

Open `index.html` in your browser, or serve with a local HTTP server:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Project Structure

```text
campusfind-134706/
├── index.html          # Dashboard
├── browse.html         # Search & filter
├── report-lost.html    # Report lost item
├── report-found.html   # Report found item
├── item.html           # Item details
├── my-reports.html     # User reports
├── about.html          # About & help
├── css/                # Stylesheets
├── js/                 # JavaScript modules
├── evidence/           # Merge conflict evidence
└── README.md
```

## Author

**Peter Wachira** — Admission No. 134706 — GROUP 4D

Strathmore University — IS Mini-Project Git Workflow Challenge 2026
