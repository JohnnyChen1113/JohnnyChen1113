/**
 * Markdown Content Renderer
 * Loads a single Markdown file and renders multiple items as HTML
 */

// Configure marked to open links in new tab
const renderer = new marked.Renderer();
renderer.link = function(token) {
    const href = token.href || '';
    const title = token.title || '';
    const text = token.text || '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};
marked.setOptions({ renderer });

// Parse a single project section
function parseProject(section) {
    const lines = section.trim().split('\n');
    const project = {
        title: '',
        meta: '',
        tags: [],
        description: '',
        outcomes: ''
    };

    let descLines = [];

    for (const line of lines) {
        // Title (## heading)
        if (line.startsWith('## ')) {
            project.title = line.replace('## ', '').trim();
        }
        // Meta line (supports both **Meta:** and Meta:)
        else if (line.match(/^\*?\*?Meta:\*?\*?\s*/i)) {
            project.meta = line.replace(/^\*?\*?Meta:\*?\*?\s*/i, '').trim();
        }
        // Tags line (supports both **Tags:** and Tags:)
        else if (line.match(/^\*?\*?Tags:\*?\*?\s*/i)) {
            const tagStr = line.replace(/^\*?\*?Tags:\*?\*?\s*/i, '').trim();
            project.tags = tagStr.split(',').map(t => t.trim()).filter(t => t);
        }
        // Outcomes line (supports both **Outcomes:** and Outcomes:)
        else if (line.match(/^\*?\*?Outcomes:\*?\*?\s*/i)) {
            project.outcomes = line.replace(/^\*?\*?Outcomes:\*?\*?\s*/i, '').trim();
        }
        // Content lines
        else {
            descLines.push(line);
        }
    }

    project.description = descLines.join('\n').trim();

    return project;
}

// Render a single project item
function renderProjectItem(project) {
    const tags = project.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');

    const descriptionHtml = marked.parse(project.description);
    // Use parseInline for meta and outcomes to avoid wrapping <p> tags
    const metaHtml = marked.parseInline(project.meta);
    const outcomesHtml = project.outcomes ? marked.parseInline(project.outcomes) : '';

    return `
        <div class="project-item">
            <div class="project-header">
                <h4 class="project-title">${project.title}</h4>
                <span class="project-meta">${metaHtml}</span>
            </div>
            <div class="project-desc">${descriptionHtml}</div>
            ${outcomesHtml ? `<div class="project-outcome"><strong>Outcomes:</strong> ${outcomesHtml}</div>` : ''}
            <div class="project-tags">${tags}</div>
        </div>
    `;
}

// Load and render projects from a single Markdown file
async function loadProjects(containerSelector, filePath = 'content/projects.md') {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    container.innerHTML = '<p class="loading">Loading projects...</p>';

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load projects');
        const content = await response.text();

        // Split by --- separator
        const sections = content.split(/\n---\n/).filter(s => s.trim());

        // Parse and render each project
        const html = sections
            .map(section => parseProject(section))
            .filter(p => p.title)
            .map(p => renderProjectItem(p))
            .join('');

        container.innerHTML = html || '<p class="error">No projects found.</p>';

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

// Parse a single tool section
function parseTool(section) {
    const lines = section.trim().split('\n');
    const tool = {
        title: '',
        links: '',
        tags: [],
        description: ''
    };

    let descLines = [];

    for (const line of lines) {
        // Title (## heading)
        if (line.startsWith('## ')) {
            tool.title = line.replace('## ', '').trim();
        }
        // Links line
        else if (line.match(/^\*?\*?Links:\*?\*?\s*/i)) {
            tool.links = line.replace(/^\*?\*?Links:\*?\*?\s*/i, '').trim();
        }
        // Tags line
        else if (line.match(/^\*?\*?Tags:\*?\*?\s*/i)) {
            const tagStr = line.replace(/^\*?\*?Tags:\*?\*?\s*/i, '').trim();
            tool.tags = tagStr.split(',').map(t => t.trim()).filter(t => t);
        }
        // Content lines
        else {
            descLines.push(line);
        }
    }

    tool.description = descLines.join('\n').trim();
    return tool;
}

// Render a single tool item
function renderToolItem(tool) {
    const tags = tool.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');

    const descriptionHtml = marked.parse(tool.description);
    const linksHtml = tool.links ? marked.parseInline(tool.links) : '';

    return `
        <div class="project-item">
            <div class="project-header">
                <h4 class="project-title">${tool.title}</h4>
                ${linksHtml ? `<span class="project-meta">${linksHtml}</span>` : ''}
            </div>
            <div class="project-desc">${descriptionHtml}</div>
            <div class="project-tags">${tags}</div>
        </div>
    `;
}

// Load and render tools from a single Markdown file with sections
async function loadTools(containerSelector, filePath = 'content/tools.md') {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    container.innerHTML = '<p class="loading">Loading tools...</p>';

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load tools');
        const content = await response.text();

        // Split by # Section headers
        const sectionRegex = /^# (.+)$/gm;
        const sectionTitles = [];
        let match;
        while ((match = sectionRegex.exec(content)) !== null) {
            sectionTitles.push({ title: match[1], index: match.index });
        }

        let html = '';

        for (let i = 0; i < sectionTitles.length; i++) {
            const start = sectionTitles[i].index;
            const end = sectionTitles[i + 1] ? sectionTitles[i + 1].index : content.length;
            const sectionContent = content.substring(start, end);

            // Remove the # title line
            const sectionBody = sectionContent.replace(/^# .+\n/, '');

            // Split by --- separator
            const items = sectionBody.split(/\n---\n/).filter(s => s.trim());

            // Parse and render each tool
            const toolsHtml = items
                .map(item => parseTool(item))
                .filter(t => t.title)
                .map(t => renderToolItem(t))
                .join('');

            html += `
                <div class="tools-section">
                    <h2 class="section-title">${sectionTitles[i].title}</h2>
                    <div class="projects-list">${toolsHtml}</div>
                </div>
            `;
        }

        container.innerHTML = html || '<p class="error">No tools found.</p>';

    } catch (error) {
        console.error('Error loading tools:', error);
        container.innerHTML = '<p class="error">Failed to load tools. Please try again later.</p>';
    }
}

// Parse YAML frontmatter from recipe
function parseRecipeFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { metadata: {}, body: content };
    }

    const yamlStr = match[1];
    const body = match[2];
    const metadata = {};

    yamlStr.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Handle arrays like [item1, item2, item3]
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(s => s.trim());
        }

        metadata[key] = value;
    });

    return { metadata, body };
}

