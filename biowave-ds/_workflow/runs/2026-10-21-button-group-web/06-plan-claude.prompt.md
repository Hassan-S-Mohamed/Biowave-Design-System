# Plan step — button-group / web

Project root: /Users/hassansaid/Downloads/Biowave Design System-button-group-web/biowave-ds (git worktree on branch `ds/button-group-web`; work only here). Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
3-web-components/README.md, every Part of 3-web-components/components/button-group/button-group.md (latest Part E round = Round 2, 2026-10-21), _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 3-web-components/components/button-group/button-group.md (Part A in the tablet and mobile button-group files too, only if Part A changes — AGENTS.md rule 10), the regenerated contracts, CHANGELOG.md.

## This step
Answer the Planner-owned finding of Review Round 2: **#13** — how always-visible actions count toward the overflow limit. Write the user's rule (Notes) into B1 (and A4.4 / A5 if they describe overflow; keep Part A identical on all three platforms), B9 and C6 (a test: `maxVisible={1}` with `[Docs href, Cancel, Save (filled)]` → Docs and Save visible, Cancel in the menu; and a case where the always-visible actions alone exceed the limit). Also add to the C7 "Fix round 2 — Executor task list": #12 (vertical orientation ignores `align`, so `fill` never sets `flex: 1 1 0` on children; add a vertical + `align="fill"` test asserting non-zero heights) and #14 (assert `fill` from the rendered style, not the source text). Bump the version (minor), add a Part F entry, set Plan back to Finished (header + README), regenerate the contracts (web, and tablet/mobile if Part A changed).

## Notes from the user
Rule for #13 ("count them"): always-visible actions (`href` / `type="submit"`) and the primary (`filled`) action use up visible slots first; the remaining actions fill whatever slots are left, and the least important go into the overflow menu first. The limit is exceeded only when the always-visible actions alone exceed it.

## Checks to run
- npm run contract -- web button-group (and tablet / mobile if Part A changed)
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
