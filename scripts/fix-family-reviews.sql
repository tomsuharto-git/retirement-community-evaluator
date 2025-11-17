-- Fix family visit reviews - ensure each pro/con is a discrete thought
-- Run this to replace the broken-up reviews

-- 1. Covenant Living of Cromwell
UPDATE communities
SET
  review_pros = 'Full woodworking studio with complete tools and experienced staff - perfect for hands-on hobbies
Two meals daily (breakfast and dinner) included in monthly fee
Good food quality during lunch visit',
  review_cons = 'Buildings separated across campus - need to walk outside to dining room and common facilities (challenging in winter)
30 minutes from home, 20+ minutes from family - requires dedicated trip vs convenient stop-by
Food was noticeably salty
2% monthly reduction on entrance fee - nothing left after approximately 4 years
Smaller apartment units compared to other facilities',
  review_notes = 'Visited Nov 2024 and had lunch in the dining room. 300 residents total. Entrance fee approximately $400k with declining refund structure (2% per month). $800/month meal plan for two people included. The woodworking studio is a major draw but the separated buildings requiring outdoor walking in winter is a significant concern. Distance from family also makes casual visits less likely.',
  updated_at = NOW()
WHERE name = 'Covenant Living of Cromwell';

-- 2. Brookdale Chatfield (West Hartford)
UPDATE communities
SET
  review_pros = 'No entrance fee or down payment required - monthly rental only (major financial advantage)
Excellent location near West Farms Mall, Costco, BJs - very convenient for family visits
All facilities in one building - no outdoor walking required
Most spacious apartment units of the three visited
Dedicated private dining room available for family gatherings and celebrations
On-site nursing care assistance (supposedly less expensive than outside agencies)',
  review_cons = 'First impression: exterior looks ugly and like a hospital
Smallest population (120 residents) and least common space
Few residents visible in common areas during morning visit
Must purchase own washer/dryer (not included like other facilities)
Less complete amenities compared to larger facilities
Not as attractive or welcoming as Duncaster',
  review_notes = 'Visited Nov 2024 during morning hours. Only 120 residents total (23% couples - about 12-15 couples). Two meals daily included in monthly fee. Laundry room available if not purchasing washer/dryer. The lack of entrance fee is a huge financial advantage and the location is unbeatable for family visits, but the smaller size and less attractive appearance are notable drawbacks. Located on Chatfield Road in West Hartford.',
  updated_at = NOW()
WHERE name = 'Brookdale Chatfield';

-- 3. Duncaster
UPDATE communities
SET
  review_pros = 'Most complete and beautiful facility of all three visited
Extensive amenities: fitness center, swimming pool, extensive grounds for walking
Three wings with abundant indoor walking space and two dining rooms
Very welcoming atmosphere with plants, flowers, and art throughout
Know a couple already living there (former neighbors) - have standing dinner invitation
80% of entrance fee refundable at end (best refund structure)
One spouse can move to assisted living while other stays in apartment at same monthly cost',
  review_cons = '6.1 miles (18 minutes) away - requires dedicated trip, not convenient for quick family visits
Entrance fee approximately $400k required upfront
Most expensive overall due to entrance fee structure',
  review_notes = 'Visited Nov 2024. Largest facility at 340 residents. Have invitation from friends (former Gillette Ridge neighbors) to visit for dinner to experience dining room firsthand. $800/month meal plan for two (adjustable based on usage). Located in Bloomfield. This is the most beautiful and complete facility but requires the largest upfront financial commitment and is the furthest from family.',
  updated_at = NOW()
WHERE name = 'Duncaster';
