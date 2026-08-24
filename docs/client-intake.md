# Client Intake and Triage Guide

## Purpose

This guide helps collect the minimum information needed to assess a deployment
problem in a small AI-generated React/Node web application.

The intake process is for diagnosis and planning only. It does not authorize a
repair, deployment, data change, service restart, rollback, or deletion. Any
action that can change the application or its data requires a separate,
specific approval.

## Safety rules

### Do not send secrets or sensitive data

Before sharing text, files, screenshots, logs, or configuration, remove or
replace all sensitive values.

Never paste or upload:

- passwords;
- API keys;
- access tokens;
- session cookies;
- private keys;
- full connection strings containing credentials;
- unredacted environment files;
- production database dumps;
- regulated personal data;
- customer records;
- payment-card data;
- health information;
- government identification numbers; or
- any secret copied from a hosting, source-control, or cloud dashboard.

Use obvious placeholders such as:

- `[REDACTED_API_KEY]`
- `[REDACTED_TOKEN]`
- `[REDACTED_HOST]`
- `[REDACTED_EMAIL]`

Keep variable names when they help explain configuration, but replace their
values. For example:

```text
DATABASE_URL=[REDACTED_CONNECTION_STRING]
API_TOKEN=[REDACTED_TOKEN]
```

If a secret is shared accidentally, stop sharing it, revoke or rotate it through
the service that issued it, and report the exposure to the appropriate owner.
Do not place the exposed value in another message.

### Share the minimum necessary

Start with descriptions, redacted logs, redacted configuration, and public or
non-sensitive repository content. Prefer:

1. information copied into the intake template;
2. redacted error messages and relevant log excerpts;
3. read-only access limited to the affected application;
4. temporary access that expires; and
5. broader or write access only after the need, scope, and approval are clear.

Do not grant account-wide administrator access when application-level access is
enough. Do not share personal login credentials. Use the platform's own
invitation, role, audit, and expiration features when available.

## Information to collect

Each question below has a diagnostic purpose. If an answer is not known, write
“unknown” rather than guessing.

### 1. Application and ownership

Ask for:

- a short description of the application;
- confirmation that the requester owns it or is authorized to request work;
- the affected application, environment, and deployment;
- whether the environment is development, test, staging, or production; and
- the technical contact who can approve changes.

**Why:** This confirms the scope, establishes a safe point of contact, and
prevents work on systems without clear authorization.

### 2. Observed symptom

Ask:

- What happens now?
- When did it last work, if known?
- Is the problem constant or intermittent?
- Which page, endpoint, command, or deployment step fails?
- What exact redacted error is visible?

**Why:** A concrete symptom provides a starting point that can be reproduced and
compared with the expected result.

### 3. Expected behavior

Ask:

- What should happen instead?
- Is there a known working local, test, or earlier deployment?
- What result would count as a successful repair?

**Why:** Diagnosis needs a clear difference between the current and intended
behavior, and verification needs an agreed success condition.

### 4. Reproduction steps

Ask for the shortest safe sequence that shows the problem, including:

- the starting page, command, or deployment action;
- each action taken;
- the expected result;
- the actual result; and
- whether the steps can be run without changing or deleting real data.

**Why:** Repeatable steps separate a confirmed failure from a one-time report and
support before-and-after verification.

Do not reproduce a problem in production if doing so could delete data, expose
information, interrupt service, create charges, or affect real users. Use a safe
test or staging environment instead.

### 5. Deployment target

Ask for:

- the hosting or deployment platform;
- whether containers, Docker Compose, a managed service, or another method is
  used;
- relevant runtime versions, such as Node.js and PostgreSQL versions;
- the public route or redacted hostname involved;
- whether a reverse proxy, load balancer, or platform router is present; and
- the command or workflow used to build and deploy.

**Why:** A deployment failure often depends on platform routing, runtime
versions, ports, build commands, or environment configuration.

### 6. Architecture

Ask for a short component list, such as:

- frontend framework and build tool;
- API framework;
- database type;
- background jobs or queues;
- reverse proxy;
- container services; and
- external services the failing path depends on.

A simple text diagram is enough.

