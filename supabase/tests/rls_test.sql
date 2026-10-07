-- StudyOS Row Level Security (RLS) Verification Test Suite
-- Purpose: Verify strict isolation between Student A and Student B

-- Test Setup: Two distinct mock user sessions
-- User A: aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
-- User B: bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb

BEGIN;

-- 1. Create Mock Users in auth.users (Simulation block)
DO $$
BEGIN
  -- Insert mock profiles for test
  INSERT INTO public.profiles (id, name, email) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Student A', 'student.a@college.edu'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Student B', 'student.b@college.edu')
  ON CONFLICT (id) DO NOTHING;
END $$;

-- 2. As User A, insert a private subject and note
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" = '{"sub": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "role": "authenticated"}';

INSERT INTO public.subjects (id, user_id, name, code)
VALUES ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Student A Private Subject', 'CS101');

INSERT INTO public.notes (id, user_id, title, content)
VALUES ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Student A Secret Exam Notes', 'Confidential revision notes.');

-- Verify User A can read own notes
SELECT count(*) = 1 AS user_a_can_read_own_notes FROM public.notes WHERE id = '22222222-2222-2222-2222-222222222222';

-- 3. Switch context to User B
SET LOCAL "request.jwt.claims" = '{"sub": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "role": "authenticated"}';

-- Verify User B cannot read User A's subject or notes
SELECT count(*) = 0 AS user_b_cannot_read_user_a_subjects FROM public.subjects WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
SELECT count(*) = 0 AS user_b_cannot_read_user_a_notes FROM public.notes WHERE user_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

-- Verify User B cannot update User A's note
UPDATE public.notes SET title = 'Hacked by B' WHERE id = '22222222-2222-2222-2222-222222222222';
SELECT count(*) = 0 AS user_b_cannot_modify_user_a_note FROM public.notes WHERE id = '22222222-2222-2222-2222-222222222222' AND title = 'Hacked by B';

-- Verify User B cannot delete User A's note
DELETE FROM public.notes WHERE id = '22222222-2222-2222-2222-222222222222';
SELECT count(*) = 1 AS user_a_note_preserved FROM public.notes WHERE id = '22222222-2222-2222-2222-222222222222';

ROLLBACK;
