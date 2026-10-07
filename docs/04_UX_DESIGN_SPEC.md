# StudyOS — UX / UI Design Specification

**Version:** 1.0  
**Status:** Phase 0 — Design Source of Truth  
**Owner:** Surya — UI/UX

---

## 1. Design Objective

StudyOS must feel like a modern productivity product built specifically for students.

The experience should communicate:

> **“I don't need to figure out what to do. StudyOS already understands my academic situation.”**

The UI must reduce cognitive load rather than add another dashboard full of information.

---

## 2. Design Direction

Reference qualities:

- Linear-like clarity
- Notion-like organization
- modern SaaS hierarchy
- education-product friendliness

Do not copy any product directly.

Avoid:
- excessive gradients
- excessive glassmorphism
- generic AI robot graphics
- excessive animations
- dashboard clutter
- meaningless charts
- too many cards
- decorative UI that competes with the primary action

---

## 3. Core Visual Hierarchy

Every dashboard visit should answer in this order:

```text
1. What should I do now?
2. Why?
3. How long will it take?
4. What is urgent?
5. What am I weak at?
6. What progress have I made?
```

The primary visual emphasis must therefore be:

### “What Should I Do Next?”

Not:
- total number of notes
- number of flashcards
- number of AI generations

---

## 4. Primary Navigation

Recommended:

```text
Dashboard
Subjects
Notes
Assignments
Calendar
Flashcards
Exam Prep
AI Assistant
Settings
```

On mobile, use an intentional compact navigation pattern.

Do not simply compress the desktop sidebar.

---

## 5. Dashboard

### Required sections

#### Header
- greeting
- date/context
- profile menu

#### Primary card

```text
WHAT SHOULD I DO NEXT?

Revise C Programming — Loops

Why:
Your recent quiz score was 55% and this topic
is currently high priority.

30 min
[Start]
```

#### Upcoming deadlines

Show:
- assignment
- subject
- due date
- urgency

#### Weak topics

Show:
- topic
- subject
- performance
- action

#### Exam preparation

Show:
- exam
- date
- preparation state
- top priority topics

#### Recent progress

Show:
- recent study
- quiz score
- improvement

#### AI insight

One concise insight.

Avoid making the dashboard a wall of analytics.

---

## 6. Subject Workspace

Each subject should have:

```text
Subject Header
  ↓
Overview | Notes | Assignments | Flashcards | Quiz | Exam Prep
```

Overview should answer:
- What is this subject?
- What needs attention?
- How prepared am I?
- What should I do next?

---

## 7. Notes Experience

Hierarchy:

```text
Subject
  ↓
Unit
  ↓
Topic
  ↓
Note
```

Note UI should support:

- title
- subject
- unit
- topic
- tags
- content
- attachments
- AI actions

AI actions:

```text
Summarize
Explain
Generate Flashcards
Generate Quiz
Find Important Topics
Create Revision Notes
```

AI actions should be contextual and not overwhelm the editor.

---

## 8. Assignment UX

Assignment card should communicate:

```text
Assignment title
Subject
Due date
Priority
Status
```

Priority should be visually understandable.

Use urgency labels such as:

- Due today
- Due tomorrow
- Due this week
- Overdue

Avoid alarm-style design for everything.

---

## 9. 80/20 Study Prioritizer UX

Do not call this:

> “Exam Prediction”

Use:

> **80/20 Study Prioritizer**

Each topic should explain why it has its priority.

Example:

```text
HIGH PRIORITY

C Programming — Loops

Why this matters:
• Recent quiz performance: 55%
• Exam approaching
• Not revised recently
• Covered extensively in your uploaded material
```

The user must understand that this is a **study prioritization recommendation**, not a guarantee about exam questions.

---

## 10. Adaptive Learning UX

Show change over time.

Example:

```text
Loops

Before quiz:
MEDIUM

Quiz:
55%

After quiz:
HIGH

After revision:
90%

Current:
MEDIUM
```

This demonstrates the product's intelligence during a hackathon.

---

## 11. Quiz UX

Keep the quiz distraction-free.

Show:

```text
Question 3 / 10

[Question]

A
B
C
D

[Next]
```

After submission:

```text
Score: 55%

You need more practice in:
• Loops
• Nested conditions
```

Then provide:

```text
[Review weak topics]
```

---

## 12. Study Planner UX

Input:

> I have 2 hours today.

Output:

```text
YOUR 2-HOUR PLAN

30m  C Programming — Loops
30m  Chemistry — Atomic Structure
20m  Flashcard Review
25m  Environment — Ecosystems
15m  Weak-topic Quiz
```

Allow:
- edit
- remove
- reorder
- mark complete
- reschedule

---

## 13. AI Assistant UX

The assistant should feel like an academic copilot, not a generic chatbot.

Suggested quick prompts:

```text
What should I study today?
What should I revise first?
Quiz me on my weak topics.
Explain this from my notes.
I have one hour.
What is due this week?
```

Responses should prioritize:
1. student's context
2. student's material
3. current academic state
4. general explanation only when needed

---

## 14. Landing Page

Hero:

> **Study smarter. Know what to do next.**

Supporting message:

> StudyOS turns your notes, syllabus, assignments, deadlines and learning performance into a personalized academic action plan.

Primary CTA:
> Get Started Free

Secondary CTA:
> See How It Works

Sections:

1. Problem
2. Solution
3. Personal Academic Intelligence
4. What Should I Do Next?
5. 80/20 Study Prioritizer
6. Adaptive Learning
7. Notes → Flashcards → Quiz
8. Assignments + Deadlines
9. How It Works
10. Hackathon demo scenario
11. FAQ
12. CTA

---

## 15. States

Every major screen needs:

### Empty
Helpful next action.

### Loading
Skeleton or contextual loading message.

### Error
Specific and recoverable.

### Success
Clear confirmation.

### First-time
Short onboarding guidance.

---

## 16. Accessibility

Must support:

- keyboard navigation
- semantic headings
- form labels
- focus indicators
- readable typography
- sufficient contrast
- accessible modal/dialog behavior
- accessible buttons/icons
- reduced motion

Do not communicate meaning through color alone.

---

## 17. Responsive Behavior

### Desktop
- sidebar
- multi-column dashboard
- rich workspace

### Tablet
- collapsible navigation
- fewer columns
- preserved hierarchy

### Mobile
- compact navigation
- stacked content
- sticky/high-visibility next action
- touch-friendly controls

---

## 18. Design System

Define tokens for:

- typography
- spacing
- radius
- borders
- shadows
- semantic colors
- status states

Create reusable components rather than styling each page independently.

Suggested reusable components:

```text
DashboardCard
SubjectCard
NoteCard
AssignmentCard
PriorityCard
DeadlineCard
StudyRecommendation
AIInsight
Flashcard
QuizQuestion
ProgressBar
EmptyState
LoadingState
ErrorState
ConfirmDialog
```

---

## 19. Animation

Use animation only when it improves comprehension.

Good:
- page transitions
- progress changes
- completion feedback
- priority updates

Avoid:
- constant floating elements
- excessive motion
- animation on every card
- distracting AI effects

---

## 20. Hackathon Demo UX

The interface should make the following transformation visually obvious:

```text
Before:
Student has scattered information.

After:
StudyOS understands the information.

Then:
StudyOS identifies a weak topic.

Finally:
StudyOS tells the student what to do next.
```

The demo should visibly connect:

```text
Quiz score ↓
      ↓
Weak topic detected
      ↓
Priority ↑
      ↓
Recommendation changes
```

This is more important than showing every feature.

