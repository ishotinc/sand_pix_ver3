-- Enable RLS on all tables
ALTER TABLE user_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipe_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- User metadata policies
CREATE POLICY "Users can view own metadata" ON user_metadata
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own metadata" ON user_metadata
  FOR UPDATE USING (auth.uid() = user_id);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (is_published = true);

-- Swipe results policies
CREATE POLICY "Users can view own swipe results" ON swipe_results
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM projects WHERE projects.id = swipe_results.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own swipe results" ON swipe_results
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM projects WHERE projects.id = swipe_results.project_id 
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own swipe results" ON swipe_results
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM projects WHERE projects.id = swipe_results.project_id 
    AND projects.user_id = auth.uid()
  ));

-- Subscriptions policies
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);