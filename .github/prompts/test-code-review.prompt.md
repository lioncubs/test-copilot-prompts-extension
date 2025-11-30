---
name: test-code-review
description: Code review prompt with MCP integration for evaluating GitHub projects responsibly.
mode: agent
tools:
  - github-mcp-server-get_file_contents
  - github-mcp-server-list_pull_requests
  - github-mcp-server-pull_request_read
  - github-mcp-server-search_code
  - github-mcp-server-list_commits
  - github-mcp-server-get_commit
---

# Test Code-Review Prompt

This prompt provides functionality for evaluating GitHub projects responsibly using MCP (Model Context Protocol) commands. It can be triggered via MCP commands and supports local installation for standalone use.

## Instructions

Use this prompt to perform code reviews on GitHub repositories with the following capabilities:

### Step 1: Gather Repository Context

- Use MCP tools to fetch file contents and repository structure
- Identify the scope of changes (commits, pull requests, or specific files)
- Review repository-specific configurations and coding standards

### Step 2: Analyze Code Changes

- Examine code modifications for quality, security, and maintainability
- Check for adherence to project conventions and best practices
- Identify potential bugs, performance issues, or security vulnerabilities

### Step 3: Provide Structured Feedback

- Format review comments with clear categories and severity levels
- Include code examples and suggestions for improvement
- Reference relevant documentation or standards where applicable

## MCP Integration

This prompt leverages MCP (Model Context Protocol) for seamless GitHub integration:

### Available MCP Commands

| Command | Description |
|---------|-------------|
| `github-mcp-server-get_file_contents` | Retrieve file contents from repository |
| `github-mcp-server-list_pull_requests` | List open pull requests |
| `github-mcp-server-pull_request_read` | Get pull request details, diff, and status |
| `github-mcp-server-search_code` | Search code across repositories |
| `github-mcp-server-list_commits` | List repository commits |
| `github-mcp-server-get_commit` | Get commit details with diff |

### Triggering via MCP

To use this prompt with MCP, invoke it through your MCP-enabled client:

```
@workspace /prompts test-code-review
```

## Local Installation

For standalone use when the extension is uninstalled, copy this file to your repository:

```bash
# Create the prompts directory
mkdir -p .github/prompts

# Copy this file to your repository
cp test-code-review.prompt.md .github/prompts/
```

This enables the prompt to work directly with GitHub Copilot without requiring the extension.

## Output Format

Review feedback should follow this structure:

```markdown
## Code Review Summary

### Overview
- Repository: {repository_name}
- Review Scope: {scope_description}
- Files Reviewed: {file_count}

### Findings

#### 🔴 Critical Issues
- {issue_description}

#### 🟠 Major Issues
- {issue_description}

#### 🟡 Minor Issues
- {issue_description}

#### 🔵 Suggestions
- {suggestion_description}

### Recommendations
{detailed_recommendations}
```

## Variables

- `$REPO_OWNER`: Repository owner (username or organization)
- `$REPO_NAME`: Repository name
- `$PR_NUMBER`: Pull request number (when reviewing a PR)
- `$BRANCH`: Branch name for review scope
- `$FILE_PATH`: Specific file path to review

## Best Practices

### Do

- Review code changes incrementally for large PRs
- Provide actionable feedback with code examples
- Consider repository-specific conventions and patterns
- Acknowledge well-written code alongside issues

### Don't

- Include sensitive information in review comments
- Make assumptions without checking actual code
- Ignore repository-specific coding standards
- Provide feedback without context or justification
