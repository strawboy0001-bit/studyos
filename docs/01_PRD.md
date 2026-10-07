# StudyOS — Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Phase 0 — Product Source of Truth  
**Product:** StudyOS  
**Tagline:** Study smarter. Know what to do next.  
**Audience:** College students, initially optimized for individual students managing their own academic workload.

---

## 1. Product Vision

StudyOS is a **Personal Academic Operating System**.

It does not exist primarily to store notes, generate flashcards, or provide an AI chatbot. Its core job is to answer:

> **“Given everything happening in my academic life, what should I do next?”**

StudyOS combines the student's own academic material, syllabus structure, assignments, deadlines, exams, study availability, confidence, and learning performance to organize and prioritize academic work.

### Core loop

```text
Student Input
      ↓
Understand
      ↓
Organize
      ↓
Prioritize
      ↓
Recommend
      ↓
Student Acts
      ↓
Performance Changes
      ↓
Adapt
      ↓
Recommend Again
```

---

## 2. Problem

College students commonly have information scattered across:

- PDFs
- PPTs
- handwritten/digital notes
- WhatsApp messages
- college portals
- assignment instructions
- calendars
- notebooks
- quiz results
- personal reminders

The problem is therefore not simply **lack of information**.

The larger problem is **decision overload**:

- What should I study first?
- Which topic is weak?
- Which assignment is urgent?
- What should I revise today?
- What can I realistically finish in one hour?
- What changed after my latest quiz?

StudyOS converts scattered academic information into prioritized action.

---

## 3. Target User

### Primary user

An individual college student who:

- has multiple subjects
- receives notes/materials from different sources
- has assignments and deadlines
- has exams/assessments
- needs help prioritizing study
- wants personalized academic organization
- may have limited time

### Initial hackathon persona

**Demo student:**
- Course: BCA
- Semester: 1
- Subjects:
  - C Programming
  - Chemistry
  - Environment
  - English
  - Mathematics
- Has uploaded notes
- Has assignments
- Has upcoming exams
- Has quiz results
- Has weak topics

The demo persona must be clearly marked as demo/sample data.

---

## 4. Product Positioning

### One-line pitch

> StudyOS turns a student's notes, syllabus, deadlines and learning performance into a personalized academic action plan.

### Differentiator

**Personal Academic Intelligence**

StudyOS connects four dimensions:

1. **Academic knowledge** — notes, PDFs, PPTs, syllabus, topics
2. **Academic obligations** — assignments, deadlines, exams
3. **Learning state** — quiz scores, confidence, revision status
4. **Available capacity** — how much time the student has

The output is not just information.

The output is **priority + explanation + next action**.

---

## 5. Product Principles

1. **Action over information**
2. **Student-owned context first**
3. **Explain recommendations**
4. **Adapt from performance**
5. **Never pretend to know what the system cannot know**
6. **No false exam predictions**
7. **Minimal cognitive load**
8. **Fast and lightweight**
9. **Privacy by default**
10. **Real functionality over decorative UI**

---

## 6. Core Feature Set

### P0 — Must work for hackathon MVP

#### Authentication
- Sign up
- Login
- Logout
- Password recovery
- Optional Google authentication if configured

#### Onboarding
Collect:
- name
- college/university
- course
- year
- semester
- subjects
- optional exam dates
- optional typical available study time

#### Dashboard
Must show:
- greeting
- today's academic overview
- **What Should I Do Next?**
- upcoming deadlines
- upcoming exams
- high-priority topics
- weak topics
- study progress
- latest AI insight

#### Subjects
Each subject has:
- overview
- topics
- notes
- assignments
- flashcards
- quizzes
- exam preparation

#### Notes
Users can:
- create
- edit
- delete
- organize
- search
- upload supported files

Supported MVP file types:
- PDF
- PPT/PPTX
- DOC/DOCX
- TXT

Image/OCR support may be added later and must not block the MVP.

#### AI Note Analysis
From selected user material, produce structured information:
- summary
- key concepts
- definitions
- difficult concepts
- revision points
- topic candidates
- study priorities
- potential question areas

AI must distinguish:
- **based on user's material**
- **general explanation**

#### 80/20 Study Prioritizer
Identify topics that appear most valuable to study based on available evidence.

Inputs may include:
- syllabus coverage
- note coverage
- topic importance
- exam proximity
- quiz performance
- confidence
- revision status
- study history

Never claim:
- exact exam marks
- guaranteed questions
- guaranteed exam appearance

Use wording such as:
> High study priority based on your available academic material and learning performance.

