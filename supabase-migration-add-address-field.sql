-- Add address field to communities table
-- This was identified as missing in the research-database alignment audit

ALTER TABLE communities
ADD COLUMN IF NOT EXISTS address TEXT;

COMMENT ON COLUMN communities.address IS 'Full street address (e.g., "40 Loeffler Road, Bloomfield, CT 06002")';
COMMENT ON COLUMN communities.location IS 'City name only (e.g., "Bloomfield")';
