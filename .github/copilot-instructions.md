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
