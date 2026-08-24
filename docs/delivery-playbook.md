# Small Web-App Diagnosis-to-Delivery Playbook

## Purpose

This playbook describes a safe, evidence-based process for diagnosing and
repairing deployment problems in small web applications.

It separates:

- what was observed;
- what the evidence supports;
- what change is proposed;
- what change was approved and completed; and
- what verification actually showed.

Completing intake or allowing diagnostic access does not authorize a repair,
deployment, restart, rollback, data operation, service interruption, or
deletion. Every repair requires approval for the specific proposed change
before implementation begins.

## Working principles

### Protect secrets and sensitive data

Do not place passwords, API keys, access tokens, session cookies, private keys,
unredacted environment files, credential-bearing connection strings, production
database dumps, customer records, or regulated data in messages, reports,
screenshots, logs, or source control.

Replace sensitive values with clear labels such as `[REDACTED_TOKEN]` and
`[REDACTED_HOST]`. Keep only the smallest redacted excerpt needed to support the
diagnosis.

If a secret is exposed, stop sharing it, notify the appropriate owner, and have
it revoked or rotated through the service that issued it. Do not repeat the
secret in the report.

### Use the least access necessary

Begin with client-provided descriptions and redacted evidence whenever possible.
If access is necessary:

- confirm that the person granting access is authorized;
- limit access to the affected application and environment;
- use read-only access first;
- use a temporary role with an owner and expiration time;
- avoid personal credentials and unrestricted administrator access;
- request write access only for an identified, approved change; and
- revoke access when the work is complete.

Access to diagnose a problem is not permission to change the system.

### Protect data and service availability

Do not use production as a test environment when reproduction could change or
delete data, reveal information, interrupt service, affect users, or create
charges.

Do not delete or recreate databases, persistent volumes, or other stored data as
a routine troubleshooting step. A migration, restore, reset, deletion, or other
destructive action requires:

- a separately approved scope;
- a suitable backup;
- a recovery plan whose limitations are understood;
- an authorized data owner; and
- appropriate specialist involvement when the data is important or sensitive.

### Report facts without overstating results

Use these labels consistently:

- **Observation:** Something directly seen in a log, response, test, browser,
  service status, configuration, or client report.
- **Inference:** An explanation supported by observations but not itself directly
  observed.
- **Proposed change:** A change that has not been made and is not yet authorized.
- **Completed change:** A change that was made after approval.
- **Verified result:** A result supported by a recorded check performed after the
  change.

Do not describe an inference as a confirmed fact. Do not describe a proposed
change as completed. Do not describe a completed change as successful until the
agreed verification has passed.

## Engagement stages

### 1. Confirm ownership and scope

#### Goal

Confirm that the request is authorized, suitable for this workflow, and narrow
enough to handle safely.

#### Required information

Record:

- the application and affected environment;
- whether the environment is development, test, staging, or production;
- the person authorized to request the work;
- the person authorized to approve changes;
- the observed symptom and expected behavior;
- the business and user impact;
- the known data sensitivity;
- the agreed diagnostic boundary; and
- the systems, environments, and requests that are outside scope.

#### Client-visible output

Provide a scope confirmation containing:

- the problem being investigated;
- the affected application and environment;
- the diagnostic work included;
- known exclusions and limitations;
- the authorized contacts;
- the minimum evidence or access needed next; and
- a reminder that diagnosis does not authorize repair.

#### Stop conditions

Pause and request clarification if ownership, authority, the affected
environment, the expected behavior, or the scope is unclear.

Decline or refer the request to an appropriately qualified specialist if it
involves:

- a suspected security incident, intrusion, malware, credential theft, or data
  breach;
- penetration testing or security-audit claims;
- payment processing, cardholder data, or financial-transaction integrity;
- regulated personal, health, financial, education, or government data;
- critical infrastructure, safety-critical systems, emergency services, or a
  risk of physical harm;
- disputed ownership;
- bypassing authentication or disabling security controls;
- destructive recovery without a suitable recovery plan; or
- legal, compliance, forensic, or specialist operational work outside the
  agreed deployment scope.

Do not collect additional sensitive evidence merely to confirm that the request
is outside scope.

### 2. Define safe reproduction and success criteria

#### Goal

Agree on a repeatable way to observe the problem without creating unacceptable
risk.

