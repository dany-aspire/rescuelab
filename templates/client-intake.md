# Small Web-App Deployment Rescue Intake

Please answer what you can. Write `unknown` when you do not know an answer.
Do not guess.

## Before you share anything

Remove secrets and sensitive information from every message, file, log, and
screenshot.

Do **not** send passwords, API keys, tokens, cookies, private keys, unredacted
environment files, credential-bearing connection strings, production database
dumps, payment-card data, health information, regulated personal data, or
customer records.

Replace sensitive values with labels such as `[REDACTED_TOKEN]` or
`[REDACTED_HOST]`. If a secret has already been exposed, revoke or rotate it
through the service that issued it.

## 1. Request and authorization

- Your role in relation to the application:
- Do you own the application or have authority to request this work? Yes / No /
  Unknown
- Application or project name using a non-sensitive label:
- Affected environment: Development / Test / Staging / Production / Unknown
- Person or role authorized to approve changes:
- Best technical contact for questions:

## 2. What is happening?

- What happens now?
- When did it last work, if known?
- Is the problem constant or intermittent?
- Which page, endpoint, command, or deployment step fails?
- Exact redacted error message:
- Approximate failure time and timezone:

## 3. What should happen?

- Expected behavior:
- Known working local, test, or earlier version:
- Result that would count as a successful repair:

## 4. How can the problem be reproduced safely?

1. Starting page, command, or deployment action:
2. First action:
3. Next action:
4. Expected result:
5. Actual result:

- Can these steps alter or delete real data? Yes / No / Unknown
- Can they interrupt service or affect real users? Yes / No / Unknown
- Is a safe test or staging environment available? Yes / No / Unknown
- Is there a safe workaround?

Do not reproduce the issue in production if doing so could delete data, expose
information, interrupt service, create charges, or affect real users.

## 5. Deployment target

- Hosting or deployment platform:
- Deployment method: Containers / Docker Compose / Managed service / Other /
  Unknown
- Build command:
- Start command:
- Node.js version:
- Database type and version:
- Public route or redacted hostname involved:
- Reverse proxy, load balancer, or platform router:
- Other relevant runtime details:

## 6. Architecture

- Frontend framework and build tool:
- API framework:
- Database:
- Container services:
- Reverse proxy:
- Background jobs or queues:
- External services used by the failing path:
- Short text diagram or request flow:

## 7. Redacted evidence

Please provide only the smallest relevant excerpt.

- First meaningful build or deployment error:
- Relevant application log lines:
- HTTP status code and redacted response:
- Browser console or network error:
- Container or service status:
- Health-check result:
- Relevant configuration with secret values removed:
- Timestamp and timezone for each excerpt:

Prefer copied text. If using a screenshot, crop unrelated areas and remove
names, email addresses, account IDs, hostnames, credentials, and unrelated
dashboard information.

## 8. Recent changes

What changed shortly before the problem began?

- Application code:
- Dependencies or lockfiles:
- Environment variable names or values:
- Build or start commands:
- Container definitions:
- Ports, routes, domains, or proxy settings:
- Database configuration or migrations:
- Hosting-platform settings:
- Runtime or service versions:
- Other changes:

## 9. Previous repair attempts

For each attempt, state what changed, what happened, and whether it was reverted.

- Attempt 1:
- Result:
- Reverted? Yes / No / Unknown

- Attempt 2:
- Result:
- Reverted? Yes / No / Unknown

- Is the application now in a different state than when the problem started?
  Yes / No / Unknown
- If yes, how?

## 10. Urgency and impact

- Who is affected?
- Current state: Unavailable / Partly working / Deployment failing / Other
- Is there an active outage? Yes / No / Unknown
- Real deadline and reason, if any:
- Safe workaround:
- Could testing interrupt service, change data, or create charges? Yes / No /
  Unknown
- Other impact:

Urgency does not authorize unsafe access or unapproved changes.

