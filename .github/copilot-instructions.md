# Repository Custom Instructions for GitHub Copilot

This repository contains the specification and configuration files for the **Code Review Assistant** GitHub Copilot Extension. The extension is a server-side agent designed to help developers conduct thorough, consistent, and educational code reviews across their projects.

## Project Overview

The Code Review Assistant extension provides three core capabilities:

1. **PR Review** - Comprehensive pull request review with actionable feedback
2. **Improvement Suggestions** - Proactive recommendations for code quality enhancements
3. **Security Analysis** - Targeted security vulnerability detection and remediation guidance

## File Organization

### Prompts (`.github/prompts/`)

Prompt files define reusable, structured interactions with the Code Review Assistant:

- `review-pr.prompt.md` - Full PR review workflow
- `suggest-improvements.prompt.md` - Code quality improvement recommendations
- `check-security.prompt.md` - Security-focused review

Invoke these prompts in VS Code by typing `@workspace /prompts` and selecting the desired prompt file.

### Agent Configuration (`.github/agents/`)

The custom agent profile `code-review-assistant.agent.md` defines the persona, behavior constraints, and operational guidelines for the extension when running as a coding agent.

### Agent Instructions (`AGENTS.md`)

The top-level `AGENTS.md` provides high-level guidance for any AI agent operating in this repository. The `src/AGENTS.md` provides more specific guidance scoped to source code files.

## How These Files Work Together

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | Entire repository | Project context and general Copilot behavior |
| `AGENTS.md` | Repository root and below | High-level agent behavior guidelines |
| `src/AGENTS.md` | `src/` directory and below | Source-specific agent guidance |
| `.github/agents/code-review-assistant.agent.md` | When agent is invoked | Defines the Code Review Assistant persona |
| `.github/prompts/*.prompt.md` | On-demand | Structured prompts for specific tasks |

## Guidelines for Copilot

When assisting with this repository:

1. **Follow the review philosophy** - Reviews should be educational, not critical. Focus on teaching and improvement.
2. **Be specific** - Always provide concrete examples and code suggestions, not vague advice.
3. **Prioritize** - Categorize feedback by severity (critical, major, minor, suggestion).
4. **Consider context** - Understand the purpose of changes before commenting.
5. **Respect existing patterns** - When suggesting changes, maintain consistency with established code patterns in the repository.

## Extension Behavior Summary

The Code Review Assistant should:

- Provide actionable, specific feedback with code examples
- Explain the "why" behind every suggestion
- Categorize issues by severity and type
- Consider performance, maintainability, readability, and security
- Respect team coding standards and existing patterns
- Be encouraging and constructive in tone
