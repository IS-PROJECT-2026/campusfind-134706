# CampusFind — Submission Assessment

**Student:** Peter Wachira  
**Admission Number:** 134706  
**Class Group:** GROUP 4D  
**Repository:** [IS-PROJECT-2026/campusfind-134706](https://github.com/IS-PROJECT-2026/campusfind-134706)  
**Live URL:** [https://is-project-2026.github.io/campusfind-134706/](https://is-project-2026.github.io/campusfind-134706/)

---

## 1. System Description

CampusFind is a static web-based lost-and-found management system for university campuses. Users can report lost or found items, search and filter the catalogue, view item details, and receive automatic possible-match notifications when a lost report closely matches a found report (based on category, name keywords, location, and date).

All data is persisted in the browser via `localStorage`, making the system fully functional without a backend.

---

## 2. Repository Details

| Field | Value |
|---|---|
| Organisation | IS-PROJECT-2026 |
| Repository name | campusfind-134706 |
| Visibility | Public |
| Team | GROUP 4D |
| Default branch | main |
| Deployment | GitHub Pages from main branch, root folder |

---

## 3. Milestones and Issues

### Milestone 1: Foundation & Data Layer
- #1 Scaffold project structure and `.gitignore`
- #2 Build shared HTML layout (nav, footer) across all pages
- #3 Implement CSS design system (variables, base, components)
- #4 Implement `storage.js` CRUD and data schema
- #5 Add demo seed data for first-load experience

### Milestone 2: Core User Features
- #6 Build dashboard with live stats and recent items
- #7 Implement report-lost form with validation and image upload
- #8 Implement report-found form
- #9 Build browse page with keyword search
- #10 Add multi-criteria filter controls
- #11 Build item detail page with dynamic rendering

### Milestone 3: Matching, Management & Launch
- #12 Implement match detection algorithm
- #13 Build My Reports page with status badges
- #14 Add mark-recovered, close, and delete actions
- #15 Responsive design pass and mobile navigation
- #16 Write README with live link and tech stack
- #17 Configure GitHub Pages deployment
- #18 Engineer and resolve three merge conflicts with evidence
- #19 Complete submission.md written assessment
- #20 Self-host GitHub profile stats cards

---

## 4. Git Workflow

### Branch Strategy
All development was done on feature branches using the naming convention `type/issue-number-description`. No commits were made directly to `main`.

### Conventional Commits
Commit types used across the project history:
- `feat` — new features (dashboard, forms, matching)
- `fix` — bug fixes (validation, edge cases)
- `docs` — README, submission.md
- `style` — CSS and visual changes
- `refactor` — code restructuring (forms module rename)
- `chore` — scaffolding, gitignore, conflict evidence

Example:
```
feat(dashboard): add recovered items stat card

Implement getStats() integration on homepage and render
four summary cards with live counts from localStorage.

Closes #6
```

### Pull Requests
Every feature branch was merged via pull request with issue references in the PR description. Each PR was self-reviewed before merging.

---

## 5. Merge Conflict Resolution

### Conflict 1 — Same Line Edited on Two Branches (Full Chronology)

**Cause:** Two branches modified the same line in `css/variables.css`.

**Chronology:**
1. On `main`, `--color-primary` was set to `#2563eb`
2. Created branch `style/21-header-blue-theme` and changed it to `#1d4ed8`
3. Created branch `style/22-header-green-theme` from `main` and changed it to `#059669`
4. Merged `style/21-header-blue-theme` into `main` via PR — value became `#1d4ed8`
5. Attempted to merge `style/22-header-green-theme` into `main`
6. Git reported a content conflict on `css/variables.css`

**Raw conflict markers:**
```
<<<<<<< HEAD
  --color-primary: #1d4ed8;
=======
  --color-primary: #059669;
>>>>>>> style/22-header-green-theme
```

**Resolution:** Kept `#1d4ed8` (blue theme) as the primary colour since it was already merged and provides better contrast with the existing design system.

**Evidence:** `evidence/conflict_evidence_1.png`

---

### Conflict 2 — File Renamed on One Branch, Edited on Another

**Cause:** One branch renamed `js/forms.js` to `js/report-forms.js` while another branch edited the original `js/forms.js` file.

**Why it triggered a conflict:** Git tracks file identity by path and content. When one branch renames a file and another modifies the original path, Git cannot automatically determine that the edits belong in the renamed file. It presents a rename/modify conflict requiring manual resolution.

**Resolution:** Applied the validation helper changes from the edit branch into `js/report-forms.js` and updated all HTML script references.

**Evidence:** `evidence/conflict_evidence_2.png`

---

### Conflict 3 — File Deleted on One Branch, Modified on Another

**Cause:** Branch `chore/25-remove-about-page` deleted `about.html` and removed its nav link, while branch `docs/26-expand-about-content` added an FAQ section to `about.html`.

**Why it triggered a conflict:** This is a modify/delete conflict. One branch removes the file entirely while the other branch has new commits modifying it. Git cannot merge these automatically because it does not know whether to keep the deletion or preserve the modifications.

**Resolution:** Kept the expanded `about.html` with the FAQ section, as the about page provides important user documentation for the system.

**Evidence:** `evidence/conflict_evidence_3.png`

---

## 6. GitHub Pages Deployment

- Source: `main` branch, `/ (root)` folder
- Entry point: `index.html` at repository root
- URL: https://is-project-2026.github.io/campusfind-134706/
- All asset paths use relative URLs for compatibility with both local and deployed environments

---

## 7. Profile Developer Metrics

### Diagnosis

GitHub profile stats cards (powered by github-readme-stats and github-stats-extended) stopped rendering reliably because the shared public Vercel instances serve thousands of profiles simultaneously. Each card request calls the GitHub API, and the shared PAT hits GitHub's rate limit (5000 requests/hour for authenticated requests). When rate-limited, cards return error badges or broken image placeholders.

### Fix

Deployed a self-hosted stats solution using [github-readme-stats-action](https://github.com/stats-organization/github-readme-stats-action) in profile repo `pwachira7/pwachira7`:

1. Created profile README repo with GitHub Actions workflow (`.github/workflows/grs.yml`)
2. Workflow generates static SVG cards daily into `profile/stats.svg` and `profile/top-langs.svg`
3. Cards are embedded from the repository itself — not the shared public Vercel instance
4. Workflow run: https://github.com/pwachira7/pwachira7/actions

This uses personal GitHub Actions infrastructure with `GITHUB_TOKEN`, avoiding shared API rate limits.

---

## 8. Bonus Stat Card

Added a **GitHub Streak Stats** card from [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) (DenverCoder1) — a different open-source tool from github-stats-extended:

```markdown
[![GitHub Streak](https://streak-stats.demolab.com/?user=pwachira7&theme=default)](https://git.io/streak-stats)
```

Profile: https://github.com/pwachira7

---

## 9. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Responsive UI, design system, components |
| JavaScript (ES6+) | Application logic, matching algorithm |
| localStorage | Client-side data persistence |
| Git / GitHub | Version control, issues, PRs, project board |
| GitHub Pages | Static site deployment |
| Vercel | Self-hosted GitHub stats API |

---

## 10. Self-Assessment Checklist

- [x] Repository under IS-PROJECT-2026, correctly named, public, GROUP 4D
- [x] 3 milestones with granular linked issues
- [x] Kanban board with task progression
- [x] Conventional commits with 4+ types
- [x] All development on feature branches
- [x] Pull request history with issue traceability
- [x] Three merge conflicts with evidence screenshots
- [x] README.md with live link and technologies
- [x] Live GitHub Pages deployment
- [x] Completed submission.md
- [x] Self-hosted profile stats
- [x] Bonus stat card from different OSS tool
