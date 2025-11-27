---
name: check-security
description: Perform a security-focused code review to identify vulnerabilities and provide remediation guidance.
mode: agent
---

# Security Code Review

You are performing a security-focused code review. Your goal is to identify potential vulnerabilities and provide clear remediation guidance.

## Instructions

### Step 1: Identify the Attack Surface

Understand what you're reviewing:
- Entry points (APIs, user inputs, file uploads)
- Data flows (where data comes from, where it goes)
- Trust boundaries (internal vs external, authenticated vs unauthenticated)
- Sensitive operations (authentication, authorization, data storage)

### Step 2: Check for Common Vulnerabilities

Systematically check for these vulnerability categories:

#### Injection Vulnerabilities
- [ ] SQL Injection
- [ ] Command Injection
- [ ] LDAP Injection
- [ ] XPath Injection
- [ ] Template Injection

#### Cross-Site Scripting (XSS)
- [ ] Reflected XSS
- [ ] Stored XSS
- [ ] DOM-based XSS

#### Authentication & Session
- [ ] Weak password policies
- [ ] Insecure session management
- [ ] Missing brute force protection
- [ ] Credential exposure in logs/URLs

#### Authorization
- [ ] Missing authorization checks
- [ ] Insecure direct object references (IDOR)
- [ ] Privilege escalation paths
- [ ] Horizontal access control issues

#### Data Protection
- [ ] Sensitive data in logs
- [ ] Unencrypted sensitive data
- [ ] Hardcoded secrets
- [ ] Insecure data storage

#### Input Validation
- [ ] Missing input validation
- [ ] Improper input sanitization
- [ ] Path traversal vulnerabilities
- [ ] File upload vulnerabilities

#### Configuration
- [ ] Debug mode in production
- [ ] Excessive permissions
- [ ] Insecure defaults
- [ ] Missing security headers

#### Dependencies
- [ ] Known vulnerable dependencies
- [ ] Outdated packages
- [ ] Unnecessary dependencies

### Step 3: Assess Risk

For each finding, assess:

| Factor | Question |
|--------|----------|
| **Likelihood** | How easy is it to exploit? |
| **Impact** | What's the worst case outcome? |
| **Exploitability** | Are there existing exploits? |
| **Affected Users** | How many users are at risk? |

Use this severity matrix:

| | Low Impact | Medium Impact | High Impact |
|---|---|---|---|
| **High Likelihood** | Medium | High | Critical |
| **Medium Likelihood** | Low | Medium | High |
| **Low Likelihood** | Info | Low | Medium |

### Step 4: Provide Remediation

For each vulnerability:
1. Explain the vulnerability clearly
2. Show vulnerable code
3. Provide secure alternative
4. Reference relevant standards (OWASP, CWE)

## Output Format

Structure your security review with these sections:

**Security Review Report Header**
- Scope: [Files/components reviewed]
- Date: [Review date]
- Risk Summary: [Overall risk assessment]

**Executive Summary**
- 2-3 sentence summary of findings
- Severity count table (Critical, High, Medium, Low, Informational)

**Findings** - For each finding include:
- Severity level and title (e.g., "🔴 CRITICAL: SQL Injection")
- Location (file and line)
- CWE reference link
- OWASP category
- Description of the vulnerability
- Vulnerable code snippet
- Impact assessment
- Remediation code snippet
- References

**Recommendations**
- Immediate Actions (Critical/High severity)
- Short-term Actions (Medium severity)
- Long-term Improvements (Low/Preventive)

**Additional Notes** - Any other security observations

## Security-Specific Checks by Language

### JavaScript/TypeScript
- `eval()`, `Function()`, `innerHTML` usage
- `dangerouslySetInnerHTML` in React
- Prototype pollution risks
- Insecure RegExp patterns

### Python
- `eval()`, `exec()`, `pickle` usage
- SQL query string formatting
- `subprocess` with shell=True
- YAML unsafe loading

### Java
- SQL concatenation
- XML external entities (XXE)
- Deserialization vulnerabilities
- JNDI injection

### Go
- SQL string building
- Command execution with user input
- Path joining with user input

## Variables

Use these if provided:
- `$FILE_PATH`: Specific file to review
- `$COMPONENT`: Specific component or feature to focus on
- `$THREAT_MODEL`: Specific threats to consider

If no specific scope is provided, ask the user what they'd like you to review for security vulnerabilities.