// Render a recipe card for the list view
function renderRecipeCard(metadata, filename) {
    const tags = Array.isArray(metadata.tags)
        ? metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';

    const recipeId = filename.replace('.md', '');

    return `
        <div class="recipe-card">
            <div class="recipe-image">
                <i class="fas fa-${metadata.icon || 'utensils'}"></i>
            </div>
            <div class="recipe-content">
                <h4 class="recipe-title">
                    <a href="recipe.html?id=${recipeId}">${metadata.title || 'Untitled'}</a>
                </h4>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${metadata.time || ''}</span>
                    <span><i class="fas fa-signal"></i> ${metadata.difficulty || ''}</span>
                </div>
                <p class="recipe-desc">${metadata.summary || ''}</p>
                <div class="recipe-tags">${tags}</div>
            </div>
        </div>
    `;
}

// Load and render recipe cards
async function loadRecipes(containerSelector, basePath = 'content/recipes') {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    container.innerHTML = '<p class="loading">Loading recipes...</p>';

    try {
        // Fetch the index file
        const indexResponse = await fetch(`${basePath}/_index.json`);
        if (!indexResponse.ok) throw new Error('Failed to load recipe index');
        const recipeFiles = await indexResponse.json();

        // Fetch all recipe files
        const recipes = await Promise.all(
            recipeFiles.map(async (filename) => {
                const response = await fetch(`${basePath}/${filename}`);
                if (!response.ok) return null;
                const content = await response.text();
                const { metadata } = parseRecipeFrontmatter(content);
                return { metadata, filename };
            })
        );

        // Render cards
        const html = recipes
            .filter(r => r !== null)
            .map(r => renderRecipeCard(r.metadata, r.filename))
            .join('');

        container.innerHTML = html || '<p class="error">No recipes found.</p>';

    } catch (error) {
        console.error('Error loading recipes:', error);
        container.innerHTML = '<p class="error">Failed to load recipes. Please try again later.</p>';
    }
}

// Load and render a single recipe detail
async function loadRecipeDetail(containerSelector, recipeId, basePath = 'content/recipes') {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    container.innerHTML = '<p class="loading">Loading recipe...</p>';

    try {
        const response = await fetch(`${basePath}/${recipeId}.md`);
        if (!response.ok) throw new Error('Recipe not found');
        const content = await response.text();
        const { metadata, body } = parseRecipeFrontmatter(content);

        const tags = Array.isArray(metadata.tags)
            ? metadata.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
            : '';

        const bodyHtml = marked.parse(body);

        container.innerHTML = `
            <a href="recipe.html" class="back-link"><i class="fas fa-arrow-left"></i> Back to Recipes</a>
            <h1 class="recipe-detail-title">${metadata.title || 'Untitled'}</h1>
            <div class="recipe-detail-meta">
                <span><i class="fas fa-clock"></i> ${metadata.time || ''}</span>
                <span><i class="fas fa-signal"></i> ${metadata.difficulty || ''}</span>
                ${metadata.serves ? `<span><i class="fas fa-user"></i> Serves ${metadata.serves}</span>` : ''}
            </div>
            <div class="recipe-detail-tags">${tags}</div>
            <div class="recipe-detail-content">${bodyHtml}</div>
        `;

    } catch (error) {
        console.error('Error loading recipe:', error);
        container.innerHTML = '<p class="error">Recipe not found.</p>';
    }
}

// Export for use
window.MarkdownRenderer = { loadProjects, loadTools, loadRecipes, loadRecipeDetail };
