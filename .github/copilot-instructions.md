# Repository Instructions for GitHub Copilot

This repository contains a VS Code extension that distributes enterprise-specific GitHub Copilot customization files.

## Project Structure

- `src/` - TypeScript extension source code
- `templates/` - Template files that get distributed to users
- `package.json` - VS Code extension manifest

## Development

This is a VS Code extension built with TypeScript. Key commands:

```bash
npm install          # Install dependencies
npm run compile      # Build
npm run watch        # Watch mode
npm run lint         # Lint
```

## Template Files

The `templates/` directory contains placeholder files that enterprise admins should customize before distributing. These include:

- Prompt files (`.prompt.md`)
- Agent profiles (`.agent.md`)
- Agent instructions (`AGENTS.md`)
- Copilot instructions (`copilot-instructions.md`)

## Available Prompts

This repository includes the following prompts with MCP (Model Context Protocol) integration:

### Test Code-Review Prompt (`.github/prompts/test-code-review.prompt.md`)

A code review prompt that leverages MCP commands for evaluating GitHub projects:

- Trigger via: `@workspace /prompts test-code-review`
- Supports pull request reviews, commit analysis, and code search
- Provides structured feedback with severity categories

## Available Agents

### Test Reviewer Agent (`.github/agents/test-reviewer.agent.md`)

A specialized code review agent with MCP integration:

- Performs thorough repository analysis
- Integrates with pull requests and issue tracking
- Provides consistent, constructive feedback

## Local Installation

All prompts and agents can be installed locally for standalone use:

```bash
# Copy prompts to your repository
mkdir -p .github/prompts
cp .github/prompts/*.prompt.md your-repo/.github/prompts/

# Copy agents to your repository
mkdir -p .github/agents
cp .github/agents/*.agent.md your-repo/.github/agents/
```

This enables prompts and agents to work directly with GitHub Copilot without requiring the extension.
