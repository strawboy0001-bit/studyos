# StudyOS — Engineering Rules, Quality Gates & AI Development Contract

**Version:** 1.0  
**Status:** Phase 0 — Mandatory Rules for Antigravity and Team

---

# 1. Purpose

This document is the implementation contract for StudyOS.

Antigravity and all four developers must treat the Phase 0 documents as the project's source of truth.

When a new implementation decision conflicts with these documents:

1. preserve the product goal
2. preserve security and data ownership
3. preserve the core recommendation loop
4. choose the simplest maintainable solution
5. update the relevant document if the decision is intentional

Do not silently change product behavior.

---

# 2. Core Product Invariant

StudyOS is not primarily a:

- notes app
- task manager
- flashcard generator
- chatbot

It is:

> **A personal academic operating system that understands a student's academic context and recommends what deserves attention next.**

Every major feature should support that purpose.

---

# 3. SOLID Is Mandatory

Apply SOLID principles intentionally across the codebase.

## Single Responsibility

One module should have one clear responsibility.

## Open/Closed

New AI providers, storage implementations, or recommendation strategies should be addable without rewriting stable business logic.

## Liskov Substitution

Implementations of the same abstraction must remain interchangeable.

## Interface Segregation

Prefer small interfaces that represent actual capabilities.

## Dependency Inversion

Domain/business logic should depend on abstractions rather than concrete infrastructure.

Do not create abstractions merely to say “SOLID was followed.”

The objective is maintainability, testability and replaceability.

---

# 4. Separation of Concerns

Maintain these boundaries:

```text
UI
 ↓
Application / Use Case
 ↓
Domain Logic
 ↓
Infrastructure
```

Examples:

```text
React Component
      ↓
GenerateQuizUseCase
      ↓
QuizService
      ↓
AIProvider / QuizRepository
      ↓
Gemini/OpenAI / Supabase
```

Do not:

```text
React Component
  ↓
prompt construction
  ↓
Supabase query
  ↓
priority calculation
  ↓
database update
```

inside one component.

---

# 5. AI Rules

## AI provider

Never hardcode a provider throughout the application.

Use an abstraction.

## Structured output

Prefer schema-validated output.

Example:

```text
AI response
    ↓
Schema validation
    ↓
Business validation
    ↓
Persistence
```

If validation fails:
- retry safely if appropriate
- otherwise return a clear error

Never blindly store arbitrary model output as trusted academic data.

---

# 6. Grounded Academic AI

When the user asks:

> “Explain this from my notes.”

The system must prioritize retrieved user material.

The system should be able to identify:

```text
source
document
section/page where practical
```

Do not fabricate source references.

If material is unavailable:

> “I couldn't find this in your uploaded material.”

Then offer a general explanation if appropriate.

---

# 7. Academic Data Integrity

The following are sensitive to correctness:

- assignment deadline
- exam date
- quiz score
- topic performance
- study completion
- priority state

AI must not silently overwrite these.

AI-extracted records require confirmation.

---

# 8. Recommendation Integrity

Recommendations must be explainable.

Bad:

> Study Chemistry.

Good:

> Revise Chemistry — Atomic Structure for 30 minutes because your recent quiz performance is low and your exam is approaching.

The recommendation should identify meaningful evidence.

---

# 9. No False Claims

Never claim:

- “This will definitely appear in your exam.”
- “These are guaranteed 80% of your marks.”
- “AI knows your university exam paper.”
- “This topic will certainly be asked.”

Use:

> “High study priority based on your available academic material and learning performance.”

---

# 10. Security Rules

Never:

- commit `.env.local`
- hardcode API keys
- expose service-role keys
- expose AI secrets
- trust client-provided `user_id`
- allow cross-user queries
- bypass RLS for convenience

Use authenticated identity from the server/session.

Supabase service-role/secret keys must remain server-side. citeturn0search1turn0search4

---

# 11. Database Rules

Every user-owned record must have a defensible ownership path.

Prefer explicit ownership where it simplifies authorization.

Use:
- foreign keys
- indexes
- constraints
- migrations
- RLS policies

Do not modify production schema manually without recording the change as a migration.

---

# 12. Validation

Validate at boundaries:

```text
User input
AI output
File upload
API request
Database mutation
```

Use a consistent schema-validation strategy.

Reject invalid data early.

---

# 13. Error Handling

Every async operation must have:

```text
loading
success
error
```

