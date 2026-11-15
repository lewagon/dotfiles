# Writing the epic (parent issue)

Read this at step 1 (Draft the epic). It says what the epic body must hold, where each part comes from in OpenSpec, SpecKit or a plan session, and how to check the draft before presenting it.

## Contents

1. What the epic is for
2. Body template
3. Where each section comes from
4. Slicing: how to cut sub-issues
5. Sizing check
6. Quality checklist
7. What GitHub can and cannot do
8. Sources

## 1. What the epic is for

An epic is the parent issue for one deliverable outcome that takes several sprints of work: weeks or more, not hours or days. Three jobs, in this order:

1. **Say why and when it is done.** A reader who stops after the first screen knows the outcome and the exit test. This is the part Atlassian and Asana both stress: a goal you can measure, not a list of tasks.
2. **Stay thin on detail.** In spec-driven work the spec files (`proposal.md` and delta specs, or `spec.md`) are the source of truth for behaviour. The epic summarizes and links; it does not restate requirements, because a copy drifts the moment the spec changes.
3. **Carry what only GitHub can hold**: order (waves), ownership, project state, and the live sub-issue progress.

Scope is allowed to move (Atlassian: "scope is flexible, based on customer feedback"). When it does, change the source spec first, then the epic and its sub-issues. Never edit the epic alone.

## 2. Body template

Keep the first screen self-sufficient. Use this order and omit nothing that has a source; mark a missing one `Not specified in source` rather than inventing it.

```markdown
## Goal
<one or two sentences: the problem or opportunity and why now, in user or business terms, not tasks>

## Done when
<measurable exit criteria, 2 to 5 bullets. Each is checkable by a test, a command or an observation.>
- [ ] <e.g. a new user can finish signup in under 2 minutes (SC-001)>
- [ ] <e.g. all P1 acceptance scenarios pass in CI>

## Scope
**In:** <short bullets, capability-level>
**Out:** <carried over from the source, or "Not specified in source">

## Source of truth
- 📎 <path to the change folder or specs/<NNN-name>/ or plan file> (the files win over this issue)
- Source type: OpenSpec | SpecKit | Plan session. If plan session: "Acceptance criteria inferred from the plan, not from a spec."

## Roadmap
| Wave | Issue | Owner | Needs |
|---|---|---|---|
| 1 (parallel) | #n title | name or unassigned | none |
| 2 | #n title | unassigned | #n |

## Risks and open questions
<only real ones from design.md, plan.md, research.md, `[NEEDS CLARIFICATION]` markers or analyze findings; omit the section if none>

## Project automation
<enabled and disabled project workflows, so the reader knows what happens by itself>
```

Progress is not written into the body. GitHub shows sub-issue progress on the parent and in the project's "Sub-issue progress" field, and it stays correct while a hand-kept checklist drifts. The Roadmap table lists issues for ordering; it does not carry checkboxes.

## 3. Where each section comes from

| Epic section | OpenSpec (`openspec/changes/<name>/`) | SpecKit (`specs/<NNN-name>/`) | Plan session |
|---|---|---|---|
| Goal | `proposal.md` → **Why** | `spec.md` → opening of User Scenarios, the Input line, the P1 story's "Why this priority" | the plan's stated goal |
| Done when | Delta-spec scenarios (WHEN/THEN) at capability level, plus **What Changes** items marked **BREAKING** that need a check | **Success Criteria** (`SC-001`…, already measurable and technology-agnostic) and the P1 story's **Independent Test** | the plan's verification step; if none, say "no verification stated" |
| Scope In | **What Changes**, **Capabilities** (New/Modified) | Functional Requirements grouped by story, **Key Entities** | the plan's steps, grouped |
| Scope Out | not-in-scope text in `proposal.md`, if present | **Assumptions** and any explicit exclusions | anything the plan rules out |
| Source of truth | the change folder | the `specs/<NNN-name>/` folder | the saved plan file, else a short excerpt |
| Roadmap | `design.md` ordering and `tasks.md` | `plan.md` ordering, `tasks.md` phases and `[P]` markers | the plan's stated order |
| Risks | **Impact**, `design.md` risks | `[NEEDS CLARIFICATION]`, **Edge Cases**, `/speckit.analyze` findings, constitution conflicts | caveats in the plan |

