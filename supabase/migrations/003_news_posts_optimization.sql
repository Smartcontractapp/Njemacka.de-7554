-- News Articles Table
CREATE TABLE IF NOT EXISTS public.news_articles_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT[] NOT NULL, -- Array of paragraphs for easier rendering
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_urgent BOOLEAN DEFAULT false,
  read_time TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts Optimization
ALTER TABLE public.posts_x8k2m9 
ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS read_time TEXT,
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_slug ON public.news_articles_x8k2m9 (slug);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles_x8k2m9 (category);
CREATE INDEX IF NOT EXISTS idx_news_articles_status ON public.news_articles_x8k2m9 (status);
CREATE INDEX IF NOT EXISTS idx_news_articles_urgent ON public.news_articles_x8k2m9 (is_urgent);
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON public.news_articles_x8k2m9 (published_at);

-- Enable RLS on news articles
ALTER TABLE public.news_articles_x8k2m9 ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for news articles
CREATE POLICY "Published news are viewable by everyone" ON public.news_articles_x8k2m9
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage their news" ON public.news_articles_x8k2m9
  FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all news" ON public.news_articles_x8k2m9
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Add trigger for updated_at on news articles
CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for latest published content
CREATE OR REPLACE VIEW public.latest_content_v1 AS
SELECT 
  'post' as content_type,
  id,
  title,
  slug,
  excerpt,
  image_url,
  category_id as category,
  published_at,
  views,
  likes
FROM 
  public.posts_x8k2m9
WHERE 
  status = 'published'
UNION ALL
SELECT 
  'news' as content_type,
  id,
  title,
  slug,
  excerpt,
  image_url,
  category,
  published_at,
  views,
  likes
FROM 
  public.news_articles_x8k2m9
WHERE 
  status = 'published';

-- Function to update view count
CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.content_type = 'post' THEN
    UPDATE public.posts_x8k2m9 SET views = views + 1 WHERE id = NEW.id;
  ELSIF NEW.content_type = 'news' THEN
    UPDATE public.news_articles_x8k2m9 SET views = views + 1 WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update like count
CREATE OR REPLACE FUNCTION increment_like_count(content_type TEXT, content_id UUID)
RETURNS VOID AS $$
BEGIN
  IF content_type = 'post' THEN
    UPDATE public.posts_x8k2m9 SET likes = likes + 1 WHERE id = content_id;
  ELSIF content_type = 'news' THEN
    UPDATE public.news_articles_x8k2m9 SET likes = likes + 1 WHERE id = content_id;
  END IF;
END;
$$ language 'plpgsql';

-- Sample data for news articles
INSERT INTO public.news_articles_x8k2m9 (
  title,
  slug,
  excerpt,
  content,
  image_url,
  category,
  source,
  is_urgent,
  read_time,
  status,
  published_at
) VALUES
(
  'Njemačka uvodi novi digitalni pasoš od 2025. godine',
  'njemacka-uvodi-novi-digitalni-pasos',
  'Novi biometrijski pasoš sa čip karticom omogućiće brže granične prelaze i veću sigurnost.',
  ARRAY[
    'Njemačko Ministarstvo unutrašnjih poslova je najavljalo uvođenje novog digitalnog pasoša koji će zamijeniti trenutni model od januara 2025. godine. Nova tehnologija će omogućiti građanima brže i sigurnije putovanje kroz granične prelaze.',
    'Digitalni pasoš će sadržavati naprednu RFID tehnologiju koja će omogućiti automatsko očitavanje podataka na graničnim prelazima. Ovo će značajno smanjiti vrijeme čekanja i poboljšati sigurnost putovanja.',
    'Građani će morati da se prijave za novi pasoš u lokalnim upravama, a proces će biti postupno implementiran tokom 2025. godine. Stari pasoševi će ostati važeći do isteka njihove valjanosti.'
  ],
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Vijesti',
  'DPA',
  true,
  '3 min čitanja',
  'published',
  NOW()
),
(
  'Berlin otvara najveći božićni sajam u Evropi',
  'berlin-otvara-najveci-bozicni-sajam',
  'Glavni grad Njemačke priprema rekordni božićni sajam sa preko 300 štandova iz cijele Evrope.',
  ARRAY[
    'Berlin se priprema za otvaranje najvećeg božićnog sajma u Evropi koji će se održati od 25. novembra do 6. januara. Sajam će imati preko 300 štandova sa proizvodima iz cijele Evrope.',
    'Posetioci će moći da uživaju u tradicionalnim njemačkim specijalitetima, ručno izrađenim poklonima i čuvenom Glühweinu. Sajam će également imati posebnu sekciju za djecu sa raznim aktivnostima.',
    'Organizatori očekuju preko 2 miliona posetilaca tokom trajanja sajma. Specijalne autobusne linije će biti uvedene za lakši pristup sajmu.'
  ],
  'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Kultura',
  'Berlin.de',
  false,
  '4 min čitanja',
  'published',
  NOW() - INTERVAL '1 day'
);

-- Update existing blog posts with new fields (if you have existing data)
UPDATE public.posts_x8k2m9
SET 
  content_blocks = jsonb_build_array(
    jsonb_build_object('type', 'paragraph', 'content', content)
  ),
  read_time = CASE 
    WHEN LENGTH(content) < 3000 THEN '5 min čitanja'
    WHEN LENGTH(content) < 6000 THEN '10 min čitanja'
    ELSE '15+ min čitanja'
  END,
  seo_title = title,
  seo_description = excerpt,
  published_at = created_at
WHERE content_blocks IS NULL OR content_blocks = '[]'::jsonb;