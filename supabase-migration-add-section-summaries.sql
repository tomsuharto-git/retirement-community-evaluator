-- Add section summaries for Financials, Care, Housing, and Community
-- These will be 1-2 sentence summaries written by Claude based on research

ALTER TABLE communities
ADD COLUMN IF NOT EXISTS financials_summary TEXT,
ADD COLUMN IF NOT EXISTS care_summary TEXT,
ADD COLUMN IF NOT EXISTS housing_summary TEXT,
ADD COLUMN IF NOT EXISTS community_summary TEXT;

COMMENT ON COLUMN communities.financials_summary IS 'Brief 1-2 sentence summary of financial details (entrance fees, what''s included, payment structure, etc.)';
COMMENT ON COLUMN communities.care_summary IS 'Brief 1-2 sentence summary of care philosophy and approach specific to this community';
COMMENT ON COLUMN communities.housing_summary IS 'Brief 1-2 sentence summary of housing features and style specific to this community';
COMMENT ON COLUMN communities.community_summary IS 'Brief 1-2 sentence summary of the community culture, activities, and lifestyle';
