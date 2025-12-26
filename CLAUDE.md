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
| `tools.html` | Developed bioinformatics tools and databases (loaded from Markdown) |
| `projects.html` | Research projects (loaded from Markdown) |
| `recipe.html` | Personal recipes (loaded from Markdown) |
| `styles.css` | All CSS styling with CSS variables for theming |
| `script.js` | Navigation, publication filtering, scroll effects |
| `markdown-renderer.js` | Markdown content loader and renderer |
| `content/projects.md` | All projects in single Markdown file |
| `content/tools.md` | All tools in single Markdown file (with sections) |
| `content/recipes/` | Recipe Markdown files (one per recipe) |
| `data/publications.json` | Structured publication metadata |

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

**New project**: Edit `content/projects.md`, add a new section using this format:
```markdown
---

## Project Title

**Meta:** Type · [Collaborator](url) · Funding
**Tags:** Tag1, Tag2, Tag3
**Outcomes:** Publication status and results.

Project description here. Supports *italic*, **bold**, and [links](url).
```
Use `---` to separate projects. Keywords (`Meta:`, `Tags:`, `Outcomes:`) work with or without bold.

**New tool/database**: Edit `content/tools.md`, add under appropriate `# Section`:
```markdown
---

## Tool Name

**Links:** [GitHub](url), [Paper](url)
**Tags:** Tag1, Tag2

Description here.
```

**New recipe**:
1. Create `content/recipes/recipe-name.md` with YAML frontmatter
2. Add filename to `content/recipes/_index.json`

**New publication**: Add to `publications.html` with appropriate `data-tags` attribute

## Local Development

The Markdown content system requires a local HTTP server (fetch API doesn't work with file:// protocol):
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

## Filter Categories (publications.html)

Publications use `data-tags` for filtering:
- `first-author` - First or co-first author papers
- `genomics` - Genomics-related
- `yeast` - Yeast research
- `phylogeny` - Phylogenetic studies
- `molecular-phylogenetics` - Molecular phylogenetics
