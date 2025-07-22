-- Create auth_settings table with proper RLS
CREATE TABLE IF NOT EXISTS public.auth_settings_x8k2m9 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.auth_settings_x8k2m9 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to manage auth settings
CREATE POLICY "Only admins can manage auth settings" ON public.auth_settings_x8k2m9
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Create policy to allow public to view auth settings
CREATE POLICY "Auth settings are viewable by everyone" ON public.auth_settings_x8k2m9
  FOR SELECT USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_auth_settings_updated_at
  BEFORE UPDATE ON public.auth_settings_x8k2m9
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings if not exists
INSERT INTO public.auth_settings_x8k2m9 (id, settings)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  '{
    "allowEmailSignup": true,
    "requireEmailConfirmation": false,
    "allowPasswordReset": true,
    "minPasswordLength": 8,
    "allowAnonymousAccess": false,
    "jwtExpiry": 3600,
    "securityPolicies": {
      "enforceStrongPasswords": true,
      "preventPasswordReuse": true,
      "maxLoginAttempts": 5
    }
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;