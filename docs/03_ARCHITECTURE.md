# StudyOS — System Architecture & Technical Design

**Version:** 1.0  
**Status:** Phase 0 — Architecture Source of Truth

---

## 1. Architecture Goal

StudyOS should use a modular architecture that allows four developers to work independently while keeping the system coherent.

The architecture must support:

- secure individual-user data
- AI provider replacement
- explainable recommendation logic
- reliable file processing
- scalable feature addition
- testability
- Vercel deployment

---

## 2. High-Level Architecture

```text
                    ┌──────────────────────┐
                    │      Student         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    │ App Router + React    │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
          ┌───────────┐ ┌────────────┐ ┌──────────────┐
          │ App/Data  │ │ AI Service │ │ File Service │
          │ Services  │ │ Abstraction│ │ / Processing │
          └─────┬─────┘ └──────┬─────┘ └──────┬───────┘
                │              │              │
                ▼              ▼              ▼
          ┌───────────┐ ┌────────────┐ ┌──────────────┐
          │ Supabase │ │ AI Provider│ │   Storage    │
          │ PostgreSQL│ │ Gemini/etc. │ │ Supabase     │
          └───────────┘ └────────────┘ └──────────────┘
```

---

## 3. Recommended Project Structure

```text
app/
  (marketing)/
  (auth)/
  (dashboard)/
    dashboard/
    subjects/
    notes/
    assignments/
    exams/
    flashcards/
    quizzes/
    planner/
    assistant/
    calendar/
    settings/
  api/

components/
  ui/
  dashboard/
  subjects/
  notes/
  assignments/
  flashcards/
  quizzes/
  planner/
  assistant/
  shared/

lib/
  ai/
    providers/
    note-analysis/
    flashcards/
    quiz/
    assignment-extraction/
    prioritization/
    study-plan/
    assistant/
    recommendation/
  recommendation/
  data/
  validation/
  auth/
  storage/
  utilities/

types/

supabase/
  migrations/
  seed/
  tests/

public/
```

The exact organization may evolve, but boundaries must remain clear.

---

## 4. Domain Model

Core relationship:

```text
User
 │
 ├── Profile
 │
 ├── Subjects
 │    └── Topics
 │          ├── Notes
 │          ├── Flashcards
 │          ├── Quiz Questions
 │          ├── Study Sessions
 │          └── Performance
 │
 ├── Assignments
 │
 ├── Exams
 │
 ├── Study Plans
 │
 ├── AI Insights
 │
 └── Notifications
```

---

## 5. Database Tables

Recommended core tables:

```text
profiles
subjects
topics
notes
note_files
note_chunks / extracted_content
assignments
exams
flashcard_decks
flashcards
flashcard_reviews
quizzes
quiz_questions
quiz_attempts
quiz_answers
study_sessions
study_plans
study_plan_items
topic_performance
ai_insights
notifications
```

Use foreign keys and indexes intentionally.

Every user-owned entity should have a clear ownership path back to the authenticated user.

---

## 6. Security Model

### Ownership invariant

A user must never be able to access another user's:

- notes
- files
- assignments
- exams
- quizzes
- flashcards
- study history
- AI context

Use Supabase Auth + PostgreSQL RLS.

For user-owned tables, policies should conceptually enforce:

```sql
auth.uid() = user_id
```

For child tables without a direct `user_id`, ownership may be enforced through a trusted relationship to the parent.

RLS must be tested for:
- SELECT
- INSERT
- UPDATE
- DELETE

Do not assume that adding a policy alone is sufficient; grants and policies both matter. citeturn0search1

---

## 7. AI Architecture

### Principle

The UI should never directly depend on a specific AI vendor.

Use:

```text
AI use case
    ↓
AI service
    ↓
AI provider interface
    ↓
Gemini / OpenAI / other provider
```

Example conceptual interface:

```ts
interface AIProvider {
  generateStructured<T>(
    request: AIRequest,
    schema: Schema<T>
  ): Promise<T>
}
```

AI use cases should be separate services:

```text
NoteAnalysisService
FlashcardService
QuizGenerationService
AssignmentExtractionService
PriorityService
StudyPlanService
RecommendationService
StudyAssistantService
```

Each service has one clear responsibility.

---

## 8. AI Context Pipeline

For grounded academic AI:

```text
Upload
  ↓
File validation
  ↓
Private storage
  ↓
Text extraction
  ↓
Chunking / normalization
  ↓
Metadata + topic mapping
  ↓
Retrieval / relevant context selection
  ↓
AI task
  ↓
Structured output validation
  ↓
User review where necessary
  ↓
Persistence
```

Do not send the entire academic library to every AI request.

Use the smallest relevant context.

---

## 9. Recommendation Architecture

The recommendation engine is a core domain service, not a UI feature.

Inputs:

```text
Topic
 ├── exam proximity
 ├── deadline urgency
 ├── importance
 ├── material coverage
 ├── quiz performance
 ├── confidence
 ├── revision recency
 └── current progress
```

Context:

```text
Student
 ├── available minutes
 ├── upcoming exams
 ├── upcoming deadlines
 └── recent activity
```

Output:

```text
NextAction
 ├── action
 ├── subject
 ├── topic
 ├── reason
 ├── estimated_minutes
 ├── priority
 └── evidence
```

The engine must be deterministic where practical so that the same inputs produce explainable results.

AI may help interpret context, but core priority calculations should not depend entirely on an opaque model.

---

## 10. Example Priority Model

A transparent initial scoring model may use normalized values:

