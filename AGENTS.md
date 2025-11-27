# AGENTS.md - Extension Repository Instructions

This file provides guidance for AI agents working on this VS Code extension repository.

## Project Purpose

This repository contains a VS Code extension that distributes enterprise-specific GitHub Copilot customization files (prompts, agents, instructions) to development teams.

## Repository Structure

```
.
├── src/                    # Extension source code (TypeScript)
├── templates/              # Template files distributed to users
│   ├── .github/
│   │   ├── agents/         # Agent profile templates
│   │   ├── prompts/        # Prompt file templates
│   │   └── copilot-instructions.md
│   ├── src/
│   │   └── AGENTS.md       # Source-scoped agent instructions template
│   └── AGENTS.md           # Root agent instructions template
├── package.json            # VS Code extension manifest
└── tsconfig.json           # TypeScript configuration
```

## Development Guidelines

### Extension Code (`src/`)

- Follow VS Code extension API best practices
- Use TypeScript with strict mode
- Handle errors gracefully with user-friendly messages
- Test file operations across platforms

### Template Files (`templates/`)

- Keep templates generic and customizable
- Include clear "Note" sections explaining customization
- Follow GitHub Copilot documentation conventions
- Use YAML frontmatter for prompts and agents

## Building and Testing

```bash
npm install          # Install dependencies
npm run compile      # Build the extension
npm run watch        # Watch mode for development
npm run lint         # Run ESLint
```

## Packaging for Enterprise Distribution

```bash
npx vsce package     # Creates .vsix file for distribution
```

The resulting `.vsix` file can be uploaded to your enterprise VS Code extension server.
