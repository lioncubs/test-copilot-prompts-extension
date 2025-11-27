# Enterprise Copilot Prompts Extension

A VS Code extension that distributes enterprise-specific GitHub Copilot customization files (prompts, agents, and instruction files) to development teams.

## Purpose

This extension enables enterprise teams to:

- **Standardize** Copilot interactions across the organization
- **Distribute** approved prompt templates, agent profiles, and instructions
- **Maintain** consistent coding standards and practices via AI guidance
- **Deploy** to private VS Code extension servers for enterprise-only distribution

## What Gets Distributed

When developers install this extension and run "Initialize Enterprise Copilot Files", they receive:

```
.github/
├── agents/
│   └── example-agent.agent.md      # Custom agent profiles
├── prompts/
│   └── example-prompt.prompt.md    # Reusable prompt templates
└── copilot-instructions.md         # Repository-wide Copilot context

src/
└── AGENTS.md                       # Source code-specific agent guidance

AGENTS.md                           # Root agent instructions
```

## Installation (For Developers)

1. Install this extension from your enterprise VS Code extension server
2. Open a workspace/folder in VS Code
3. Run command: `Enterprise Copilot: Initialize Enterprise Copilot Files`
4. Template files are copied to your workspace

## Available Commands

| Command | Description |
|---------|-------------|
| `Enterprise Copilot: Initialize Enterprise Copilot Files` | Copy template files to current workspace |
| `Enterprise Copilot: Update Enterprise Copilot Prompts` | Update existing prompt files |
| `Enterprise Copilot: Show Available Prompts` | View list of available prompt templates |

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `enterpriseCopilotPrompts.autoUpdate` | `false` | Auto-update prompts when extension updates |

## Customizing Templates (For Extension Maintainers)

To customize the templates distributed by this extension:

1. Edit files in the `templates/` directory
2. Replace placeholder content with enterprise-specific guidelines
3. Rebuild and republish the extension

### Template Files

| File | Purpose |
|------|---------|
| `templates/AGENTS.md` | Root agent instructions |
| `templates/src/AGENTS.md` | Source code agent guidance |
| `templates/.github/copilot-instructions.md` | Repository Copilot context |
| `templates/.github/prompts/*.prompt.md` | Prompt templates |
| `templates/.github/agents/*.agent.md` | Agent profiles |

## Building the Extension

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package for distribution
npx vsce package
```

This creates an `.vsix` file that can be uploaded to your enterprise VS Code extension server.

## Enterprise Distribution

1. Build the `.vsix` package
2. Upload to your enterprise VS Code extension server (e.g., Azure DevOps Artifacts, Open VSX, private Marketplace)
3. Configure VS Code to use your enterprise extension server
4. Developers can then install the extension from the enterprise server

## Documentation References

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt files](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files/your-first-prompt-file)
- [AGENTS.md format reference](https://agents.md)
- [Custom agent profiles](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)

