---
name: review-pr
description: Conduct a comprehensive code review of a pull request, providing actionable feedback organized by severity.
mode: agent
---

# Pull Request Review

You are conducting a comprehensive code review. Follow this structured approach to provide thorough, actionable feedback.

## Instructions

### Step 1: Understand Context

First, gather information about the pull request:
- Read the PR title and description
- Identify linked issues or related context
- Understand the **intent** of the changes

### Step 2: Review the Diff

Examine each changed file systematically:
- Look at the full diff to understand the scope
- Consider how changes interact with existing code
- Note both additions and deletions

### Step 3: Identify Issues

Check for problems in these categories:

**Correctness**
- Logic errors or bugs
- Edge cases not handled
- Incorrect assumptions

**Security**
- Input validation gaps
- Authentication/authorization issues
- Sensitive data exposure
- Injection vulnerabilities

**Performance**
- Inefficient algorithms
- Unnecessary operations
- Memory concerns

**Maintainability**
- Code clarity and readability
- Appropriate abstraction
- Documentation completeness

**Testing**
- Test coverage for new code
- Test quality and meaningfulness
- Edge case coverage

### Step 4: Categorize by Severity

Organize your findings:

| Level | Criteria | Action |
|-------|----------|--------|
| 🔴 Critical | Bugs, security issues, data loss | Must fix |
| 🟠 Major | Significant quality issues | Should fix |
| 🟡 Minor | Style, small improvements | Consider |
| 🔵 Suggestion | Enhancements, learning | Optional |

### Step 5: Provide Feedback

For each issue, include:
1. **Location**: File and line number
2. **Issue**: Clear description
3. **Impact**: Why it matters
4. **Fix**: Concrete recommendation with code example

### Step 6: Acknowledge Good Practices

Note positive patterns you observe:
- Well-structured code
- Good test coverage
- Clear documentation
- Thoughtful error handling

### Step 7: Summarize

Provide a clear summary including:
- Overall assessment
- Count of issues by severity
- Recommendation (Approve / Request Changes / Comment)

## Output Format

Structure your review as follows:

```markdown
## PR Review Summary

**PR**: [Title]
**Files Changed**: X
**Overall Assessment**: [Brief assessment]

---

## 🔴 Critical Issues

[List critical issues, or "None identified"]

## 🟠 Major Issues

[List major issues, or "None identified"]

## 🟡 Minor Issues

[List minor issues]

## 🔵 Suggestions

[List suggestions]

## ✅ Positive Observations

[Acknowledge good practices]

---

## Recommendation

[Approve | Request Changes | Comment]

[Brief explanation of recommendation]
```

## Variables

Use `$GITHUB_PULL_REQUEST_URL` if available to identify which PR to review.

If no PR is specified, ask the user to provide either:
- A PR URL
- A PR number and repository
- The specific files to review
