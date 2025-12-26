# 内容管理指南

本网站使用 Markdown 文件管理内容，无需直接编辑 HTML。

## 本地测试

由于浏览器安全限制，直接打开 HTML 文件无法加载 Markdown 内容。需要启动本地服务器：

```bash
cd ~/JohnnyChen1113
python -m http.server 8000
```

然后在浏览器打开：http://localhost:8000

按 `Ctrl+C` 停止服务器。

---

## 编辑项目 (Projects)

**文件**: `content/projects.md`

### 格式

```markdown
## 项目标题

**Meta:** 项目类型 · 合作者/PI · 资助来源
**Tags:** 标签1, 标签2, 标签3
**Outcomes:** 发表成果、投稿状态等

项目描述...

---

## 下一个项目...
```

### 规则

- 标题用 `## ` 开头
- `Meta:`、`Tags:`、`Outcomes:` 支持链接，加粗可选
- 项目之间用 `---` 分隔

---

## 编辑工具 (Tools)

**文件**: `content/tools.md`

### 格式

```markdown
# Developed Tools

## 工具名称

**Links:** [GitHub](url), [Paper](url)
**Tags:** 标签1, 标签2

工具描述...

---

## 下一个工具...

---

# Bioinformatics Databases

## 数据库名称

**Links:** [Website](url), [Paper](url)
**Tags:** 年份, 类型

数据库描述...
```

### 规则

- 用 `# ` 分隔大类（如 Developed Tools、Bioinformatics Databases）
- 每个工具/数据库用 `## ` 标题
- 工具之间用 `---` 分隔

---

## 编辑菜谱 (Recipes)

**目录**: `content/recipes/`

### 添加新菜谱

1. 创建新文件 `content/recipes/recipe-name.md`
2. 把文件名添加到 `content/recipes/index.json`

### 菜谱文件格式

```markdown
---
title: 菜谱名称
icon: utensils
time: 30 min
difficulty: Easy
serves: 2
tags: [标签1, 标签2]
summary: 简短描述（显示在卡片上）
---

## Ingredients

- 食材1
- 食材2

## Instructions

### Step 1: 标题

步骤说明...

### Step 2: 标题

步骤说明...

---

**Source:** [来源](url)
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `title` | 菜谱标题 |
| `icon` | Font Awesome 图标名（如 `mug-hot`, `utensils`, `cookie`） |
| `time` | 烹饪时间 |
| `difficulty` | 难度（Easy/Medium/Hard） |
| `serves` | 份数 |
| `tags` | 标签数组 |
| `summary` | 简短描述，显示在列表页卡片上 |

### index.json 格式

```json
[
  "milk-egg-mash.md",
  "new-recipe.md"
]
```

---

## 发布更新

```bash
git add .
git commit -m "Update content"
git push
```

推送后等待 1-2 分钟，GitHub Pages 会自动更新。

---

## 文件结构

```
content/
  projects.md           <- 所有项目
  tools.md              <- 所有工具和数据库
  recipes/
    index.json          <- 菜谱文件列表
    milk-egg-mash.md    <- 单个菜谱
    ...
```

---

## 常见问题

**Q: 页面显示 "Loading..."**
A: 确保使用 `python -m http.server` 启动了本地服务器。

**Q: 内容没有显示**
A: 检查 Markdown 格式，特别是 `## ` 标题和 `---` 分隔符。

**Q: 新菜谱没有显示**
A: 确认已将文件名添加到 `index.json`。