Cite identifiers (`SC-001`, a requirement name, a story number) rather than copying paragraphs. A reviewer can then trace "Done when" to the spec in one hop.

## 4. Slicing: how to cut sub-issues

Slice by outcome, not by layer. A story that cuts across database, API and UI is one slice; "do the database for everything" is a layer and delays the first working test.

- **SpecKit:** one sub-issue per user story is the default cut. Stories are prioritized (P1, P2, P3) and each is defined as independently testable and deployable, so a P1 slice is already an MVP. Put shared setup and foundational tasks (the early `tasks.md` phases) in their own first-wave issue, since every story depends on them.
- **OpenSpec:** cut by delta-spec requirement (or a coherent group of requirements), not by `tasks.md` section. OpenSpec's `tasks.md` has no story layer and its headings are usually layers (Data, Rendering, UI, Cleanup), so copying them gives issues that deliver nothing a user can check on their own. Worked example: for a daily email digest, "a user with unread notifications gets one digest" owns its migration, rendering and scheduler tasks; "one-click unsubscribe" and "preferences UI" are their own issues; removing a legacy setting stays a separate cleanup issue because it is not a user-facing requirement. If a slice grows past about 6 tasks, split it by scenario, not by layer.
- **Enabler issues:** shared setup that several slices need (a migration, a token helper) may be its own issue. Title it as an enabler and say which slices it unblocks, so the roadmap shows why it comes first. Sources agree layer splits are the main anti-pattern but differ on strictness: a split that is vertical in layers yet delivers no user value is still horizontal, so judge by value, not only by layers.
- **Test-first inside each issue:** keep the test task ahead of the implementation task in the checklist, as `tasks.md` orders them. Acceptance criteria in the issue are the Given/When/Then or WHEN/THEN scenarios from the spec for that slice, so "done" for the issue is "its scenarios pass".
- **Stay flat.** One level of sub-issues under the epic. Nest only when a single slice itself exceeds a few issues. GitHub allows up to 100 sub-issues per parent and 8 levels, but a roadmap read at the epic level breaks down well before that.
- **Slice by persona or ordered step** only when the spec has no stories; both Atlassian and Asana offer these as ways to break an epic down, and neither calls them rules.

## 5. Sizing check

Before drafting, count: issues you would create, and rough calendar effort from the plan.

- **Fewer than about 3 issues, or effort of days:** the work may be a single issue, not an epic. Atlassian is explicit that not every story needs an epic. Ask before drafting the full epic: offer (a) a single issue with the tasks as a checklist or (b) the epic anyway, and wait for the answer. Do not refuse and do not decide for the user: the skill promised an epic at the handoff, and the user decides. The one-line result goes first in the draft as `**Sizing:**`, never in the review Notes.
- **Weeks to a few months, several issues:** the normal case.
- **More than about 15 issues, or several quarters of work:** the change is probably an initiative holding several epics. Propose splitting by user story groups or capability, with one epic per deliverable outcome. Asana's guide suggests 1 to 4 months as the span of an epic.
- **Over 100 sub-issues:** the hard GitHub limit; split.

## 6. Quality checklist

Run through this before presenting the draft, and fix or flag each miss:

