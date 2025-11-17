-- Add family visit reviews to three communities
-- Based on Nov 15 family meeting transcript

-- 1. Covenant Living of Cromwell
UPDATE communities
SET
  review_pros = E'Full woodworking studio with complete tools and experienced staff - perfect for hands-on hobbies\nTwo meals daily (breakfast and dinner) included in monthly fee\nGood food quality during lunch visit',
  review_cons = E'Buildings separated across campus - need to walk outside to dining room and common facilities (challenging in winter)\n30 minutes from home, 20+ minutes from family - requires dedicated trip vs convenient stop-by\nFood was noticeably salty\n2% monthly reduction on entrance fee - nothing left after approximately 4 years\nSmaller apartment units compared to other facilities',
  review_notes = 'Visited Nov 2024 and had lunch in the dining room. 300 residents total. Entrance fee approximately $400k with declining refund structure (2% per month). $800/month meal plan for two people included. The woodworking studio is a major draw but the separated buildings requiring outdoor walking in winter is a significant concern. Distance from family also makes casual visits less likely.',
  updated_at = NOW()
WHERE name = 'Covenant Living of Cromwell';

-- 2. Brookdale Chatfield (West Hartford)
UPDATE communities
SET
  review_pros = E'No entrance fee or down payment required - monthly rental only (major financial advantage)\nExcellent location near West Farms Mall, Costco, BJ''s - very convenient for family visits\nAll facilities in one building - no outdoor walking required\nMost spacious apartment units of the three visited\nDedicated private dining room available for family gatherings and celebrations\nOn-site nursing care assistance (supposedly less expensive than outside agencies)',
  review_cons = E'First impression: exterior looks "ugly" and "like a hospital"\nSmallest population (120 residents) and least common space\nFew residents visible in common areas during morning visit\nMust purchase own washer/dryer (not included like other facilities)\nLess complete amenities compared to larger facilities\nNot as attractive or welcoming as Duncaster',
  review_notes = 'Visited Nov 2024 during morning hours. Only 120 residents total (23% couples - about 12-15 couples). Two meals daily included in monthly fee. Laundry room available if not purchasing washer/dryer. The lack of entrance fee is a huge financial advantage and the location is unbeatable for family visits, but the smaller size and less attractive appearance are notable drawbacks. Located on Chatfield Road in West Hartford.',
  updated_at = NOW()
WHERE name = 'Brookdale Chatfield';

-- 3. Duncaster
UPDATE communities
SET
  review_pros = E'Most complete and beautiful facility of all three visited\nExtensive amenities: fitness center, swimming pool, extensive grounds for walking\nThree wings with abundant indoor walking space and two dining rooms\nVery welcoming atmosphere with plants, flowers, and art throughout\nKnow a couple already living there (former neighbors) - have standing dinner invitation\n80% of entrance fee refundable at end (best refund structure)\nOne spouse can move to assisted living while other stays in apartment at same monthly cost',
  review_cons = E'6.1 miles (18 minutes) away - requires dedicated trip, not convenient for quick family visits\nEntrance fee approximately $400k required upfront\nMost expensive overall due to entrance fee structure',
  review_notes = 'Visited Nov 2024. Largest facility at 340 residents. Have invitation from friends (former Gillette Ridge neighbors) to visit for dinner to experience dining room firsthand. $800/month meal plan for two (adjustable based on usage). Located in Bloomfield. This is the most beautiful and complete facility but requires the largest upfront financial commitment and is the furthest from family.',
  updated_at = NOW()
WHERE name = 'Duncaster';
