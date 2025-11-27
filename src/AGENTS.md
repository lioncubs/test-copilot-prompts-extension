# AGENTS.md - Extension Source Code

This file provides guidance for AI agents working on this VS Code extension's source code.

## Project Context

This is a VS Code extension that distributes enterprise-specific GitHub Copilot customization files (prompts, agents, instructions) to development teams.

## Code Guidelines

### TypeScript Standards

- Use strict TypeScript with explicit types
- Prefer `const` over `let`, avoid `var`
- Use async/await for asynchronous operations
- Handle all VS Code API errors appropriately

### Extension Development

- Follow VS Code extension API best practices
- Dispose of resources properly in `deactivate()`
- Use configuration API for user settings
- Provide meaningful progress indicators for file operations

### File Operations

- Always check for existing files before overwriting
- Prompt user before replacing existing files
- Use VS Code's workspace file system API where possible
- Handle cross-platform path differences