**Why:** This identifies the request path and the boundaries between components
without requiring unrestricted access.

### 7. Logs and evidence

Request only relevant, redacted evidence, such as:

- the failing build or deployment step;
- a short log excerpt around the first meaningful error;
- HTTP status codes and redacted response bodies;
- browser console or network errors;
- container or service status;
- health-check output;
- relevant configuration with secrets removed; and
- timestamps with a timezone.

Prefer copied text to screenshots when possible. If a screenshot is necessary,
crop it to the relevant area and remove names, email addresses, account IDs,
hostnames, tokens, and unrelated dashboard details.

**Why:** Runtime and configuration evidence supports a diagnosis and helps avoid
guessing.

### 8. Recent changes

Ask what changed shortly before the problem appeared, including:

- application code;
- dependencies or lockfiles;
- environment variable names or values;
- build and start commands;
- container definitions;
- ports, routes, domains, or proxy settings;
- database configuration;
- platform settings; and
- runtime or service versions.

**Why:** A recent change can narrow the search area, although timing alone does
not prove the cause.

### 9. Previous repair attempts

Ask:

- What has already been tried?
- What commands or settings were changed?
- What happened after each attempt?
- Were any changes reverted?
- Is the application now in a different state than when the problem began?

**Why:** Previous attempts can change the symptom, introduce additional risk, or
provide useful negative evidence.

### 10. Urgency and impact

Ask:

- Who is affected?
- Is the application unavailable, partly working, or failing only during
  deployment?
- Is there a safe workaround?
- Is there a real deadline or active outage?
- Could further testing interrupt service, alter data, or create charges?

**Why:** Impact helps prioritize the response and determines whether ordinary
diagnosis is safe. Urgency never overrides the access, backup, or approval
rules.

### 11. Data importance

Ask:

- Does the application store data that must be preserved?
- Is the affected database disposable development data or important shared
  data?
- Does the application contain personal, regulated, financial, health, or other
  sensitive information?
- Who owns the data and can approve restoration or migration?

**Why:** Data sensitivity and recovery risk determine whether the request is
within scope or requires a qualified specialist.

Do not request a production database dump. A schema-only description, synthetic
sample, or redacted error is normally safer.

## Access checklist

Diagnosis should begin without account access whenever the supplied evidence is
enough.

If access is necessary, confirm all of the following:

- the requester is authorized to grant it;
- the specific diagnostic question cannot reasonably be answered from redacted
  evidence alone;
- access is limited to the affected application and environment;
- read-only permission is used first;
- the access method does not require sharing a password or secret in a message;
- the platform records activity where possible;
- the access has an owner and an expiration time;
- access can be revoked promptly; and
- write access, if later needed, will require a named purpose and separate
  approval.

Examples of safer initial access include:

- read-only access to one repository;
- read-only deployment logs for one application;
- read-only viewing of redacted platform configuration;
- a screen-sharing session controlled by the application owner; or
- a sanitized reproduction in a separate test environment.

Do not request by default:

- organization-wide administrator access;
- cloud-account owner access;
- root or unrestricted server access;
- access to unrelated repositories or applications;
- production database write access;
- billing permissions;
- secret-store contents;
- a person's main account password; or
- disabled security controls.

If the only offered access is broader than necessary, pause and ask for a
narrower role or a safer evidence-sharing method.

## Backup, rollback, and approval gate

Before proposing or performing any repair, record answers to these questions.

### Backup

- What data or configuration could the change affect?
- Is there a recent backup?
- When was it created?
- What does it include?
- Who controls it?
- Has restoration been tested or otherwise confirmed?
- Is the backup stored separately from the affected deployment?

A backup must not be described as usable merely because a file or snapshot
exists. If restoration has not been checked, record that limitation.

### Rollback

- What exact files, settings, image, release, or deployment would be restored?
- Is the previous known-good version available?
- How would rollback be triggered?
- Who can authorize it?
- What service interruption or data mismatch could rollback cause?
- What evidence would show that rollback succeeded?

### Database and volumes

- Does the deployment use a database or persistent container volume?
- Which commands or platform actions could replace, reset, migrate, or delete
  it?
