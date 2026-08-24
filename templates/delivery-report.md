# Small Web-App Repair Delivery Report

Use this report for one approved diagnosis-and-repair scope. Replace bracketed
instructions with the engagement facts. Write `Not applicable`, `Unknown`,
`Skipped`, or `Unavailable` rather than guessing.

Do not include passwords, API keys, tokens, cookies, private keys, unredacted
environment files, credential-bearing connection strings, production database
dumps, customer records, regulated data, or other sensitive values.

## 1. Engagement summary

- Application label:
- Affected environment:
- Report date and timezone:
- Client contact:
- Change approver:
- Work started:
- Work completed:
- Closure status: Completed and verified / Completed with limitations / Not
  resolved / Paused for client action / Escalated
- One-sentence outcome:

## 2. Approved scope

### Included

- Affected symptom:
- Application, service, route, or deployment included:
- Environment included:
- Diagnostic work included:
- Repair included:
- Verification included:

### Excluded

- Environments not included:
- Services, data, or requests not included:
- Additional defects or requests requiring separate approval:
- Other boundaries:

Completing intake or diagnosis did not authorize a repair. The repair described
below required its own specific approval.

## 3. Original symptom and expected behavior

### Client-reported symptom

- What the client reported:
- When it began or last worked:
- Impact:
- Safe workaround, if any:

### Directly observed symptom

- Observation:
- Reproduction environment:
- Reproduction steps:
  1.
  2.
  3.
- Expected result:
- Actual result:
- Date, time, and timezone:
- Reproduction status: Confirmed / Not reproduced / Not attempted
- If not reproduced or not attempted, reason and limitation:

Keep client reports separate from directly observed results.

## 4. Evidence

List only relevant, redacted evidence. Add or remove rows as needed.

| ID | Source and environment | Date and time | Observation | Supplied or directly checked | Limitation |
| --- | --- | --- | --- | --- | --- |
| E-01 |  |  |  |  |  |
| E-02 |  |  |  |  |  |
| E-03 |  |  |  |  |  |

### Evidence handling

- Redactions applied:
- Sensitive evidence received: No / Yes
- If yes, safe handling or deletion action:
- Evidence that was unavailable:
- Effect of unavailable evidence:

Do not place an exposed secret in this report. If one was exposed, record only
that notification and revocation or rotation were requested or confirmed.

## 5. Diagnosis

### Observations

- Observation 1:
- Observation 2:
- Observation 3:

### Evidence-supported diagnosis

- Diagnosed cause:
- How the observations support it:
- Confidence: High / Medium / Low
- What remains an inference:
- Alternative causes considered:
- Alternatives ruled out and supporting evidence:
- Unresolved alternatives:
- Known limitations:

Do not state a cause as certain when the evidence supports only a likely
explanation.

## 6. Proposed and approved repair

### Smallest proposed repair

- Proposed change:
- Why it addressed the diagnosis:
- Files expected to be affected:
- Settings expected to be affected:
- Services or deployment expected to be affected:
- Data expected to be affected:
- Items explicitly unchanged:
- Expected result:
- Expected interruption:
- Risks:
- Limitations:

At this stage, the repair was a proposal and had not yet been completed or
verified.

### Verification plan presented for approval

| Planned check | Environment | Expected result | Why needed |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Backup status presented for approval

- Data or configuration at risk:
- Backup available: Yes / No / Not required / Unknown
- Backup date and time:
- Backup contents:
- Backup owner:
- Stored separately: Yes / No / Unknown
- Restoration checked: Yes / No / Unknown
- Restoration limitation:
- Reason backup was not required, if applicable:

A backup must not be described as usable solely because a file or snapshot
exists.

### Rollback plan presented for approval

- State to restore:
- Previous known-good version available: Yes / No / Unknown
- Rollback method:
- Rollback approver:
- Rollback trigger:
- Possible interruption:
- Possible data mismatch or loss:
- Rollback verification:
- Rollback limitations:

### Specific repair approval

- Approval status: Approved / Not approved
- Authorized approver:
- Approved environment:
- Exact change approved:
- Approval date and time:
- Approval source:
- Conditions:
- Separately approved interruption, deployment, data action, or rollback:
- Actions not approved:

Do not continue to implementation unless the status is `Approved`. General
access, urgency, intake completion, or a request to “fix it” is not specific
repair approval.

## 7. Completed change

Complete this section only for work performed after specific approval.

- Implementation status: Completed / Partly completed / Not performed
- Environment changed:
- Start date and time:
- Completion or stop date and time:
- Did implementation match the approved plan? Yes / No / Not applicable
- Approved restart or interruption performed:
- Unexpected result:
- Deviation from the approved plan:
- Action taken after a deviation:

### Changed files and settings

Do not include secret values.

| File, setting, service, or deployment | Completed change | Reason | Within approved scope |
| --- | --- | --- | --- |
|  |  |  | Yes / No |
|  |  |  | Yes / No |
|  |  |  | Yes / No |

A completed change is not a verified result. Verification is recorded
separately below.

## 8. Verification results

Use only these statuses:

- **Passed:** The check ran and met its expected result.
- **Failed:** The check ran and did not meet its expected result.
- **Skipped:** The check was intentionally not run. State why and describe the
  limitation.
