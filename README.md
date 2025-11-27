# Code Review Assistant - Copilot Extension Specification

This repository contains the specification and configuration files for the **Code Review Assistant** GitHub Copilot Extension. This is a server-side agent designed to help developers conduct thorough, consistent, and educational code reviews across their projects.

## Extension Concept

The Code Review Assistant provides three core capabilities:

1. **PR Review** - Comprehensive pull request review with actionable feedback organized by severity
2. **Improvement Suggestions** - Proactive recommendations for code quality enhancements
3. **Security Analysis** - Targeted security vulnerability detection and remediation guidance

The extension emphasizes educational, constructive feedback rather than just criticism. Every suggestion includes an explanation of "why" it matters, helping developers learn and improve.

## File Structure

```
.
├── .github/
│   ├── agents/
│   │   └── code-review-assistant.agent.md  # Custom agent profile
│   ├── prompts/
│   │   ├── review-pr.prompt.md             # PR review workflow
│   │   ├── suggest-improvements.prompt.md  # Code quality suggestions
│   │   └── check-security.prompt.md        # Security-focused review
│   └── copilot-instructions.md             # Repository custom instructions
├── src/
│   └── AGENTS.md                           # Source-specific agent guidance
├── AGENTS.md                               # Repository-wide agent instructions
└── README.md                               # This file
```

## How the Files Work Together

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | Entire repository | Project context and general Copilot behavior |
| `AGENTS.md` | Repository root and below | High-level agent behavior guidelines |
| `src/AGENTS.md` | `src/` directory and below | Source-specific agent guidance |
| `.github/agents/code-review-assistant.agent.md` | When agent is invoked | Defines the Code Review Assistant persona |
| `.github/prompts/*.prompt.md` | On-demand | Structured prompts for specific review tasks |

### Relationship Between Files

- **copilot-instructions.md** vs **AGENTS.md**: The copilot-instructions file provides general project context for all Copilot interactions, while AGENTS.md provides specific behavioral guidance for AI agents (like the Copilot coding agent) that uses nearest-file-wins semantics.

- **AGENTS.md** vs **src/AGENTS.md**: The root AGENTS.md applies repository-wide, while src/AGENTS.md provides more specific guidance for source code files, demonstrating the scoping capability.

- **.agent.md profile**: Narrows and operationalizes the general guidance from the other files into a specific persona with defined capabilities and constraints.

## Usage

### Prompt Files

Invoke prompts in VS Code by typing `@workspace /prompts` and selecting:
- `review-pr` - For comprehensive PR reviews
- `suggest-improvements` - For code quality improvement recommendations
- `check-security` - For security-focused code analysis

### Custom Agent

The `code-review-assistant` agent can be invoked by the Copilot coding agent to perform thorough code reviews with consistent formatting and severity categorization.

## Documentation References

- [Set up Copilot Extensions (agents)](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-extensions/set-up-copilot-extensions)
- [About Copilot Extensions](https://docs.github.com/en/copilot/concepts/context/copilot-extensions)
- [Custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt files](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file)
- [AGENTS.md format reference](https://agents.md)
- [Custom agent profiles](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)

