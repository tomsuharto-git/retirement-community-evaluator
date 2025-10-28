-- Add section summaries for Duncaster based on research
-- These are 1-2 sentence summaries written specifically for Duncaster

UPDATE communities
SET
  financials_summary = 'Duncaster offers a comprehensive LifeCare™ contract that protects residents against high long-term care costs, with monthly fees ranging from $4,500 to $9,200 depending on apartment size and care level. As a non-profit CCRC, entrance fees and what''s included should be discussed directly with the community.',

  care_summary = 'As Connecticut''s first non-profit CCRC, Duncaster provides a full continuum of care from independent living through skilled nursing, with 24-hour nursing staff and an on-site rehabilitation center. The community has earned a 5-star CMS rating, placing it in the top 10% of facilities nationwide.',

  housing_summary = 'Duncaster offers apartment-style living ranging from studios to two-bedroom units, plus private cottages on their 94-acre campus. All residences feature emergency call systems and many offer beautiful views of the surrounding grounds and walking trails.',

  community_summary = 'With over 40 clubs and activities, Duncaster provides an active lifestyle featuring educational programs, arts and crafts studios, a woodworking shop, and unique amenities like an aquatic center with water aerobics. The boutique community sits on 94 landscaped acres with extensive walking trails and access to nearby golf courses.',

  updated_at = NOW()

WHERE name = 'Duncaster';

-- Verify the update
SELECT
  name,
  financials_summary,
  care_summary,
  housing_summary,
  community_summary
FROM communities
WHERE name = 'Duncaster';