#### Required information

Record:

- the starting state;
- the shortest reproduction steps;
- the expected result;
- the actual result;
- the safe environment where the steps will run;
- possible effects on data, service, users, or cost;
- any safe workaround; and
- the result that will count as a successful repair.

Prefer a disposable, development, test, or staging environment. Do not reproduce
in production when the steps could be destructive or disruptive.

#### Client-visible output

Provide a reproduction plan that states:

- the exact checks to be performed;
- where they will be performed;
- the expected and failing results;
- any safety limits;
- what will not be tested; and
- the agreed success criteria.

If safe reproduction is unavailable, record that limitation. Do not manufacture
a reproduction result or proceed by guesswork.

### 3. Collect and preserve evidence

#### Goal

Gather enough relevant evidence to support or reject a diagnosis.

#### Evidence sources

Use the minimum necessary combination of:

- redacted error messages and timestamps;
- build or deployment output;
- application, container, proxy, or platform logs;
- HTTP status codes and redacted response bodies;
- browser console or network results;
- health-check results;
- service or container status;
- relevant configuration with secret values removed;
- runtime and dependency versions;
- recent changes;
- prior repair attempts; and
- safe reproduction results.

For every evidence item, record:

- what was checked;
- the command, request, or action, when safe to disclose;
- the environment;
- the date, time, and timezone;
- the observed result;
- whether the result was supplied by the client or directly reproduced; and
- any redaction or limitation that affects interpretation.

#### Client-visible output

Provide an evidence summary that lists observations without mixing them with
conclusions. Mark unavailable or inconclusive evidence clearly.

#### Stop conditions

Pause if:

- the evidence is insufficient or contradictory;
- important logs or configuration cannot be safely redacted;
- offered access is broader than necessary;
- reproduction could cause unacceptable harm;
- earlier repair attempts have left the system in an unknown state; or
- gathering more evidence would cross the agreed scope.

### 4. Form an evidence-supported diagnosis

#### Goal

Explain the most likely cause and show how the evidence supports it.

#### Required analysis

Document separately:

1. **Observed symptom:** What directly failed.
2. **Relevant observations:** The evidence connected to the failure.
3. **Diagnosis:** The cause supported by that evidence.
4. **Reasoning:** How the observations support the diagnosis.
5. **Alternatives considered:** Plausible causes that were ruled out or remain
   unresolved.
6. **Confidence and limitations:** What is known, what is inferred, and what is
   still unknown.

Timing alone does not prove that a recent change caused the problem. A diagnosis
must account for the observed failure and should be testable through the proposed
repair and verification plan.

#### Client-visible output

Provide a diagnosis summary in plain language. Do not claim certainty beyond the
evidence.

#### Stop conditions

Do not propose implementation if there is not enough evidence to identify a
small, testable change. Request more information, narrow the claim, or explain
that the cause remains unconfirmed.

### 5. Propose the smallest safe repair

#### Goal

Describe the least invasive change that addresses the supported diagnosis.

#### Required proposal

State:

- the exact proposed change;
- why it addresses the diagnosis;
- the files, settings, services, deployment, and data it could affect;
- what will remain unchanged;
- prerequisites;
- expected service interruption, if any;
- risks and known limitations;
- the checks that will be run after the change;
- the backup status;
- the rollback method and trigger; and
- the person authorized to approve the change.

The proposal must not silently include unrelated cleanup, upgrades, refactoring,
feature work, or additional defects discovered during diagnosis.

#### Backup gate

Before approval, record:

- what data or configuration could be affected;
- whether a recent backup exists;
- when it was created and what it includes;
- who controls it;
- whether restoration has been checked; and
- whether it is stored separately from the affected deployment.

A snapshot or file must not be described as a usable backup solely because it
exists. If restoration has not been checked, state that limitation.

#### Rollback gate

Before approval, record:

- the files, settings, release, image, or deployment to restore;
- whether the previous known-good state is available;
- who can authorize rollback;
- how rollback would be performed;
- possible interruption or data mismatch;
- the check that would confirm rollback; and
- any reason rollback may be unavailable or unsafe.

If a suitable rollback or recovery path is required but unavailable, stop. Do
not proceed merely because the proposed change appears small.

#### Client-visible output

