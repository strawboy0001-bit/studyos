# StudyOS — Software Requirements Document (SRD)

**Version:** 1.0  
**Status:** Phase 0 — Engineering Source of Truth

---

## 1. System Objective

Build a production-quality, hackathon-ready web application that provides each authenticated student with a private academic workspace and an adaptive recommendation system.

The system shall transform student-provided academic context into:

- organized academic records
- study priorities
- learning feedback
- personalized study plans
- one recommended next action

---

## 2. Technology Baseline

### Frontend / Application
- Next.js
- App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui where appropriate
- Lucide icons

The Next.js App Router uses React Server Components by default; use Client Components only where interactivity/browser APIs require them. citeturn0search0turn0search2

### Backend / Data
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security

Every exposed user-data table must have appropriate RLS policies. Supabase recommends enabling RLS on exposed tables and separately considering grants and policies. citeturn0search1turn0search4

### AI
Use a provider abstraction so the application can support:
- Gemini
- OpenAI
- another compatible provider later

The provider must be configurable through environment variables.

### Deployment
- Vercel

---

## 3. Functional Requirements

### FR-001 Authentication
The system shall:
- register users
- authenticate users
- maintain sessions
- support logout
- support password recovery
- protect authenticated routes

### FR-002 User Profile
The system shall store:
- name
- college
- course
- year
- semester
- timezone where useful
- preferred study availability where useful

### FR-003 Subjects
Users shall:
- create subjects
- edit subjects
- archive subjects
- view subject-specific data

Each subject belongs to exactly one user.

### FR-004 Topics
Topics shall belong to subjects.

A topic may be associated with:
- notes
- syllabus units
- quiz questions
- flashcards
- assessments
- study sessions

### FR-005 Notes
Users shall:
- create notes
- edit notes
- delete notes
- categorize notes
- attach files
- search notes

### FR-006 File Processing
Uploaded academic files shall:
1. be stored privately
2. be associated with the authenticated user
3. be processed asynchronously where practical
4. have extracted text/metadata stored separately
5. be available to AI analysis

If extraction fails, the user must receive a useful error rather than a fake success state.

### FR-007 AI Note Analysis
The system shall produce structured output rather than uncontrolled UI text.

Expected fields may include:
- summary
- key concepts
- definitions
- topics
- difficult concepts
- revision points
- priority candidates
- source references

### FR-008 Assignments
The system shall support:
- CRUD
- deadline
- priority
- status
- subject association
- attachments

### FR-009 Exams
The system shall support:
- exam name
- subject
- date/time
- optional syllabus scope
- preparation status

### FR-010 Flashcards
The system shall:
- generate cards from selected material
- store decks
- store cards
- record review outcomes

### FR-011 Quiz
The system shall:
- generate quizzes
- store questions
- record attempts
- calculate scores
- map poor performance to topics

### FR-012 Priority Engine
The system shall calculate topic/action priority using structured inputs.

Conceptual inputs:

```text
exam_proximity
deadline_urgency
topic_importance
material_coverage
quiz_performance
confidence
revision_recency
study_progress
available_time
```

The score must be explainable.

### FR-013 Adaptive Updates
Quiz/review events shall trigger recalculation of affected topic priorities.

The system should avoid recalculating unrelated records unnecessarily.

### FR-014 Recommendation
The system shall produce a primary next action.

Required output:

```text
action
subject
topic
reason
estimated_minutes
priority
source_context
```

### FR-015 Study Plan
The system shall accept a time budget and produce an editable plan.

Example:

```text
available_minutes = 120
```

The planner should allocate time based on priority and constraints.

### FR-016 AI Assistant
The assistant shall:
- understand academic context
- answer questions
- use user material where relevant
- distinguish grounded answers from general knowledge
- avoid fabricating references

### FR-017 Confirmation
AI-created or AI-extracted:
- assignments
- deadlines
- exams
- important academic records

must require explicit confirmation before persistence.

### FR-018 Search
Search must be scoped to the authenticated user's data.

### FR-019 Notifications
The system may support:
- upcoming deadline alerts
- exam reminders
- study recommendations

Avoid notification spam.

---

## 4. Non-Functional Requirements

### NFR-001 Security
- Never expose AI provider secret keys.
- Never expose Supabase service-role/secret keys to the browser.
- Use environment variables.
- Enforce RLS.
- Validate all user-controlled inputs.
- Validate AI outputs before persistence.
- Sanitize rendered rich text.
- Restrict private file access.

Supabase explicitly states that service-role/secret keys must remain server-side because they bypass RLS. citeturn0search1turn0search4

### NFR-002 Performance
- Avoid unnecessary client-side JavaScript.
- Prefer Server Components for non-interactive data rendering.
- Paginate large lists.
- Lazy-load heavy functionality.
- Avoid unnecessary polling.
- Do not repeatedly call AI for the same unchanged input.
- Cache safe, reusable results where appropriate.

### NFR-003 Reliability
No UI element may claim an action succeeded until the relevant backend operation succeeds.

### NFR-004 Accessibility
- semantic HTML
- keyboard navigation
- visible focus states
- labels
- sufficient contrast
- accessible dialogs/forms
- reduced-motion consideration

### NFR-005 Responsiveness
Support:
- desktop
- laptop
- tablet
- mobile

Mobile must have an intentional navigation model rather than merely shrinking desktop UI.

### NFR-006 Maintainability
Follow:
- TypeScript strictness
- modular architecture
- clear naming
- small focused modules
- reusable components
- centralized validation
- typed service boundaries
- tests for important business logic

---

## 5. Error Handling

Every major operation must support:

### Loading
Example:
> Analyzing your notes…

### Success
Example:
> Analysis complete.

### Empty
Example:
> No assignments yet. Add your first deadline.

### Error
Example:
> We couldn't analyze this file. Check the file and try again.

Never show:
- blank screens
- fake data after failure
- silent failures
- generic “Something went wrong” when a useful explanation is possible

---

## 6. AI Safety and Grounding

AI must not:

- invent content from a student's notes
- claim an exam prediction is certain
- invent assignment deadlines
- silently create academic records
- fabricate citations
- hide uncertainty

When answering from student material, preserve source context.

Preferred wording:

> Based on your uploaded notes…

If insufficient information exists:

> I couldn't find that in your uploaded material. I can explain it generally if you'd like.

---

## 7. Acceptance Criteria

A feature is not considered complete merely because a page exists.

It is complete only when:

- UI exists
- data model exists
- backend operation exists
- validation exists
- loading state exists
- error state exists
- success state exists
- authorization exists
- relevant tests/manual verification pass
- production build works

---

## 8. Definition of Done

Before declaring the MVP complete:

- no major console errors
- no broken navigation
- no fake buttons
- no hardcoded production secrets
- no user-data leakage
- all major CRUD flows tested
- AI failures handled
- upload failures handled
- responsive layouts checked
- Vercel production build succeeds
- README/setup instructions exist
