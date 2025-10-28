# Updated Research Template with Section Summaries

## Overview
This template now includes 1-2 sentence summaries for each major section (Financials, Care, Housing, Community) that Claude should write based on research findings.

---

## Research Prompt Template

```markdown
I need you to research and gather comprehensive data about a retirement community in Connecticut.

## Community to Research:
**Name**: [COMMUNITY NAME]
**Location**: [CITY], Connecticut

## Research Instructions:

### 1. Basic Information
- **Name**: Official community name
- **Location**: City only (e.g., "Bloomfield")
- **Address**: Full street address (e.g., "40 Loeffler Road, Bloomfield, CT 06002")
- **Phone**: Main contact number in format (860) 123-4567
- **Website**: Official website URL

### 2. Description
Write a compelling 2-3 sentence description that includes:
- Year established (if available)
- Unique features or "first" status
- Size (acres, if mentioned)
- Any awards or recognition

### 3. Community Details
- **Community Type**: (Independent Living, Assisted Living, Memory Care, CCRC, Life Plan Community)
- **Resident Count**: Approximate number (estimate if not stated)
- **Google Reviews Rating**: Star rating from Google Reviews specifically (0-5)

### 4. Pricing
- **Monthly Cost Min**: Minimum monthly cost (number only)
- **Monthly Cost Max**: Maximum monthly cost (number only)
- Note: If pricing requires calling, provide best estimate from third-party sites

### 5. Care Levels Available
Select all that apply:
- Independent Living
- Assisted Living
- Memory Care
- Skilled Nursing
- Rehabilitation Care
- Respite Care
- Hospice Care

### 6. Housing Options
Select all that apply:
- Studio
- One-bedroom apartment
- Two-bedroom apartment
- Villa
- Cottage
- Townhome
- Memory care apartment

### 7. Amenities
List 10-20 amenities using DESCRIPTIVE names:
- ✅ "Indoor Heated Lap Pool" not "Pool"
- ✅ "Fitness Center with Personal Trainer" not "Gym"
- ✅ "Restaurant-Style Dining" not "Food"
- Include unique features (e.g., "94 Acres of Walking Trails")

### 8. **NEW: Section Summaries**

Based on your research, write a brief 1-2 sentence summary for each section:

#### Financials Summary
Write 1-2 sentences about:
- Payment structure (monthly fees, entrance fees, LifeCare contracts, etc.)
- What's included in costs
- Any unique financial features or protections
- Whether it's non-profit or for-profit (if relevant)

**Example (Duncaster):**
> "Duncaster offers a comprehensive LifeCare™ contract that protects residents against high long-term care costs, with monthly fees ranging from $4,500 to $9,200 depending on apartment size and care level. As a non-profit CCRC, entrance fees and what's included should be discussed directly with the community."

#### Care Summary
Write 1-2 sentences about:
- Care philosophy or approach specific to this community
- Key differentiators in their care model
- Ratings, certifications, or recognitions
- Unique care features

**Example (Duncaster):**
> "As Connecticut's first non-profit CCRC, Duncaster provides a full continuum of care from independent living through skilled nursing, with 24-hour nursing staff and an on-site rehabilitation center. The community has earned a 5-star CMS rating, placing it in the top 10% of facilities nationwide."

#### Housing Summary
Write 1-2 sentences about:
- Style and types of housing (apartments, cottages, villas)
- Unique features of the residences
- Setting or views
- Special amenities in units

**Example (Duncaster):**
> "Duncaster offers apartment-style living ranging from studios to two-bedroom units, plus private cottages on their 94-acre campus. All residences feature emergency call systems and many offer beautiful views of the surrounding grounds and walking trails."

#### Community Summary
Write 1-2 sentences about:
- Lifestyle and culture
- Social activities and programs
- Unique amenities or facilities
- Campus features (grounds, gardens, special spaces)

**Example (Duncaster):**
> "With over 40 clubs and activities, Duncaster provides an active lifestyle featuring educational programs, arts and crafts studios, a woodworking shop, and unique amenities like an aquatic center with water aerobics. The boutique community sits on 94 landscaped acres with extensive walking trails and access to nearby golf courses."

---

## Output Format:

```json
{
  "name": "",
  "location": "",
  "address": "",
  "description": "",
  "community_type": "",
  "resident_count": null,
  "star_rating": null,
  "monthly_cost_min": null,
  "monthly_cost_max": null,
  "phone": "",
  "website": "",
  "care_levels": [],
  "housing_options": [],
  "amenities": [],

  "financials_summary": "",
  "care_summary": "",
  "housing_summary": "",
  "community_summary": "",

  "data_confidence": {
    "pricing": "high/medium/low",
    "amenities": "high/medium/low",
    "resident_count": "confirmed/estimated/unknown",
    "care_levels": "confirmed/inferred/unknown",
    "housing_options": "confirmed/inferred/unknown"
  },
  "sources": [],
  "notes": ""
}
```

## Important Instructions:
- Use web search to find current, accurate information
- Visit official websites when possible
- Cross-reference multiple sources for pricing
- **Write summaries based on actual research findings, not generic text**
- **Each summary should be specific to THIS community**
- If you can't find information, use null or mark as "unknown"
- Include your confidence level for each category
- List all sources you used
- Note any discrepancies between sources
```