Provide a change proposal that clearly remains a proposal. It must not imply
that implementation or verification has occurred.

### 6. Obtain specific repair approval

#### Goal

Ensure the authorized person understands and approves the exact repair.

#### Approval request

Present:

- the observed symptom;
- the evidence-supported diagnosis;
- the exact proposed change;
- affected files, settings, services, deployment, and data;
- expected result;
- verification plan;
- backup and restoration status;
- rollback plan;
- risks, limitations, and possible interruption; and
- actions explicitly excluded from the approval.

Record:

- the approver's name or authorized role;
- the approved change;
- the environment;
- the approval date and time;
- any conditions; and
- the approval source.

#### Approval rule

Do not implement without specific approval. A request to “fix it,” general
account access, approval for diagnosis, prior approval for another change, or
urgency is not approval for the proposed repair.

A materially changed repair plan requires a new approval before work continues.

Destructive data operations, production deployment, service interruption,
rollback, and broader access require explicit approval when they are not already
identified and specifically approved in the repair plan.

### 7. Prepare the change safely

#### Goal

Confirm that implementation can begin without exceeding the approval.

#### Pre-change checklist

Confirm:

- the current scope still matches the approved proposal;
- the approved environment is correctly identified;
- access is limited to what the change requires;
- secrets and sensitive data are protected;
- the current state needed for rollback is preserved;
- the recorded backup and rollback assumptions remain valid;
- the verification steps are ready;
- the approver's conditions are satisfied; and
- no unapproved data or service action is included.

Record the relevant pre-change state without copying secrets into the report.

#### Stop conditions

Stop before making a change if:

- the target environment is uncertain;
- the system differs materially from the diagnosed state;
- the backup or rollback position has changed;
- implementation would affect additional files, services, data, or users;
- elevated access beyond the approved need is required; or
- new risk makes the approved plan unsafe.

Return to the proposal and approval stages when the plan must change.

### 8. Implement only the approved repair

#### Goal

Apply the approved change while preserving a clear record of what actually
happened.

#### Implementation record

Record:

- the start and completion time;
- the environment;
- each changed file, setting, service, image, or deployment;
- a plain-language description of each change;
- any approved restart or interruption;
- whether implementation matched the approved plan; and
- unexpected results or deviations.

Do not include secret values in the change record.

If implementation cannot follow the approved plan, stop at a safe point. Do not
improvise a broader repair. Explain the difference and request a revised
approval.

#### Client-visible output

Provide a completed-change summary. Keep it separate from verification; a
completed implementation is not yet a verified repair.

### 9. Run regression and runtime verification

#### Goal

Determine whether the approved repair achieved the agreed result without
breaking relevant existing behavior.

#### Verification order

When safe and applicable:

1. run focused checks for the original symptom;
2. run relevant automated tests or builds;
3. check service, container, or deployment health;
4. check the affected route, request, or user flow;
5. check nearby behavior that the change could affect;
6. confirm data remains available and unchanged when preservation is required;
   and
7. observe for immediate errors after the change.

For every check, record:

- the check;
- the environment;
- the date and time;
- the expected result;
- the actual result; and
- one of these statuses:
  - **Passed:** The check ran and met its expected result.
  - **Failed:** The check ran and did not meet its expected result.
  - **Skipped:** The check was intentionally not run, with the reason and
    resulting limitation.
  - **Unavailable:** The check could not be run because a required environment,
    service, permission, tool, or evidence was unavailable.

A completed command is not automatically a passed check. Record the relevant
result or output needed to support the status.

Do not treat a skipped or unavailable check as passed. Do not claim production
health from a local or test result. Do not claim monitoring beyond the period
actually observed.

#### Client-visible output

Provide a verification table with every planned check and its status. Explain
failed, skipped, and unavailable checks and the limitations they create.

### 10. Decide whether to keep the repair or roll back

#### Goal

Make an explicit decision based on verification, risk, and the approved rollback
plan.

#### Keep the repair when

The repair may remain in place when:

- the required checks passed;
- no unacceptable regression was found;
- data-preservation requirements were met;
- observed behavior matches the agreed success criteria; and
- remaining limitations are acceptable to the authorized approver.

#### Consider rollback when

Stop and assess rollback when:

- the original symptom remains;
- a required check fails;
- a material regression appears;
- data integrity or service stability is uncertain;
- the implementation differs from the approved plan; or
- a risk exceeds the approved boundary.

