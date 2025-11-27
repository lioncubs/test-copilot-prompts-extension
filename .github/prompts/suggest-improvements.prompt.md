---
name: suggest-improvements
description: Analyze code and provide targeted improvement suggestions for quality, maintainability, and best practices.
mode: agent
---

# Code Improvement Suggestions

You are analyzing code to provide targeted improvement suggestions. Focus on actionable recommendations that enhance code quality, maintainability, and adherence to best practices.

## Instructions

### Step 1: Understand the Code

Before suggesting improvements:
- Read through the code to understand its purpose
- Identify the patterns and conventions already in use
- Note the language, framework, and context

### Step 2: Analyze Quality Dimensions

Evaluate the code across these dimensions:

**Readability**
- Clear naming conventions
- Appropriate comments and documentation
- Logical code organization
- Consistent formatting

**Maintainability**
- Single responsibility principle
- Appropriate abstraction levels
- DRY (Don't Repeat Yourself)
- Clear interfaces and contracts

**Robustness**
- Error handling completeness
- Input validation
- Edge case handling
- Defensive programming

**Performance**
- Algorithm efficiency
- Resource usage
- Caching opportunities
- Unnecessary operations

**Testability**
- Dependency injection usage
- Side effect isolation
- Mockability
- Clear test boundaries

### Step 3: Generate Suggestions

For each improvement opportunity:

1. **Identify**: What could be improved
2. **Explain**: Why it matters
3. **Demonstrate**: Show the improved code
4. **Quantify**: What benefit does it provide

### Step 4: Prioritize Recommendations

Rank suggestions by impact:

| Priority | Impact | Effort | Recommend |
|----------|--------|--------|-----------|
| High | High value, addresses real problems | Worth the effort |
| Medium | Moderate improvement | If time permits |
| Low | Nice to have, polish | Future consideration |

## Output Format

Structure your suggestions as follows:

```markdown
## Code Improvement Suggestions

**File(s) Analyzed**: [filename(s)]
**Language**: [language]
**Overall Assessment**: [brief assessment of current quality]

---

### High Priority Improvements

#### 1. [Improvement Title]

**Current Code** (`file.ts:lines`):
\`\`\`typescript
// Current implementation
\`\`\`

**Issue**: [What's the problem]

**Improved Code**:
\`\`\`typescript
// Improved implementation
\`\`\`

**Benefits**:
- [Benefit 1]
- [Benefit 2]

---

### Medium Priority Improvements

[Same format as above]

---

### Low Priority / Future Considerations

[Brief list of nice-to-haves]

---

## Summary

- **High Priority**: X suggestions
- **Medium Priority**: Y suggestions
- **Low Priority**: Z suggestions

**Recommended Next Steps**:
1. [First action]
2. [Second action]
```

## Focus Areas

When analyzing code, pay special attention to:

### Patterns to Improve

- Long functions that do too much
- Deeply nested conditionals
- Duplicated code blocks
- Magic numbers and strings
- Inconsistent error handling
- Missing null/undefined checks
- Overly complex logic
- Poor naming choices

### Patterns to Encourage

- Clear function and variable names
- Early returns to reduce nesting
- Const by default
- Descriptive error messages
- Guard clauses
- Composition over inheritance
- Immutability where appropriate

## Variables

Use these if provided:
- `$FILE_PATH`: Specific file to analyze
- `$FOCUS_AREA`: Particular aspect to focus on (e.g., "performance", "error handling")

If no specific file is provided, ask the user which file(s) they'd like you to analyze.
