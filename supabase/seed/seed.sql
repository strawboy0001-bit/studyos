-- StudyOS Demo Persona Seed Data
-- Persona: Surya / Demo Student (Course: BCA, Semester: 1)
-- Subjects: C Programming, Chemistry, Environment, English, Mathematics

-- Note: In Supabase production, replace '00000000-0000-0000-0000-000000000001' with a real auth.uid()

DO $$
DECLARE
  v_user_id UUID := '00000000-0000-0000-0000-000000000001';
  v_sub_c UUID := gen_random_uuid();
  v_sub_chem UUID := gen_random_uuid();
  v_sub_env UUID := gen_random_uuid();
  v_sub_eng UUID := gen_random_uuid();
  v_sub_math UUID := gen_random_uuid();

  v_topic_loops UUID := gen_random_uuid();
  v_topic_pointers UUID := gen_random_uuid();
  v_topic_atomic UUID := gen_random_uuid();
  v_topic_eco UUID := gen_random_uuid();
BEGIN
  -- Insert or update demo profile
  INSERT INTO public.profiles (id, name, email, college, course, year, semester)
  VALUES (
    v_user_id,
    'Surya Demo',
    'demo.student@studyos.local',
    'National Institute of Technology',
    'BCA',
    1,
    1
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    course = EXCLUDED.course;

  -- Subjects
  INSERT INTO public.subjects (id, user_id, name, code, color, semester) VALUES
    (v_sub_c, v_user_id, 'C Programming', 'CS101', '#6366f1', 1),
    (v_sub_chem, v_user_id, 'Applied Chemistry', 'CH102', '#06b6d4', 1),
    (v_sub_env, v_user_id, 'Environmental Studies', 'EV103', '#10b981', 1),
    (v_sub_eng, v_user_id, 'Technical English', 'EN104', '#f59e0b', 1),
    (v_sub_math, v_user_id, 'Discrete Mathematics', 'MA105', '#8b5cf6', 1);

  -- Topics
  INSERT INTO public.topics (id, subject_id, user_id, name, unit, importance, current_priority, quiz_accuracy, confidence_level) VALUES
    (v_topic_loops, v_sub_c, v_user_id, 'Loops and Iterations', 'Unit 2: Control Structures', 'HIGH', 'HIGH', 55.00, 45),
    (v_topic_pointers, v_sub_c, v_user_id, 'Pointers & Dynamic Memory', 'Unit 4: Memory Management', 'HIGH', 'MEDIUM', 70.00, 60),
    (v_topic_atomic, v_sub_chem, v_user_id, 'Atomic Structure & Bonding', 'Unit 1: Fundamentals', 'MEDIUM', 'MEDIUM', 80.00, 75),
    (v_topic_eco, v_sub_env, v_user_id, 'Ecosystems & Biodiversity', 'Unit 2: Ecology', 'MEDIUM', 'LOW', 85.00, 80);

  -- Sample Notes
  INSERT INTO public.notes (user_id, subject_id, topic_id, title, content, tags, is_pinned) VALUES
    (v_user_id, v_sub_c, v_topic_loops, 'Control Flow: While, Do-While, and For Loops', 'Summary of loop structures in C. Watch out for off-by-one errors in nested loops.', ARRAY['loops', 'c-lang', 'control-flow'], true),
    (v_user_id, v_sub_chem, v_topic_atomic, 'Bohr Model and Quantum Numbers', 'Detailed notes on orbital shells, Pauli exclusion principle, and Hunds rule.', ARRAY['chemistry', 'atomic-structure'], false);

  -- Sample Assignments
  INSERT INTO public.assignments (user_id, subject_id, title, description, deadline, priority, status) VALUES
    (v_user_id, v_sub_c, 'Implement Pattern Printing with Nested Loops', 'Write C programs to print diamond and Floyd triangle patterns.', now() + interval '2 days', 'HIGH', 'IN_PROGRESS'),
    (v_user_id, v_sub_chem, 'Lab Report: Acid-Base Titration Analysis', 'Submit 3-page report including calculation tables and graphs.', now() + interval '5 days', 'MEDIUM', 'NOT_STARTED');

  -- Sample Exams
  INSERT INTO public.exams (user_id, subject_id, title, exam_date, syllabus_scope, preparation_status) VALUES
    (v_sub_c, v_user_id, 'C Programming Mid-Semester Assessment', now() + interval '7 days', 'Units 1-3: Variables, Operators, Control Flow, Functions', 'IN_PROGRESS');

  -- AI Insights
  INSERT INTO public.ai_insights (user_id, category, title, content, priority, action_label, action_url) VALUES
    (v_user_id, 'RECOMMENDATION', 'Priority Review: C Programming Loops', 'Your recent quiz score was 55% and your Mid-Sem exam is in 7 days. Focus 30 minutes on loop invariants and nested iteration.', 'HIGH', 'Start Review', '/subjects');
END $$;
