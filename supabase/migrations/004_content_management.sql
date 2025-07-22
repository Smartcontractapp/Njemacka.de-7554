-- Content Management Enhancements

-- Featured Content Table (for homepage and section highlights)
CREATE TABLE IF NOT EXISTS public.featured_content_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'news', 'service', 'classified')),
  content_id UUID NOT NULL,
  position INTEGER,
  section TEXT NOT NULL,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (content_type, content_id, section)
);

-- Content Metrics Table (for analytics)
CREATE TABLE IF NOT EXISTS public.content_metrics_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'news', 'service', 'classified')),
  content_id UUID NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  avg_time_seconds INTEGER DEFAULT 0,
  bounce_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (content_type, content_id)
);

-- Media Library Table
CREATE TABLE IF NOT EXISTS public.media_library_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  folder TEXT DEFAULT 'general',
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Editorial Calendar
CREATE TABLE IF NOT EXISTS public.editorial_calendar_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'news', 'other')),
  content_id UUID,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'canceled')),
  scheduled_date TIMESTAMPTZ NOT NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Revisions (for tracking changes)
CREATE TABLE IF NOT EXISTS public.content_revisions_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'news')),
  content_id UUID NOT NULL,
  revision_number INTEGER NOT NULL,
  content JSONB NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (content_type, content_id, revision_number)
);

-- Enable RLS on new tables
ALTER TABLE public.featured_content_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_metrics_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_calendar_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions_x8k2m9 ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Featured content is viewable by everyone" ON public.featured_content_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Content metrics are viewable by admins" ON public.content_metrics_x8k2m9
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Media library items are viewable by everyone" ON public.media_library_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Users can upload their own media" ON public.media_library_x8k2m9
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can manage their own media" ON public.media_library_x8k2m9
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Editorial calendar is viewable by admins" ON public.editorial_calendar_x8k2m9
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Content revisions are viewable by admins" ON public.content_revisions_x8k2m9
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_featured_content_section ON public.featured_content_x8k2m9 (section);
CREATE INDEX IF NOT EXISTS idx_featured_content_dates ON public.featured_content_x8k2m9 (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_media_library_author ON public.media_library_x8k2m9 (author_id);
CREATE INDEX IF NOT EXISTS idx_media_library_type ON public.media_library_x8k2m9 (file_type);
CREATE INDEX IF NOT EXISTS idx_editorial_calendar_date ON public.editorial_calendar_x8k2m9 (scheduled_date);
CREATE INDEX IF NOT EXISTS idx_content_revisions_content ON public.content_revisions_x8k2m9 (content_type, content_id);

-- Add triggers for updated_at
CREATE TRIGGER update_featured_content_updated_at
  BEFORE UPDATE ON public.featured_content_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_metrics_updated_at
  BEFORE UPDATE ON public.content_metrics_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_library_updated_at
  BEFORE UPDATE ON public.media_library_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_editorial_calendar_updated_at
  BEFORE UPDATE ON public.editorial_calendar_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to save content revision
CREATE OR REPLACE FUNCTION save_content_revision()
RETURNS TRIGGER AS $$
DECLARE
  last_revision INTEGER;
BEGIN
  -- Find the last revision number
  SELECT COALESCE(MAX(revision_number), 0) INTO last_revision
  FROM public.content_revisions_x8k2m9
  WHERE content_type = TG_ARGV[0] AND content_id = OLD.id;
  
  -- Insert new revision
  INSERT INTO public.content_revisions_x8k2m9 (
    content_type, 
    content_id, 
    revision_number,
    content,
    author_id
  ) VALUES (
    TG_ARGV[0],
    OLD.id,
    last_revision + 1,
    row_to_json(OLD),
    auth.uid()
  );
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for content revisions
CREATE TRIGGER save_post_revision
  BEFORE UPDATE ON public.posts_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION save_content_revision('post');

CREATE TRIGGER save_news_revision
  BEFORE UPDATE ON public.news_articles_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION save_content_revision('news');