1. **Outcome first.** The Goal states a problem or user result, not "implement X".
2. **Measurable.** Every "Done when" line can be checked by a test, command or observation. No "works well", "intuitive" or "fast" without a number.
3. **Traceable.** Every "Done when" and Scope item names its source (identifier or path). Items with no source are flagged, not invented.
4. **No copied spec.** The body summarizes; requirements text is linked.
5. **Sized right.** The sizing check was done and its result is stated in the draft (one line).
6. **Independent slices.** Each sub-issue can be tested on its own, and the waves show what can run in parallel.
7. **No hand-kept progress.** No checkbox list duplicating sub-issues.
8. **Judgment fields unset.** Priority, Effort, Start and Target dates stay empty (see Explicit boundaries). SpecKit's P1/P2/P3 is story priority from the spec and can be quoted in the issue, but it is not written to the project's Priority field unless the user says so.
9. **Nothing open is lost.** Unresolved flags from the draft's review Notes (guessed dependencies, inferred criteria, spec requirements with no task) are carried into "Risks and open questions" at creation, because Notes never reaches GitHub.
10. **First screen stands alone.** Goal, Done when and Source of truth are visible without scrolling.

## 7. What GitHub can and cannot do

Checked against GitHub's docs and `gh` 2.102 on 2026-11-15.

- **Can:** native parent/sub-issue links (`gh issue create --parent`, `gh issue edit --add-sub-issue`), blocked-by and blocking links (`--blocked-by`, `--blocking`, `--add-blocked-by`), up to 100 sub-issues per parent and 8 levels of nesting, sub-issue progress on the parent, and in a project the "Parent issue" and "Sub-issue progress" fields (hidden by default, enabled from the table view) for grouping, filtering with `parent-issue:"owner/repo#n"` and progress bars.
- **Also can (newer):** a native "Relates to" relationship, generally available since 2026-09-25, readable as `Issue.relatesTo` and writable with the GraphQL mutations `addRelatesTo` and `removeRelatesTo` (inputs `issueId` and `relatedIssueId`). `gh` 2.102 has no flag for it. Fall back to `Related: #n` in the body if the call fails. Dependencies (blocked by, blocking) are limited to 50 links per type per issue.
- **Cannot:** an epic entity separate from an issue, waves, a burndown chart, or a computed "Done when" check. The roadmap table and the wave grouping live in the epic body because nothing else holds them.
- **Issue types and issue fields** (Task, Bug, Feature by default, up to 25 types per organization; fields such as Priority, Effort, Start date, Target date) were organization features and became available for personal accounts on 2026-11-11, so a personal repo may still lack the "Epic" type. At creation, check whether an "Epic" issue type exists (`gh api` on the repo's issue types); if it does, use it in addition to the `Epic:` title prefix, and if not, rely on the prefix alone. Never create an issue type or field.
- A parent that is itself a sub-issue is allowed (an epic can sit under an initiative). Link the epic to an initiative only when the user names one.

## 8. Sources

- Asana (2026, February 8). *What is an Agile epic? Do you need one?* https://asana.com/resources/agile-epic. Accessed 2026-11-15.
- Atlassian (n.d.). *Agile epics: definition, examples, and templates*. https://www.atlassian.com/agile/project-management/epics. Accessed 2026-11-15.
- Atlassian (n.d.). *Epics, stories, and initiatives*. https://www.atlassian.com/agile/project-management/epics-stories-themes. Accessed 2026-11-15.
- Fission AI. OpenSpec `spec-driven` schema, proposal instructions. https://github.com/Fission-AI/OpenSpec. Accessed 2026-11-15.
- GitHub. Spec Kit `spec-template.md`. https://github.com/github/spec-kit. Accessed 2026-11-15.
- GitHub (2025, August 21). *Dependencies on issues*. GitHub Changelog. https://github.blog/changelog/2025-08-21-dependencies-on-issues/. Accessed 2026-11-15.
- GitHub (2026, September 25). *"Relates to" issue relationship is generally available*. GitHub Changelog. https://github.blog/changelog/2026-09-25-personal-saved-views-for-repository-issues-and-more/. Accessed 2026-11-15.
- GitHub (2026, November 11). *Issue types and fields are available for personal accounts*. GitHub Changelog. https://github.blog/changelog/2026-11-11-issue-types-and-fields-are-available-for-personal-accounts/. Listed in search results, not opened. Accessed 2026-11-15.
- GitHub Docs. *Adding sub-issues* and *About parent issue and sub-issue progress fields*. https://docs.github.com. Accessed 2026-11-15.