#### Assignments
Fields:
- title
- subject
- description
- deadline
- priority
- status
- attachment

Statuses:
- Not Started
- In Progress
- Submitted
- Completed

Views:
- Due Today
- Due Soon
- Overdue
- Completed

#### AI Assignment Extraction
User may paste a message/notice.

AI extracts:
- assignment
- subject
- deadline
- priority
- required action

Important:
**AI extraction must require user confirmation before creating/updating an academic record.**

#### Flashcards
Generate from selected notes.

Types:
- Question/Answer
- Definition
- Concept
- Formula
- Example
- True/False

Review actions:
- Again
- Hard
- Good
- Easy

#### Quiz
Support:
- 5 questions
- 10 questions
- 20 questions

Question types:
- MCQ
- True/False
- Short answer where practical

Results:
- score
- correct/incorrect
- explanations
- weak topics

Quiz results must feed the adaptive priority system.

#### Adaptive Learning
Example:

```text
Loops = Medium priority
        ↓
Quiz score = 55%
        ↓
Loops = High priority
        ↓
Student revises
        ↓
Quiz score = 90%
        ↓
Loops priority decreases
```

The exact implementation can use a transparent scoring model defined in the architecture/specification.

#### What Should I Do Next?
This is the signature feature.

Return exactly one primary recommendation when possible:

- action
- subject
- topic
- reason
- estimated duration
- priority

Example:

> **Revise C Programming — Loops**
>
> Your recent quiz score was 55%, this topic is currently high priority, and your exam is approaching.
>
> Estimated time: 30 minutes.

The recommendation must be actionable, not generic.

#### Study Planner
User can say:

> “I have 2 hours today.”

The system uses:
- priorities
- deadlines
- exams
- weak topics
- study history
- available time

Example output:

```text
30 min — C Programming: Loops
30 min — Chemistry: Atomic Structure
20 min — Flashcard review
25 min — Environment: Ecosystems
15 min — Weak-topic quiz
```

Plan must be editable.

Missed tasks should be reschedulable.

---

## 7. Supporting Features

### Calendar
Show:
- assignments
- exams
- deadlines
- study sessions

### Global Search
Search:
- subjects
- notes
- topics
- assignments
- flashcards

### AI Study Assistant

Examples:
- What should I study today?
- What should I revise first?
- Explain this topic from my notes.
- Quiz me.
- Create flashcards.
- What assignments are due?
- I have three days before my exam.
- Which topics am I weak at?
- I only have one hour.

The assistant should use the student's own academic context whenever relevant.

---

## 8. Future Features — Not MVP-Critical

Potential future integrations:
- WhatsApp through official/authorized APIs
- college portal integrations
- Google Classroom
- Gmail
- Google Calendar
- Telegram
- official LMS integrations

Do not scrape private accounts.

For the hackathon MVP, use:
- upload
- manual entry
- copy/paste
- confirmation-based extraction

---

## 9. Signature Hackathon Demo

The intended demo should follow this exact story:

```text
1. Upload notes
       ↓
2. AI analyzes material
       ↓
3. Topics are mapped/organized
       ↓
4. 80/20 priorities appear
       ↓
5. Generate flashcards
       ↓
6. Take quiz
       ↓
7. Student scores 55%
       ↓
8. Weak topic becomes high priority
       ↓
9. Student says:
   "I have 2 hours today."
       ↓
10. Personalized plan is generated
       ↓
11. Dashboard says:
    "Your next action"
```

This is the primary proof that StudyOS is an adaptive academic system rather than a collection of disconnected AI tools.

---

## 10. Success Criteria

A hackathon judge should understand within minutes:

- what problem StudyOS solves
- why existing notes/reminder/chat tools are insufficient
- what makes StudyOS different
- how AI is used
- how the system adapts
- what the student's next action is

### MVP success test

A new student should be able to:

1. create an account
2. complete onboarding
3. add subjects
4. add/upload academic material
5. create an assignment
6. see dashboard priorities
7. generate flashcards
8. take a quiz
9. see priority change
10. receive a next-action recommendation

---

## 11. Non-Goals

Do not turn StudyOS into:

- a college administration portal
- an attendance management platform
- a generic AI chatbot
- a social network
- a generic note-taking clone
- a generic task manager
- an LMS
- an exam-question prediction engine
- a scraping platform

---

## 12. Product Quality Bar

The product must feel like a credible startup MVP, not a college CRUD project.

Prioritize:

- reliable core flows
- coherent information architecture
- meaningful AI
- clear explanations
- responsive UI
- accessibility
- performance
- secure user isolation
- useful demo data
- graceful loading/error/empty states