```text
priority_score =
    0.25 * exam_urgency
  + 0.20 * learning_gap
  + 0.15 * topic_importance
  + 0.15 * deadline_urgency
  + 0.10 * revision_gap
  + 0.10 * material_coverage
  + 0.05 * confidence_gap
```

This is a starting implementation, not a claim of scientific optimality.

Weights must be centralized so they can be changed without rewriting UI or database logic.

Clamp score to:

```text
0–100
```

Suggested bands:

```text
80–100 = High
50–79  = Medium
0–49   = Low
```

The UI should explain contributing factors rather than exposing misleading mathematical precision.

---

## 11. Adaptive Learning Event

Example:

```text
Quiz Attempt
    ↓
Map incorrect answers → topics
    ↓
Update topic performance
    ↓
Recalculate affected priorities
    ↓
Invalidate recommendation
    ↓
Generate next best action
```

Do not recalculate the entire student's academic graph for a single quiz answer unless necessary.

---

## 12. Study Plan Algorithm

Input:

```text
available_minutes
```

Collect candidate tasks from:
- high-priority topics
- urgent assignments
- upcoming exams
- revision needs
- flashcard review
- weak-topic quizzes

Filter impossible tasks.

Rank candidates.

Allocate time.

Return:

```text
StudyPlan
 ├── total_minutes
 ├── items[]
 │    ├── action
 │    ├── topic
 │    ├── minutes
 │    └── reason
 └── overflow / optional items
```

The plan must remain editable.

---

## 13. File Processing

MVP pipeline:

```text
User Upload
    ↓
Validate MIME type + size
    ↓
Private Storage
    ↓
Extract text
    ↓
Normalize
    ↓
Store extracted content
    ↓
Map to subject/topic
    ↓
AI analysis
```

Do not make OCR a hard dependency for the first demo.

If a scanned PDF cannot be parsed:
- report that clearly
- allow the user to add text manually
- do not fabricate extracted content

---

## 14. Next.js Boundary Rules

Prefer Server Components for:
- data fetching
- read-only dashboard sections
- secure server-side operations
- pages that do not need browser state

Use Client Components for:
- forms requiring client state
- interactive editors
- drag/drop
- quiz interaction
- calendar interaction
- browser APIs

Keep `"use client"` boundaries as small as practical. Next.js documents that Client Components pull their imported dependency tree into the client bundle, while Server Components can keep server-only logic and secrets on the server. citeturn0search2

---

## 15. SOLID Principles — Mandatory Engineering Rule

StudyOS must follow SOLID principles where they meaningfully improve maintainability.

### S — Single Responsibility Principle

Each module/service should have one reason to change.

Bad:

```text
StudyOSService
  → auth
  → database
  → AI
  → recommendations
  → notifications
```

Good:

```text
AuthService
NoteService
AssignmentService
QuizService
RecommendationService
NotificationService
```

### O — Open/Closed Principle

Core systems should allow extension without rewriting stable logic.

Example:
Adding a new AI provider should not require rewriting every AI feature.

```text
AIProvider
 ├── GeminiProvider
 ├── OpenAIProvider
 └── FutureProvider
```

### L — Liskov Substitution Principle

Any implementation of a defined abstraction must remain safely substitutable.

Example:

```text
AIProvider
  → GeminiProvider
  → OpenAIProvider
```

Both must satisfy the same contract.

### I — Interface Segregation Principle

Do not create one giant interface.

Prefer:

```text
NoteRepository
AssignmentRepository
QuizRepository
AIProvider
FileStorage
```

instead of one:

```text
EverythingRepository
```

### D — Dependency Inversion Principle

High-level domain logic must depend on abstractions rather than concrete infrastructure.

Example:

```text
RecommendationService
        ↓
RecommendationRepository / data abstraction
        ↓
Supabase implementation
```

The business logic should not be tightly coupled to Supabase client calls everywhere.

SOLID is a design philosophy for managing complexity; it should be applied intentionally rather than by creating unnecessary abstractions for trivial code. citeturn0search3turn0search11

---

## 16. Four-Developer Architecture Ownership

### Surya — UI/UX
Owns:
- design system
- user flows
- information hierarchy
- visual consistency
- responsive UX
- accessibility
- design QA

Should not own:
- database logic
- AI business logic

### Srishti — Backend
Owns:
- Supabase
- PostgreSQL
- migrations
- RLS
- authentication integration
- storage
- data services
- backend validation

### Varnika — AI
Owns:
- AI provider abstraction
- prompts
- structured outputs
- note analysis
- flashcards
- quizzes
- assignment extraction
- prioritization
- adaptive learning
- study planner
- AI assistant

### Manya — Frontend
Owns:
- Next.js pages
- React components
- client interactions
- dashboard
- subject pages
- feature integration
- responsive implementation

### Shared ownership

All four:
- code review
- testing
- documentation
- bug fixing
- demo preparation

---

## 17. Git Workflow

Recommended:

```text
main
develop
frontend
backend
ai
ui-ux
```

Rules:
- do not commit secrets
- use descriptive commits
- open PRs into `develop`
- keep branches focused
- avoid editing another developer's domain unnecessarily
- resolve conflicts intentionally
- `main` should remain demo/release-ready

---

## 18. Architecture Anti-Patterns

Do not:

- put all logic in page components
- call AI directly from every UI component
- duplicate Supabase queries throughout the app
- hardcode priority calculations in UI
- hardcode AI provider names everywhere
- expose secrets
- create giant utility files
- create a giant “God service”
- create abstractions with no actual value
- mix database, AI, UI and business logic in one file