- Is the volume shared with production or other environments?
- Are schema migrations involved?
- Is there a safe test copy or disposable environment?
- Who can approve a restore, migration, or destructive recovery action?

Do not delete or recreate a database, volume, or persistent service as a routine
troubleshooting step. Commands that remove volumes or reset data require
explicit authorization, a verified recovery plan, and an appropriate
specialist when the data is important.

### Approval

Before any change, provide the authorized approver with:

- the observed symptom;
- the evidence-supported diagnosis;
- the smallest proposed change;
- the files, settings, services, or data that could be affected;
- the expected result;
- the verification steps;
- the rollback plan;
- the known risks and limitations; and
- any expected interruption.

Approval must identify the specific change. General access, urgency, or a request
to “fix it” is not approval for destructive actions, data changes, production
deployment, or broader follow-up work.

## Triage classification

### A. Supported small-app deployment work

A request can remain in ordinary triage when all of the following are true:

- it concerns a small React/Node web application or a closely related deployment
  path;
- ownership and authority are clear;
- the problem is a build, startup, routing, environment, container, port, proxy,
  CORS, service-discovery, listener, or similar deployment issue;
- diagnosis can begin with redacted evidence or narrowly scoped read-only
  access;
- testing can be performed safely;
- data and rollback risks are understood; and
- the work does not require specialized security, payment, regulated-data, or
  critical-infrastructure expertise.

Typical supported examples include a frontend calling the wrong API route, a
missing required configuration name, a service using the wrong container host
or port, an incorrect build sequence, a reverse-proxy path mismatch, or a
server listening only on the wrong interface.

Classification as supported does not guarantee a repair. It means the request is
suitable for evidence-based diagnosis within this narrow scope.

### B. Clarification required

Pause and request more information when:

- the symptom or expected behavior is unclear;
- reproduction steps are missing;
- logs are incomplete, unrelated, or not safely redacted;
- the affected environment is unknown;
- ownership or the approver is not yet confirmed;
- architecture or deployment details are insufficient;
- previous repair attempts may have changed the system;
- data importance, backup status, or rollback options are unknown;
- the offered access is broader than necessary;
- the requested action is not clearly authorized; or
- the request may cross an escalation boundary.

Remain in clarification until the uncertainty is resolved. Do not fill gaps by
guessing or begin changing the system to discover its ownership, sensitivity, or
recovery options.

### C. Decline or escalate

Do not continue as an ordinary deployment-rescue request when it involves:

- a suspected or confirmed security incident, intrusion, malware, credential
  theft, or data breach;
- penetration testing, vulnerability assessment, or security-audit claims;
- payment processing, cardholder data, financial transactions, or billing-system
  integrity;
- regulated personal, health, financial, education, or government data;
- critical infrastructure, safety-critical systems, emergency services, or
  systems where failure could cause physical harm;
- destructive data recovery, unverified restoration, forensic recovery, or
  irreversible database or volume operations;
- unclear ownership or disputed authorization;
- a request to bypass authentication, disable security controls, conceal
  activity, or use another person's credentials;
- a demand for unrestricted, organization-wide, root, billing, or secret-store
  access without a justified and approved need;
- production action without a suitable backup, rollback plan, and authorized
  approver;
- legal, compliance, incident-response, or specialist operational work beyond
  the narrow deployment scope; or
- any situation where safe testing and verification cannot be defined.

Explain the boundary in plain language and refer the requester to an
appropriately qualified security, payment, compliance, database-recovery,
infrastructure, or legal specialist. Do not collect extra sensitive evidence
merely to confirm that a request is outside scope.

## Triage outcome

After reviewing the intake, record one outcome:

- **Supported for diagnosis:** State the confirmed scope, the minimum evidence or
  read-only access needed next, and any remaining limitations.
- **Clarification required:** List the unanswered questions without requesting
  secrets or excessive access.
- **Declined or escalated:** State the safety or scope boundary and the type of
  qualified specialist required.

A triage outcome is not a diagnosis or approval to repair. Diagnosis must be
supported by evidence, and any repair must pass the backup, rollback, risk, and
approval gate above.
