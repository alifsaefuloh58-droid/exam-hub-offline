-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'student');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_sets table
CREATE TABLE public.exam_sets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_set_id UUID REFERENCES public.exam_sets(id) ON DELETE CASCADE NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('reading', 'listening')),
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_image_url TEXT,
  audio_url TEXT,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  option_a_image_url TEXT,
  option_b_image_url TEXT,
  option_c_image_url TEXT,
  option_d_image_url TEXT,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(exam_set_id, question_type, question_number)
);

-- Create exam_attempts table
CREATE TABLE public.exam_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exam_set_id UUID REFERENCES public.exam_sets(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  reading_score INTEGER DEFAULT 0,
  listening_score INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student_answers table
CREATE TABLE public.student_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  attempt_id UUID REFERENCES public.exam_attempts(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
  selected_answer TEXT CHECK (selected_answer IN ('A', 'B', 'C', 'D')),
  is_correct BOOLEAN,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(attempt_id, question_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update profiles" ON public.profiles
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for exam_sets
CREATE POLICY "Everyone can view active exam sets" ON public.exam_sets
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage exam sets" ON public.exam_sets
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for questions
CREATE POLICY "Students can view questions from active sets" ON public.questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.exam_sets 
      WHERE id = exam_set_id AND is_active = true
    )
  );

CREATE POLICY "Admins can manage questions" ON public.questions
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for exam_attempts
CREATE POLICY "Students can view their own attempts" ON public.exam_attempts
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can create their own attempts" ON public.exam_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own attempts" ON public.exam_attempts
  FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all attempts" ON public.exam_attempts
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for student_answers
CREATE POLICY "Students can manage their own answers" ON public.student_answers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.exam_attempts 
      WHERE id = attempt_id AND student_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all answers" ON public.student_answers
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- Create storage buckets for files
INSERT INTO storage.buckets (id, name, public) VALUES ('exam-images', 'exam-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('exam-audio', 'exam-audio', true);

-- Storage policies for exam images
CREATE POLICY "Anyone can view exam images" ON storage.objects
  FOR SELECT USING (bucket_id = 'exam-images');

CREATE POLICY "Admins can upload exam images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'exam-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update exam images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'exam-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can delete exam images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'exam-images' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

-- Storage policies for exam audio
CREATE POLICY "Anyone can view exam audio" ON storage.objects
  FOR SELECT USING (bucket_id = 'exam-audio');

CREATE POLICY "Admins can upload exam audio" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'exam-audio' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update exam audio" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'exam-audio' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can delete exam audio" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'exam-audio' AND 
    public.get_user_role(auth.uid()) = 'admin'
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to calculate exam scores
CREATE OR REPLACE FUNCTION public.calculate_exam_score(attempt_uuid UUID)
RETURNS VOID AS $$
DECLARE
  reading_correct INTEGER := 0;
  listening_correct INTEGER := 0;
  total_correct INTEGER := 0;
BEGIN
  -- Calculate reading score
  SELECT COUNT(*) INTO reading_correct
  FROM public.student_answers sa
  JOIN public.questions q ON sa.question_id = q.id
  WHERE sa.attempt_id = attempt_uuid 
    AND q.question_type = 'reading' 
    AND sa.is_correct = true;

  -- Calculate listening score
  SELECT COUNT(*) INTO listening_correct
  FROM public.student_answers sa
  JOIN public.questions q ON sa.question_id = q.id
  WHERE sa.attempt_id = attempt_uuid 
    AND q.question_type = 'listening' 
    AND sa.is_correct = true;

  total_correct := reading_correct + listening_correct;

  -- Update exam attempt with scores
  UPDATE public.exam_attempts
  SET 
    reading_score = reading_correct,
    listening_score = listening_correct,
    total_score = total_correct,
    completed_at = now(),
    is_completed = true
  WHERE id = attempt_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_sets_updated_at
  BEFORE UPDATE ON public.exam_sets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();