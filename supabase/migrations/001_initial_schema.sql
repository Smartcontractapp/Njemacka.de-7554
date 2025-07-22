-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles_x8k2m9 (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  parent_id UUID REFERENCES public.categories_x8k2m9(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts Table
CREATE TABLE IF NOT EXISTS public.posts_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories_x8k2m9(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments Table
CREATE TABLE IF NOT EXISTS public.comments_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  post_id UUID REFERENCES public.posts_x8k2m9(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES public.comments_x8k2m9(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags Table
CREATE TABLE IF NOT EXISTS public.tags_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts Tags Junction Table
CREATE TABLE IF NOT EXISTS public.posts_tags_x8k2m9 (
  post_id UUID REFERENCES public.posts_x8k2m9(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags_x8k2m9(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  image_url TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Hours Table
CREATE TABLE IF NOT EXISTS public.service_hours_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES public.services_x8k2m9(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES public.services_x8k2m9(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classifieds Table
CREATE TABLE IF NOT EXISTS public.classifieds_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2),
  location TEXT NOT NULL,
  image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ Table
CREATE TABLE IF NOT EXISTS public.faq_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_tags_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_hours_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classifieds_x8k2m9 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_x8k2m9 ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- User Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.user_profiles_x8k2m9
  FOR UPDATE USING (auth.uid() = id);

-- Posts
CREATE POLICY "Published posts are viewable by everyone" ON public.posts_x8k2m9
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage their posts" ON public.posts_x8k2m9
  FOR ALL USING (auth.uid() = author_id);

-- Comments
CREATE POLICY "Comments are viewable by everyone" ON public.comments_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON public.comments_x8k2m9
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can manage their comments" ON public.comments_x8k2m9
  FOR UPDATE USING (auth.uid() = author_id);

-- Services
CREATE POLICY "Services are viewable by everyone" ON public.services_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Verified users can create services" ON public.services_x8k2m9
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Service owners can update their listings" ON public.services_x8k2m9
  FOR UPDATE USING (auth.uid() = owner_id);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews_x8k2m9
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.reviews_x8k2m9
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can update their reviews" ON public.reviews_x8k2m9
  FOR UPDATE USING (auth.uid() = author_id);

-- Classifieds
CREATE POLICY "Approved classifieds are viewable by everyone" ON public.classifieds_x8k2m9
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can create classifieds" ON public.classifieds_x8k2m9
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can manage their classifieds" ON public.classifieds_x8k2m9
  FOR UPDATE USING (auth.uid() = author_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts_x8k2m9 (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts_x8k2m9 (category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts_x8k2m9 (author_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts_x8k2m9 (status);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services_x8k2m9 (category);
CREATE INDEX IF NOT EXISTS idx_services_city ON public.services_x8k2m9 (city);
CREATE INDEX IF NOT EXISTS idx_classifieds_status ON public.classifieds_x8k2m9 (status);
CREATE INDEX IF NOT EXISTS idx_classifieds_category ON public.classifieds_x8k2m9 (category);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classifieds_updated_at
  BEFORE UPDATE ON public.classifieds_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update service rating
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.services_x8k2m9
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.reviews_x8k2m9
      WHERE service_id = NEW.service_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews_x8k2m9
      WHERE service_id = NEW.service_id
    )
  WHERE id = NEW.service_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating service rating
CREATE TRIGGER update_service_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_service_rating();