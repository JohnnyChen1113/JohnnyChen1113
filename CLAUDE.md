# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Junhao Chen's personal academic homepage - a static website hosted on GitHub Pages at https://johnnychen1113.github.io/JohnnyChen1113/. The site showcases academic publications, bioinformatics tools/databases, research projects, and personal recipes.

## Technology Stack

- **Pure static site**: HTML5, CSS3, vanilla JavaScript (no build system, no package manager)
- **External dependencies via CDN only**: Google Fonts (Inter), Font Awesome 6.4.0
- **Hosting**: GitHub Pages (push to main branch to deploy)

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Home page with profile, research interests, contact links |
| `publications.html` | Academic publications with category filtering |
| `tools.html` | Developed bioinformatics tools and databases |
| `projects.html` | Research projects (template) |
| `recipe.html` | Personal recipes section |
| `styles.css` | All CSS styling with CSS variables for theming |
| `script.js` | Navigation, publication filtering, scroll effects |
| `data/publications.json` | Structured publication metadata |
| `recipes/` | Individual recipe pages |

## CSS Theme System

Theme colors are defined as CSS variables in `:root` (styles.css:1-17):
- Primary color: `--primary-color: #1e40af` (academic blue)
- All colors are customizable via CSS variables

## JavaScript Functionality

Key features in script.js:
- Mobile hamburger menu toggle
- Publication filtering by data-tags attribute
- Year divider visibility management for filtered publications
- Navbar shadow on scroll
- Active navigation link highlighting

## Adding New Content

**New publication**: Add to `publications.html` with appropriate `data-tags` attribute (e.g., `data-tags="first-author genomics"`)

**New recipe**: Create HTML file in `recipes/` directory, link from `recipe.html`

**New tool/database**: Add card to appropriate section in `tools.html`

## Filter Categories (publications.html)

Publications use `data-tags` for filtering:
- `first-author` - First or co-first author papers
- `genomics` - Genomics-related
- `yeast` - Yeast research
- `phylogeny` - Phylogenetic studies
- `molecular-phylogenetics` - Molecular phylogenetics