- **Unavailable:** The check could not run because a required environment,
  service, permission, tool, or evidence was unavailable. State the limitation.

Do not mark a skipped or unavailable check as passed.

| Check | Environment | Date and time | Expected result | Actual result | Status | Evidence or limitation |
| --- | --- | --- | --- | --- | --- | --- |
| Original symptom check |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Relevant automated tests |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Build check |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Service or deployment health |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Affected route or user flow |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Relevant regression check |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |
| Data-preservation check |  |  |  |  | Passed / Failed / Skipped / Unavailable |  |

### Verification summary

- Agreed success criteria met: Yes / No / Partly / Unknown
- Original symptom resolved:
- Relevant regressions found:
- Failed checks:
- Skipped checks and reasons:
- Unavailable checks and reasons:
- Environment limitations:
- Observation period:
- What these results establish:
- What these results do not establish:

Do not claim production health from a development, test, or staging result. Do
not claim continuing monitoring beyond the observation period recorded above.

## 9. Data preservation

- Data expected to remain unchanged:
- Persistent storage involved:
- Database migration performed: Yes / No
- Restore, reset, recreation, or deletion performed: Yes / No
- Data-preservation check:
- Result:
- Data limitation or uncertainty:
- Separate approval for any data operation:
- Data-owner confirmation, if required:

If data preservation cannot be confirmed, state that clearly and do not describe
the repair as fully verified.

## 10. Repair or rollback decision

- Decision: Repair retained / Rollback approved and completed / Awaiting rollback
  decision / Escalation required
- Decision date and time:
- Decision owner:
- Verification supporting the decision:
- Rollback trigger encountered:
- Separate rollback approval:
- Current application state:
- Current data state:
- Current service impact:

### If rollback was completed

- Files, settings, release, image, or deployment restored:
- Rollback start and completion time:
- Rollback verification:
- Rollback verification status: Passed / Failed / Skipped / Unavailable
- Remaining limitation:

### If rollback is awaiting a decision or escalation is required

- Safe state preserved:
- Decision needed:
- Risk of waiting:
- Specialist or authorized owner needed:

## 11. Scope changes and additional findings

Do not silently include additional work in the completed repair.

| Finding or request | Observation only or supported diagnosis | Effect on current repair | Separate scope needed | Status |
| --- | --- | --- | --- | --- |
|  |  |  | Yes / No | Recorded / Awaiting decision / Escalated |
|  |  |  | Yes / No | Recorded / Awaiting decision / Escalated |

- Did any finding prevent safe completion? Yes / No
- If yes, action taken:
- New approval received for additional work: Yes / No / Not applicable
- If yes, identify the separately approved scope:

## 12. Limitations and unresolved items

- Unresolved symptom:
- Unavailable evidence:
- Failed verification:
- Skipped verification:
- Unverified environment:
- Backup or restoration limitation:
- Rollback limitation:
- Data-preservation limitation:
- Monitoring limitation:
- Other limitation:
- Effect on closure:

## 13. Client actions and follow-up

| Action | Owner | Due date | Required before closure | Status |
| --- | --- | --- | --- | --- |
|  |  |  | Yes / No | Open / Completed |
|  |  |  | Yes / No | Open / Completed |
|  |  |  | Yes / No | Open / Completed |

Additional defects, feature requests, cleanup, upgrades, or broader deployment
work require a separately defined scope and specific approval.

## 14. Access and sensitive-material closure

- Temporary access used: Yes / No
- Access type:
- Access owner:
- Access revoked: Yes / No / Not applicable
- Revocation date and time:
- If not revoked, responsible person and deadline:
- Sensitive working copies returned or securely disposed of as agreed: Yes / No /
  Not applicable
- Secret exposure discovered: Yes / No
- If yes, owner notified: Yes / No
- Revocation or rotation status, without including the secret:
- Remaining access or data-handling action:

## 15. Escalation record

- Escalation required: Yes / No
- Reason:
- Work paused at:
- Safety or scope boundary:
- Specialist or authorized owner needed:
- Evidence safely provided for handoff:
- Sensitive evidence intentionally excluded:
- Current service and data state:

Use escalation when ownership is unclear, evidence is insufficient, access is
unsafe, rollback is unavailable, destructive data risk is unacceptable, or the
work requires qualified security, payment, regulated-data, recovery,
infrastructure, compliance, or critical-systems expertise.

## 16. Closure

- Closure status: Completed and verified / Completed with limitations / Not
  resolved / Paused for client action / Escalated
- Closure date and time:
- Approved scope completed: Yes / No / Partly
- Required verification passed: Yes / No / Partly
- Failed, skipped, and unavailable checks disclosed: Yes / No
- Repair or rollback decision recorded: Yes / No
- Data-preservation status recorded: Yes / No
- Unresolved risks disclosed: Yes / No
- Client actions assigned: Yes / No / Not applicable
- Access revocation addressed: Yes / No / Not applicable
- Delivery report provided: Yes / No
- Final client-visible summary:

Closure records the result observed during this engagement. It is not a
guarantee that the application will remain error-free or that systems and
environments not checked here are healthy.