Do not perform rollback automatically unless it was specifically authorized for
the stated trigger. If approval is required, preserve the safest available state,
explain the result, and request a rollback decision.

If rollback itself presents a greater data or service risk, pause and escalate
rather than proceeding blindly.

#### Client-visible output

Record one outcome:

- **Repair retained:** State which verification supports the decision.
- **Rollback approved and completed:** State the approval, actions, and rollback
  verification.
- **Awaiting rollback decision:** State the trigger, current safe state, and
  decision needed.
- **Escalation required:** State the unresolved risk and the type of specialist
  needed.

### 11. Deliver the work

#### Goal

Give the client an accurate, usable record of the engagement.

Use the delivery-report template and include:

- original symptom and expected behavior;
- evidence collected;
- diagnosis and limitations;
- approved repair;
- completed changes;
- verification results and statuses;
- data-preservation result;
- backup and rollback information;
- unresolved issues;
- client actions;
- access-revocation status; and
- the closure decision.

Delivery must distinguish client-provided evidence from directly performed
checks. It must not claim unperformed work, unsupported outcomes, or continuing
monitoring.

Do not include credentials, private paths, sensitive personal information, or
unredacted data.

### 12. Close or hand off the engagement

#### Closure requirements

Before marking the work closed, confirm:

- the approved scope was completed or its limitations were accepted;
- the final verification status is recorded;
- failed, skipped, and unavailable checks are visible;
- the repair or rollback decision is recorded;
- data-preservation status is recorded;
- unresolved risks and follow-up actions have owners;
- temporary access has been revoked or has a documented revocation owner and
  deadline;
- sensitive working copies have been returned or disposed of as agreed; and
- the client has received the delivery report.

Record one closure status:

- **Completed and verified:** Required checks passed and the success criteria
  were met.
- **Completed with limitations:** The approved change was made, but skipped,
  unavailable, or limited checks prevent full verification.
- **Not resolved:** The repair did not meet the success criteria or was rolled
  back.
- **Paused for client action:** A decision, access change, backup, environment,
  or evidence is still required.
- **Escalated:** The issue crossed a safety or specialist boundary.

Closure does not guarantee that an application will remain error-free or that
unobserved systems are healthy.

## Change-scope control

The approved repair defines the work boundary.

When another defect, feature request, cleanup opportunity, dependency upgrade,
security concern, data issue, or infrastructure problem is discovered:

1. record it without making an unsupported diagnosis;
2. decide whether it prevents safe completion of the approved repair;
3. stop if it creates an immediate safety, data, or authorization concern;
4. describe it separately from the current repair;
5. provide a new scope and verification plan if further work is appropriate; and
6. obtain a new specific approval before performing that work.

Do not silently expand the current change because the additional work appears
related, quick, or beneficial.

## Escalation boundaries

Pause, decline, or refer the work when:

- ownership or authority is unclear or disputed;
- evidence is too limited for a safe diagnosis;
- required access would be excessive or unsafe;
- secrets or sensitive data cannot be protected;
- safe reproduction cannot be defined;
- an important backup or rollback path is unavailable;
- a proposed action could irreversibly damage important data;
- restoration has not been sufficiently confirmed for the risk involved;
- security incident response or specialized security assessment is required;
- payment, regulated-data, legal, compliance, forensic, or critical-
  infrastructure expertise is required;
- failure could cause physical harm;
- a request requires bypassing authentication, disabling controls, concealing
  activity, or using another person's credentials; or
- meaningful verification cannot be performed.

Explain the boundary in plain language. Identify the type of qualified
specialist or client decision needed without collecting unnecessary sensitive
information.

## Final quality check

Before sending the delivery report, confirm:

- observations, inferences, proposals, completed changes, and verified results
  are clearly separated;
- every implemented repair has a recorded specific approval;
- all changes remained within the approved scope;
- evidence is relevant, dated, and redacted;
- no secret or sensitive value is included;
- backup and rollback limitations are accurate;
- every verification check is marked passed, failed, skipped, or unavailable;
- no skipped or unavailable check is presented as passed;
- data-preservation status is stated;
- unresolved risks and client actions are visible;
- access revocation is addressed; and
- the closure status matches the recorded evidence.
