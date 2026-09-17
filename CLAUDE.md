# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This repository currently contains **no source code, no build system, and no VCS history**. The only working-directory contents are:

- Three PNG book-cover renders at the repo root (`3 Books.png`, `45° angled hardcover.png`, `Lying-flat hardcover.png`) — the project name "be-the-mirror" suggests a book/content project rather than a software project
- An empty `docs/` directory
- A `.claude/` directory configuring a spec-driven-development workflow (see below)

There are no build, lint, or test commands to document yet. Do not invent them. If the user asks to "build" or "run tests", first clarify what the project actually is — this repo has not yet been set up as a code project.

## The `.claude/` spec workflow (KFC)

This repo is preconfigured with a **spec-driven feature-development workflow** whose orchestration prompt lives at `.claude/system-prompts/spec-workflow-starter.md`. The workflow is the primary reason `.claude/` exists here; understand it before doing any feature work.

**Flow:** feature idea → `requirements.md` → `design.md` → `tasks.md` → implementation. Each phase requires **explicit user approval** before advancing. The main thread coordinates; specialized sub-agents do the writing.

**Sub-agents** (all under `.claude/agents/kfc/`, invoke via the `Agent` tool with matching `subagent_type`):

| Agent | Role | Parallelizable |
| --- | --- | --- |
| `spec-system-prompt-loader` | Loads the workflow prompt — **call first** when a spec workflow starts | no |
| `spec-requirements` | Writes/refines `requirements.md` (EARS format) | yes |
| `spec-design` | Writes/refines `design.md` | yes |
| `spec-tasks` | Writes/refines `tasks.md` (checklist of coding tasks) | yes |
| `spec-judge` | Selects the best output when multiple parallel agents ran | yes |
| `spec-impl` | Executes a specific `task_id` from `tasks.md` | yes |
| `spec-test` | Produces test docs + code with 1:1 doc↔code correspondence | no |

**Paths** (from `.claude/settings/kfc-settings.json`):
- Specs: `.claude/specs/{feature-name-kebab-case}/{requirements,design,tasks}.md`
- Steering: `.claude/steering/`

**Non-obvious rules to follow** (from the workflow prompt — full text in `spec-workflow-starter.md`):

- Before spawning parallel `spec-requirements` / `spec-design` / `spec-tasks` agents, **you must ask the user how many agents to use (1–128)** at each phase transition.
- When `n ≥ 2` parallel agents ran, evaluate their outputs with **tree-based judging**: `ceil(n/4)` judges per round, each evaluates ≤4 docs, continue rounds until ≤3 docs remain, final round uses 1 judge. Then rename the winning `*_vXXXX.md` file to the standard name (`requirements.md`, etc.).
- Parallel agents receive an `output_suffix` (`_v1`, `_v2`, …); single-agent runs omit it.
- Do **not** narrate the workflow to the user (don't say "we're on step 2") — just surface completed docs for review.
- Task execution modes: **default** = main thread runs one task at a time and marks it done in `tasks.md`; **parallel** = user names specific tasks to run concurrently via `spec-impl`; **auto** = analyze `tasks.md` dependency graph and orchestrate `spec-impl` waves.
- Division of labor for spec-doc edits: **main thread** handles find/replace, formatting, small value updates; **sub-agents** handle content creation, structural changes, and any modification requiring domain judgment. Never author spec docs directly from the main thread.
- Avoid parentheses inside Mermaid node labels (they break parsing) — write `W[Call provider.refresh]`, not `W[Call provider.refresh()]`.

## Language preference

The workflow reads `language_preference` from `~/.claude/CLAUDE.md` and forwards it to sub-agents. Check that file before invoking spec sub-agents so their output matches the user's preferred language.
