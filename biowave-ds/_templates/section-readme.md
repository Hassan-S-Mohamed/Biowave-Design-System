# {N} · {Section name}

> Agent summary (≤ 3 lines): what this section owns, which package it is, and what to read next. An agent should not need any other file in this section to know where to go.

<!--
SECTION README — same headings, same order, in every section (1-overview … 5-mobile-components).
Delete a heading only when it cannot apply (e.g. "Stack" in 1-overview). Status is written ONLY in the
Components table below and in each component file's header; docs:check fails if they differ.
-->

## 1. Stack
| | |
|---|---|
| UI base | {MUI · Material 3} |
| Styling / theme | {…} |
| RTL | {…} |
| Icons | {…} |
| Tests | {…} |

## 2. Structure
```
{section}/
├── README.md                    ← this file
├── index.html                   ← Components List (web docs home for this platform)
├── components/<name>/           ← one folder per component: <name>.md · <name>.html · contracts · tokens
└── {src/ | lib/}                ← code (package layout)
```

## 3. Rules specific to this platform
- {…}

## 4. Components
| Component | Plan | Code | Figma | Review | Docs | File |
|---|---|---|---|---|---|---|
| {Name} | {Draft · Finished · Open} | {status} | {status} | {— · Round n verdict} | [page](components/{name}/{name}.html) | [{name}.md](components/{name}/{name}.md) |

## 5. Backlog
1. {…}

## 6. Commands
```bash
{commands that must pass for this section}
```