## 11. Data importance

- Does the application store data that must be preserved? Yes / No / Unknown
- Is the database disposable development data or important shared data?
- Does it contain personal, regulated, payment, health, financial, or other
  sensitive data? Yes / No / Unknown
- Who owns the data?
- Who can approve a restore or migration?

Do not attach a production database dump. Use a schema description, synthetic
sample, or redacted error instead.

## 12. Minimum diagnostic access

- Can diagnosis begin from the information above? Yes / No / Unknown
- Can a sanitized reproduction be provided? Yes / No / Unknown
- Can read-only access be limited to the affected application and environment?
  Yes / No / Unknown
- Proposed access type:
- Permissions included:
- Expiration time:
- Person who can revoke access:

Use platform invitations and temporary, application-level, read-only roles when
available. Do not send personal passwords or grant organization-wide
administrator, root, billing, production database write, or secret-store access
by default.

If broader access appears necessary, the reason and scope must be explained and
approved separately before it is granted.

## 13. Backup and rollback

### Backup

- What data or configuration could a repair affect?
- Is there a recent backup? Yes / No / Unknown
- Backup date and time:
- What does it include?
- Who controls it?
- Has restoration been checked? Yes / No / Unknown
- Is it stored separately from the affected deployment? Yes / No / Unknown

### Rollback

- Previous known-good version or configuration:
- Proposed rollback method:
- Person authorized to approve rollback:
- Possible interruption or data risk:
- Check that would confirm rollback worked:

### Database and persistent volumes

- Is there a database or persistent container volume? Yes / No / Unknown
- Is it shared with production or another environment? Yes / No / Unknown
- Are schema migrations involved? Yes / No / Unknown
- Is a safe test copy available? Yes / No / Unknown
- Could any proposed command reset, replace, migrate, or delete data? Yes / No /
  Unknown
- Who can approve such an action?

Database or volume deletion, recreation, migration, restoration, and other
destructive actions are not routine troubleshooting steps. They require a
separate, explicit approval and a verified recovery plan.

## 14. Approval boundary

Completing this intake authorizes diagnosis only. It does not authorize a code
change, configuration change, deployment, restart, rollback, data operation,
service interruption, or deletion.

Before any repair, the approver must receive and approve:

- the evidence-supported diagnosis;
- the smallest proposed change;
- the affected files, settings, services, and data;
- the expected result;
- the verification steps;
- the risks and limitations; and
- the rollback plan.

- I understand this boundary: Yes / No
- Named approver:
- Additional approval requirements:

## 15. Scope and escalation check

Mark `Yes`, `No`, or `Unknown`.

- Is this a suspected security incident, intrusion, malware event, credential
  theft, or data breach?
- Does it involve payment processing, cardholder data, or financial-transaction
  integrity?
- Does it involve regulated personal, health, financial, education, or
  government data?
- Is it critical infrastructure, safety-critical, or capable of causing
  physical harm?
- Does it require destructive recovery or an unverified database restoration?
- Is ownership or authorization unclear or disputed?
- Has anyone requested bypassing authentication, disabling security controls,
  concealing activity, or using another person's credentials?
- Is unrestricted, organization-wide, root, billing, or secret-store access
  being requested?
- Is production action requested without a suitable backup, rollback plan, and
  authorized approver?
- Is safe testing or verification impossible to define?

A `Yes` or unresolved `Unknown` may require clarification, decline, or referral
to an appropriately qualified security, payment, compliance, recovery,
infrastructure, or legal specialist.

## Triage result

To be completed after review:

- Classification: Supported for diagnosis / Clarification required / Declined
  or escalated
- Confirmed scope:
- Minimum evidence or read-only access needed next:
- Unanswered questions:
- Safety or scope boundary:
- Specialist referral needed:
- Known limitations:

This result is a triage decision, not a diagnosis, repair approval, or guarantee
of outcome.
