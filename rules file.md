# Rules File (Agent Operating Guide)

This file defines the non-negotiable rules and operating discipline for all future tasks. Always consult and adhere to these rules before taking action.

---
## 0. Purpose
Provide a consistent, safe, efficient, auditable framework for autonomous / semi-autonomous coding, documentation, research, and execution actions in this workspace.

---
## 1. Golden Rule (ALWAYS FIRST)
**Before running ANY terminal command, editing files, or recommending implementation details: use Context7 to fetch the latest official documentation / instructions for the relevant library, framework, API, or tool.**
- Resolve library identifier (if ambiguous, clarify or pick best-match with rationale).
- Retrieve focused docs (e.g., routing, hooks, config) with sufficient token budget.
- Cross-check planned actions (APIs, flags, versions, deprecations) against fetched docs.
- If mismatch between local assumptions and latest docs: update plan and note delta.
- Log (briefly) that Context7 verification was performed.

Failure to perform documentation freshness check invalidates subsequent steps.

---
## 2. Core Operating Workflow
1. Intake & Requirements Extraction → Build explicit checklist (Done / Deferred tracking).
2. Context Gathering → File scans, searches, dependency / config review (batch read ops).
3. Plan Formation → Minimal, testable steps; identify risks & edge cases.
4. Validation of Plan Against Docs (Context7) → Adjust.
5. Implement (small, isolated edits; avoid unrelated refactors).
6. Quality Gates → Lint, type, build, tests, smoke run.
7. Report → Map requirements → status; note assumptions & follow-ups.
8. Persist Improvements (docs / README / tests) when low-risk.

---
## 3. Mandatory Rules (Numbered)
1. Documentation Freshness: Always perform Golden Rule (Section 1) before shell execution.
2. Requirements Checklist: Never begin edits without explicit checklist derived from user ask.
3. Least Assumption: If a detail is missing, make at most two explicit, reversible assumptions and label them; only ask user if blocked.
4. Safety First: No destructive commands (rm -rf, force resets, credential exposure) unless explicitly requested and justified.
5. Scope Containment: Edit only what the task requires—no drive-by stylistic changes.
6. Atomic Patches: Group logically related changes per file; avoid mixing concerns (logic + large formatting simultaneously).
7. Verification Loop: After code edits, run build/tests; do not conclude with a known failing state if a fix is feasible.
8. Idempotent Actions: Re-running the same step should not corrupt state (avoid duplicating entries / config lines).
9. Error Transparency: Surface exact error output succinctly; provide hypothesis + targeted next step.
10. Dependency Discipline: Introduce new dependencies only if (a) necessary, (b) lightweight, (c) reputable; pin versions or respect existing lock strategy.
11. Security & Privacy: Never log secrets, tokens, PII; scrub or omit when summarizing.
12. API Change Awareness: Check for deprecations or breaking changes in docs before using an API.
13. Performance Mindfulness: Highlight potential hotspots (N+1 queries, large DOM re-renders, heavy loops) when encountered.
14. Accessibility Consideration: When generating UI, ensure semantic elements, ARIA where necessary, contrast awareness.
15. Testing Priority: For new logic with potential branches, add (or outline) minimal tests: happy path + boundary/error.
16. Deterministic Outputs: Avoid non-deterministic behaviors (random seeds, time) in tests unless controlled/mocked.
17. Logging Restraint: Suggest structured logging (level, context) but do not spam debug logs into production paths.
18. Version Awareness: Infer and respect framework/library versions from existing config—don’t assume latest unless confirmed.
19. Cross-Platform Neutrality: Use shell-appropriate commands (currently PowerShell) and avoid bashisms unless confirmed environment.
20. Incremental Refactor Flag: If deeper architectural issue discovered, log it under Follow-Ups instead of mixing into current patch.
21. Document Delta: Whenever you adjust design/behavior, update or create concise inline comments and/or relevant markdown.
22. Fail Fast on Unknowns: If a critical precondition is unverifiable locally, note it early rather than proceeding on shaky ground.
23. Avoid Hallucination: Do not invent file paths, APIs, commands, or environment details—verify with search/read before referencing.
24. Tool Strategy: Batch read-only queries; avoid unnecessary re-reads of unchanged content.
25. Concurrency Awareness: When creating code with async flows, mention race conditions, locking, or ordering concerns if relevant.
26. Data Validation: Input boundaries & sanitization must be enforced or explicitly deferred with a note.
27. Rollback Plan: For risky changes, outline quick reversal steps (file revert, dependency uninstall) before applying.
28. Minimal Surface Exposure: Export only needed symbols; avoid widening public API inadvertently.
29. Consistent Naming: Follow existing project naming conventions; if unclear, choose descriptive, lower-cognitive-load names.
30. Completion Criteria: Do not mark a requirement Done unless code + (if applicable) tests + docs reflect it.

---
## 4. Context7 Usage Protocol (Expanded)
- Step A: Resolve library (mcp_context7_resolve-library-id) with query matching task domain.
- Step B: Retrieve focused docs (mcp_context7_get-library-docs) specifying topic.
- Step C: Extract: version tags, breaking changes, recommended patterns, deprecated APIs.
- Step D: Cross-check plan; annotate any divergences.
- Step E: Proceed only after confirmation.

If docs retrieval fails: retry once; if still failing, note outage and proceed cautiously with explicit caveat.

---
## 5. Quick Pre-Execution Checklist
- [ ] Requirements extracted & listed
- [ ] Context7 docs fetched & validated
- [ ] Assumptions (if any) stated
- [ ] Plan steps drafted
- [ ] Risk / edge cases noted
- [ ] Implementation performed
- [ ] Build / lint / tests executed
- [ ] Results & coverage mapped
- [ ] Follow-ups logged

---
## 6. Edge Case Categories To Consider
- Empty / null inputs
- Large datasets / pagination boundaries
- Network timeouts / transient failures
- Race conditions / concurrent mutations
- Permission / auth failures
- Localization / formatting differences (currency, dates)
- Degraded mode when external API unavailable

---
## 7. Follow-Up Logging Template
When deferring work, record:
```
Title: (Short name)
Category: Tech Debt | Perf | Security | UX | Docs | Arch
Impact: (Why it matters)
Suggested Approach: (One-liner)
Priority: P1 / P2 / P3
```

---
## 8. Change Control & Evolution
- Any modifications to these rules must: (a) be justified, (b) be versioned with date, (c) preserve the Golden Rule.
- Append a Changelog section when first amendment occurs.

---
## 9. Current Version
Version: 1.0.0
Date: 2025-08-10
Authoring Context: Initial ruleset creation.

---
## 10. Final Reminder
If a future action conflicts with a numbered rule, halt and resolve the conflict before proceeding. The Golden Rule (Section 1) supersedes all others.
