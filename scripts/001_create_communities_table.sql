-- Create the retirement communities table
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  distance_miles DECIMAL(5, 2),
  drive_time_minutes INTEGER,
  star_rating DECIMAL(2, 1) CHECK (star_rating >= 0 AND star_rating <= 5),
  resident_count INTEGER,
  visited BOOLEAN DEFAULT FALSE,
  compare_selected BOOLEAN DEFAULT FALSE,
  community_type TEXT, -- Independent Living, Assisted Living, Memory Care, etc.
  monthly_cost_min INTEGER,
  monthly_cost_max INTEGER,
  amenities TEXT[], -- Array of amenities
  description TEXT,
  phone TEXT,
  website TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_communities_location ON public.communities(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_communities_distance ON public.communities(distance_miles);
CREATE INDEX IF NOT EXISTS idx_communities_rating ON public.communities(star_rating);
CREATE INDEX IF NOT EXISTS idx_communities_visited ON public.communities(visited);

-- Enable Row Level Security (RLS)
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is community data)
CREATE POLICY "Allow public read access to communities" 
  ON public.communities FOR SELECT 
  USING (true);

-- For now, allow public insert/update for demo purposes
-- In production, you'd want to restrict this to admin users
CREATE POLICY "Allow public insert to communities" 
  ON public.communities FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update to communities" 
  ON public.communities FOR UPDATE 
  USING (true);