---

## Summary Writing Guidelines

### DO ✅
- Write specific details about THIS community
- Mention unique features or differentiators
- Include quantifiable details (acres, number of activities, ratings)
- Reference awards, certifications, or recognition
- Explain payment structures or contracts
- Describe the actual lifestyle or culture

### DON'T ❌
- Use generic descriptions that could apply to any community
- Include vague phrases like "supportive environment" without specifics
- Copy boilerplate text from websites
- Make assumptions about features not mentioned in research
- Use Lorem Ipsum or placeholder text

---

## Example: Good vs Bad Summaries

### Financials Summary

❌ **Bad (Generic):**
> "Monthly costs vary depending on care level and apartment size. Contact the community for pricing details."

✅ **Good (Specific):**
> "Duncaster offers a comprehensive LifeCare™ contract that protects residents against high long-term care costs, with monthly fees ranging from $4,500 to $9,200 depending on apartment size and care level."

---

### Care Summary

❌ **Bad (Generic):**
> "The community provides comprehensive care services with trained staff available 24/7 to support residents."

✅ **Good (Specific):**
> "As Connecticut's first non-profit CCRC, Duncaster provides a full continuum of care from independent living through skilled nursing, with 24-hour nursing staff and an on-site rehabilitation center. The community has earned a 5-star CMS rating, placing it in the top 10% of facilities nationwide."

---

### Housing Summary

❌ **Bad (Generic):**
> "Housing options include studio, one-bedroom, and two-bedroom apartments with modern amenities and emergency systems."

✅ **Good (Specific):**
> "Duncaster offers apartment-style living ranging from studios to two-bedroom units, plus private cottages on their 94-acre campus. All residences feature emergency call systems and many offer beautiful views of the surrounding grounds and walking trails."

---

### Community Summary

❌ **Bad (Generic):**
> "Residents enjoy a variety of activities and amenities including dining, fitness, and social programs in a supportive community."

✅ **Good (Specific):**
> "With over 40 clubs and activities, Duncaster provides an active lifestyle featuring educational programs, arts and crafts studios, a woodworking shop, and unique amenities like an aquatic center with water aerobics. The boutique community sits on 94 landscaped acres with extensive walking trails and access to nearby golf courses."

---

## Benefits of Section Summaries

### For Users:
- ✅ Quick context before diving into details
- ✅ Understand what makes each community unique
- ✅ Get the "why" behind the data (care levels, amenities, etc.)
- ✅ More engaging than just badges/lists

### For Database:
- ✅ Captures qualitative research findings
- ✅ Preserves unique selling points
- ✅ Makes comparisons more meaningful
- ✅ Adds personality to each community profile

### For Researcher (Claude):
- ✅ Forces synthesis of research findings
- ✅ Ensures understanding of community differentiators
- ✅ Documents the "story" behind the data
- ✅ Makes research more thorough

---

## SQL Update Pattern

When updating a community with summaries:

```sql
UPDATE communities
SET
  -- Basic data fields
  phone = '...',
  website = '...',
  -- ... other fields ...

  -- Section summaries
  financials_summary = 'Your 1-2 sentence summary here',
  care_summary = 'Your 1-2 sentence summary here',
  housing_summary = 'Your 1-2 sentence summary here',
  community_summary = 'Your 1-2 sentence summary here',

  updated_at = NOW()
WHERE name = 'Community Name';
```

---

## Ready to Use

This template is now ready for researching the remaining 9 communities:

1. Brookdale Chatfield - West Hartford
2. Brookdale West Hartford - West Hartford
3. Avery West Hartford - West Hartford
4. Avery Heights - Hartford
5. The McAuley - West Hartford
6. Farmington Station - Farmington
7. Middlewoods of Farmington - Farmington
8. Seabury - Bloomfield
9. River Ridge at Avon - Avon

For each community, Claude will now provide:
- All original data fields
- **Plus 4 custom summaries** that make each community unique