No fake success.

No silent catch blocks.

Log technical details safely server-side while showing useful user-facing messages.

---

# 14. Performance

Do not optimize prematurely, but avoid obvious waste.

Rules:

- Server Components by default where appropriate
- Client Components only when needed
- paginate large data
- lazy-load heavy features
- avoid repeated AI calls
- avoid unnecessary polling
- avoid huge client bundles
- avoid sending full notes to the browser unnecessarily

Next.js explicitly supports using Server Components for server-side data access and keeping secrets away from the client; use that boundary intentionally. citeturn0search2

---

# 15. Component Rules

Components should be:

- reusable where reuse is real
- small enough to understand
- typed
- accessible
- visually consistent

Avoid a 1,000-line component.

Avoid giant components that contain:
- data fetching
- AI logic
- business rules
- database mutations
- rendering

all together.

---

# 16. File Naming

Use predictable naming.

Examples:

```text
recommendation-service.ts
note-analysis-service.ts
quiz-generation-service.ts
assignment-repository.ts
priority-engine.ts
study-plan-service.ts
```

Avoid vague names:

```text
helper.ts
misc.ts
stuff.ts
final-final.ts
utils2.ts
```

---

# 17. Git Rules

Branches:

```text
main
develop
frontend
backend
ai
ui-ux
```

Commit examples:

```text
feat: add assignment creation flow
feat: add adaptive topic priority
fix: prevent cross-user note access
refactor: isolate AI provider interface
design: refine dashboard recommendation card
```

Do not commit:
- secrets
- temporary debug files
- generated junk
- huge unnecessary assets

---

# 18. Developer Ownership

## Surya — UI/UX

Primary:
- design system
- user journeys
- visual hierarchy
- accessibility
- responsive UX
- design QA

## Srishti — Backend

Primary:
- Supabase
- PostgreSQL
- Auth
- RLS
- migrations
- storage
- data layer

## Varnika — AI

Primary:
- AI provider abstraction
- AI services
- prompts
- structured outputs
- grounding
- recommendation engine
- adaptive learning

## Manya — Frontend

Primary:
- Next.js
- React
- pages
- components
- frontend integration
- interactions

---

# 19. Pull Request Quality Gate

Before merging:

### Functionality
- feature works
- edge cases considered

### Security
- user ownership checked
- RLS verified
- secrets protected

### UX
- loading state
- error state
- empty state
- responsive behavior

### Architecture
- correct module boundary
- no unnecessary coupling
- SOLID considered

### Quality
- no TypeScript errors
- no lint errors
- no obvious console errors
- no fake functionality

---

# 20. Definition of Done

A feature is DONE only when:

```text
Requirement
   ↓
UI
   ↓
Backend
   ↓
Validation
   ↓
Security
   ↓
Error handling
   ↓
Testing
   ↓
Responsive check
   ↓
Production build
```

---

# 21. Antigravity Development Contract

Antigravity must:

1. Read these documents before implementing major features.
2. Preserve the architecture boundaries.
3. Follow SOLID principles.
4. Prefer real functionality over mock buttons.
5. Never create fake AI responses in production flows.
6. Never expose secrets.
7. Never skip authorization.
8. Never silently alter academic records.
9. Test after meaningful implementation changes.
10. Fix build/runtime errors before moving forward.
11. Keep dependencies minimal.
12. Avoid unnecessary abstractions.
13. Keep the application deployable to Vercel.
14. Keep documentation synchronized with intentional architectural changes.

---

# 22. Build Priority

If time becomes limited, prioritize:

```text
1. Authentication
2. Onboarding
3. Subjects
4. Notes + file upload
5. AI note analysis
6. 80/20 prioritizer
7. Quiz
8. Adaptive priority
9. What Should I Do Next?
10. Assignment/deadline system
11. Study planner
12. Visual polish
13. Secondary features
```

Do not sacrifice the adaptive recommendation loop to build many low-value features.

---

# 23. Final Quality Test

Before the hackathon demo, ask:

> Can a judge understand in 60 seconds why StudyOS is different?

Then test:

```text
Upload
  ↓
Understand
  ↓
Prioritize
  ↓
Quiz
  ↓
Detect weakness
  ↓
Adapt
  ↓
Recommend
  ↓
Study
```

If this loop works reliably, StudyOS demonstrates its core value.

If this loop does not work, adding more features is not the priority.
