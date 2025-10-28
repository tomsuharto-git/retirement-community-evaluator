-- Add care levels and housing options
ALTER TABLE communities
ADD COLUMN IF NOT EXISTS care_levels TEXT[],
ADD COLUMN IF NOT EXISTS housing_options TEXT[];

-- Add review fields
ALTER TABLE communities
ADD COLUMN IF NOT EXISTS review_first_year_rating INTEGER CHECK (review_first_year_rating >= 0 AND review_first_year_rating <= 5),
ADD COLUMN IF NOT EXISTS review_affordability_rating INTEGER CHECK (review_affordability_rating >= 0 AND review_affordability_rating <= 5),
ADD COLUMN IF NOT EXISTS review_care_rating INTEGER CHECK (review_care_rating >= 0 AND review_care_rating <= 5),
ADD COLUMN IF NOT EXISTS review_housing_rating INTEGER CHECK (review_housing_rating >= 0 AND review_housing_rating <= 5),
ADD COLUMN IF NOT EXISTS review_community_rating INTEGER CHECK (review_community_rating >= 0 AND review_community_rating <= 5),
ADD COLUMN IF NOT EXISTS review_overall_rating INTEGER CHECK (review_overall_rating >= 0 AND review_overall_rating <= 5),
ADD COLUMN IF NOT EXISTS review_pros TEXT,
ADD COLUMN IF NOT EXISTS review_cons TEXT,
ADD COLUMN IF NOT EXISTS review_notes TEXT;

-- Update existing communities with default care levels
UPDATE communities
SET care_levels = ARRAY['Independent Living']
WHERE care_levels IS NULL;

-- Update existing communities with default housing options
UPDATE communities
SET housing_options = ARRAY['Studio', 'One-bedroom apartment', 'Two-bedroom apartment']
WHERE housing_options IS NULL;
