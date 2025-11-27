# AGENTS.md - Source Code Specific Instructions

This file provides agent guidance specific to the `src/` directory and its subdirectories. These instructions supplement (and where specified, override) the root `AGENTS.md`.

## Scope

These instructions apply when an agent is:
- Reviewing source code files
- Generating new source code
- Refactoring existing source code
- Analyzing code for issues

## Source Code Review Focus Areas

### Code Structure

- Check for appropriate separation of concerns
- Verify functions/methods have single responsibilities
- Ensure consistent naming conventions
- Look for code duplication opportunities

### Error Handling

- Verify all error paths are handled
- Check for appropriate error messages
- Ensure errors are logged with sufficient context
- Confirm cleanup happens on error paths

### Type Safety

- Prefer explicit types over `any` or implicit types
- Validate type assertions and casts
- Check for potential null/undefined issues

### Performance Considerations

- Flag unnecessary iterations or nested loops
- Identify potential memory leaks
- Check for appropriate async/await usage
- Verify database queries are optimized

### Testing Requirements

For any new source code:
- Unit tests should cover happy path and error cases
- Integration tests for external dependencies
- Test names should describe the scenario being tested

## Language-Specific Guidelines

### TypeScript/JavaScript

- Prefer `const` over `let`, avoid `var`
- Use async/await over raw Promises
- Destructure when it improves readability
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Python

- Follow PEP 8 style guidelines
- Use type hints for function signatures
- Prefer context managers for resource handling
- Use f-strings for string formatting

### Go

- Handle all errors explicitly
- Use meaningful variable names (avoid single letters except in loops)
- Group related declarations
- Document exported functions and types

## Override: Feedback Severity

In source code, apply stricter severity than root `AGENTS.md`:

| Issue Type | Severity in `src/` |
|------------|-------------------|
| Unhandled errors | 🔴 Critical |
| Missing input validation | 🔴 Critical |
| Security vulnerabilities | 🔴 Critical |
| Missing tests for new code | 🟠 Major |
| Performance issues | 🟠 Major |
| Documentation gaps | 🟡 Minor |

## Checklist for Source Code Reviews

Before completing a source code review, verify:

- [ ] All new public functions/methods are documented
- [ ] Error handling is comprehensive
- [ ] No hardcoded secrets or sensitive data
- [ ] Appropriate logging is in place
- [ ] Tests exist and are meaningful
- [ ] No obvious performance issues
- [ ] Code follows established patterns in the codebase
