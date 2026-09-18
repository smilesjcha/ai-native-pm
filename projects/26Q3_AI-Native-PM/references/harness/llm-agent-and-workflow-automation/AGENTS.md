# Repository Guidance

## Working Agreement

- Keep each change focused on one stated objective.
- Inspect the relevant files before editing and preserve unrelated user changes.
- Treat generated code as a draft until its diff and test evidence are reviewed.
- Do not read, print, commit, or capture secrets, tokens, private meeting data, or real customer data.

## Code Review Rules

### Behavior and safety boundary

- Do not allow file access outside the configured workspace. Safe path: resolve the path first, then verify the resolved path remains under the workspace root.
- Do not add external writes, publishing, email, payment, deletion, or customer-data access without an explicit human approval boundary.
- Preserve stable result and error contracts. Do not replace a structured expected failure with a raw traceback or broad silent exception.
- Keep optional LLM/STT providers behind adapters and preserve a deterministic fixture fallback.

### Tests and evidence

- A behavior change must include a focused unit test. Include a normal case and the most consequential boundary or failure case.
- Do not weaken an existing policy, assertion, or test merely to make CI pass.
- Prefer deterministic tests for schema, path, permission, state transition, and error-code behavior.
- Before marking a change complete, run the narrow test and the full Day 1 suite, then report the exact command and result.

### Clean code

- Give each function one clear responsibility and keep side effects at explicit boundaries.
- Prefer explicit inputs, return types, and named error codes over hidden globals and magic values.
- Use small functions and domain names that explain why the code exists.
- Remove duplication only when the shared abstraction is clearer than the repeated code.
- Comments should explain policy, tradeoff, or intent—not restate the code.

### Review output

- Report only actionable findings tied to a changed line or missing test.
- State severity, user impact, reproduction condition, and the smallest safe correction.
- Separate deterministic CI issues from architectural or product judgment.
- Codex review, another LLM review, and passing tests are inputs to a human merge decision; none is an automatic approval.
