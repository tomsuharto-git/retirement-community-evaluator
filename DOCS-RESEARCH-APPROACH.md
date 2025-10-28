# Research Approach Documentation

## Overview

This document describes the approach for using Claude's built-in research capabilities to populate accurate, comprehensive data for all retirement communities in the database.

---

## Table of Contents

1. [Why Claude Research?](#why-claude-research)
2. [Research Capabilities](#research-capabilities)
3. [Complete Workflow](#complete-workflow)
4. [Prompt Template](#prompt-template)
5. [Expected Output Format](#expected-output-format)
6. [Quality Assurance](#quality-assurance)
7. [Database Update Process](#database-update-process)
8. [Timeline & Resources](#timeline--resources)

---

## Why Claude Research?

### Traditional Manual Approach
- ⏱️ **Time**: 1-2 hours per community = 10-20 hours total
- 🔍 **Sources**: Manual visits to 3-5 websites per community
- 📝 **Data Entry**: Manual copying and formatting
- ⚠️ **Errors**: High risk of typos and outdated information

### Claude Research Approach
- ⏱️ **Time**: 5-10 minutes per community = 1-2 hours total
- 🔍 **Sources**: Automated searches across multiple sources
- 📝 **Data Entry**: Structured JSON output ready for database
- ✅ **Accuracy**: Cross-referenced information with confidence ratings

### Key Benefits
1. **Speed**: 5-10x faster than manual research
2. **Comprehensive**: Searches multiple sources automatically
3. **Current**: Gets latest web information in real-time
4. **Structured**: Returns data in exact database format
5. **Sourced**: Provides references for every data point
6. **Intelligent**: Can infer missing information from context
7. **Cost**: $0 (included in Claude subscription)

---

## Research Capabilities

Claude can perform the following research tasks:

### 1. Web Search
- Search Google for community information
- Find official websites
- Locate pricing information
- Find review sites

### 2. Website Analysis
- Visit and read official websites
- Extract key information from pages
- Navigate to pricing/amenities sections
- Capture contact information

### 3. Review Aggregation
- Find Google Reviews ratings
- Check third-party sites (A Place for Mom, Caring.com)
- Identify common themes in reviews
- Note positive and negative feedback

### 4. Data Cross-Referencing
- Compare information across multiple sources
- Flag discrepancies
- Provide confidence levels
- Note which sources agree/disagree

### 5. Intelligent Inference
- Estimate missing data based on similar communities
- Infer care levels from descriptions
- Categorize amenities consistently
- Fill gaps where possible

---

## Complete Workflow

### Phase 1: Research (Claude Does This)

For each community, Claude will:

#### Step 1: Initial Search
```
Search: "[Community Name] Connecticut retirement community"
Purpose: Find official website and basic information
```

#### Step 2: Website Deep Dive
- Visit official website
- Read About/Services pages
- Check Pricing/Cost pages
- Find Contact information
- List Amenities/Features
- Note Care levels offered

#### Step 3: Review Research
```
Search: "[Community Name] reviews"
Search: "[Community Name] Google reviews"
```
- Find Google Reviews rating
- Count number of reviews
- Note overall sentiment
- Check third-party review sites

#### Step 4: Pricing Research
```
Search: "[Community Name] pricing cost"
Search: "[Community Name] monthly fees"
```
- Find monthly cost ranges
- Note entrance fees if mentioned
- Identify what's included
- Flag if pricing requires contact

#### Step 5: Cross-Reference
- Compare information from multiple sources
- Flag any discrepancies
- Assign confidence levels
- Document all sources used

### Phase 2: Data Structuring (Claude Does This)

Claude formats findings as JSON:

```json
{
  "name": "Community Name",
  "description": "Comprehensive 2-3 sentence description highlighting unique features",
  "community_type": "Independent Living",
  "resident_count": 120,
  "star_rating": 4.5,
  "monthly_cost_min": 3500,
  "monthly_cost_max": 5500,
  "phone": "(860) 555-0123",
  "website": "https://officialwebsite.com",
  "care_levels": [
    "Independent Living",
    "Assisted Living",
    "Memory Care"
  ],
  "housing_options": [
    "Studio",
    "One-bedroom apartment",
    "Two-bedroom apartment",
    "Villa"
  ],
  "amenities": [
    "Fitness Center",
    "Indoor Pool",
    "Fine Dining Restaurant",
    "Transportation Services",
    "Beauty Salon",
    "Library",
    "Movie Theater",
    "Art Studio",
    "Walking Trails",
    "Community Gardens",
    "Pet-Friendly",
    "24-Hour Security"
  ],
  "data_confidence": {
    "pricing": "medium",
    "amenities": "high",
    "resident_count": "estimated",
    "care_levels": "confirmed",
    "housing_options": "confirmed"
  },
  "sources": [
    "Official website: https://...",
    "Google Reviews: 4.5★ (234 reviews)",
    "A Place for Mom: https://...",
    "Caring.com: https://..."
  ],
  "notes": "Pricing may vary by unit type and care level. Call for current rates."
}
```

### Phase 3: Review & Validation (You Do This)

Review each community's data:

#### High Priority - Verify These:
- [ ] Phone number works
- [ ] Website URL is correct
- [ ] Pricing is current (call to confirm)
- [ ] Care levels are accurate

#### Medium Priority - Spot Check:
- [ ] Amenities list is comprehensive
- [ ] Description is accurate
- [ ] Housing options match website

#### Low Priority - Accept As-Is:
- [ ] Resident count (estimate is fine)
- [ ] Star rating (can be approximate)

### Phase 4: Database Update (We Do Together)

#### Option A: Manual Update (Safest)
1. Review JSON output
2. Copy data to Supabase Dashboard
3. Update one community at a time
4. Verify in UI after each update

#### Option B: SQL Script (Faster)
1. Generate SQL UPDATE statements from JSON
2. Review SQL script
3. Execute in Supabase SQL Editor
4. Verify all updates in UI

#### Option C: Bulk API Update (Fastest)
1. Create a bulk update script
2. Test with 1-2 communities
3. Run bulk update for all
4. Verify in UI

---

## Prompt Template

### Single Community Research

```markdown
I need you to research comprehensive data about a retirement community in Connecticut using web search.

## Community to Research:
**Name**: [COMMUNITY NAME]
**Location**: [CITY], Connecticut
**Current Address** (if known): [ADDRESS]

## Research Instructions:

### 1. Find Official Website & Contact Info
Search for and provide:
- Official website URL
- Complete physical address
- Main phone number
- Year established (if available)

### 2. Understand the Community
Read their website and provide:
- A compelling 2-3 sentence description
- What makes this community unique
- Primary community type (Independent Living, Assisted Living, Memory Care, Continuing Care, etc.)
- Approximate number of residents (estimate if not stated)

### 3. Pricing Information
Search their pricing pages and find:
- Monthly cost range (minimum and maximum)
- What's included in monthly cost
- Entrance fees (if applicable)
- Note if pricing requires calling for details

### 4. Care Levels Available
Determine which services they offer:
- [ ] Independent Living
- [ ] Assisted Living
- [ ] Memory Care
- [ ] Skilled Nursing
- [ ] Rehabilitation Care
- [ ] Respite Care
- [ ] Hospice Care

### 5. Housing Options
Find what unit types are available:
- [ ] Studio
- [ ] One-bedroom apartment
- [ ] Two-bedroom apartment
- [ ] Villa
- [ ] Cottage
- [ ] Townhome
- [ ] Memory care apartment

### 6. Amenities & Services
List 10-15 key amenities (focus on most important/unique):
- Fitness/Wellness facilities
- Dining options
- Transportation services
- Social/recreational activities
- Healthcare services
- Other special features

### 7. Reviews & Ratings
Find:
- Google Reviews star rating (out of 5)
- Total number of Google reviews
- Overall sentiment from reviews
- Any notable positive or negative themes

### 8. Additional Details
Note any:
- Special certifications or awards
- Unique programs or services
- Recent news or updates
- Parent company information

## Output Format:

Please provide your findings as valid JSON:

```json
{
  "name": "",
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
  "data_confidence": {
    "pricing": "",
    "amenities": "",
    "resident_count": "",
    "care_levels": "",
    "housing_options": ""
  },
  "sources": [],
  "notes": ""
}
```

## Important Guidelines:
- Use web search to find current information
- Visit official websites when possible
- Cross-reference pricing from multiple sources
- If information isn't available, use `null`
- Provide confidence level: "high", "medium", "low", "estimated", "unknown"
- List ALL sources you consulted
- Note any discrepancies between sources
- Include helpful notes about limitations or caveats
```

### Batch Research (All 10 Communities)

```markdown
I need you to research comprehensive data for ALL 10 retirement communities in Connecticut.

## Communities List:
1. Brookdale Chatfield - West Hartford, CT
2. Brookdale West Hartford - West Hartford, CT
3. Avery West Hartford - West Hartford, CT
4. Avery Heights - Hartford, CT
5. The McAuley - West Hartford, CT
6. Farmington Station - Farmington, CT
7. Middlewoods of Farmington - Farmington, CT
8. Duncaster - Bloomfield, CT
9. Seabury - Bloomfield, CT
10. River Ridge at Avon - Avon, CT

## Research Process:

For EACH community above:

1. **Search & Find**: Use web search to find official website
2. **Read & Extract**: Visit website and extract key information
3. **Review Research**: Find Google Reviews ratings
4. **Pricing Search**: Search for cost/pricing information
5. **Cross-Reference**: Verify info across multiple sources
6. **Structure Data**: Format findings as JSON (see format below)

Work through them **one at a time**, providing complete research for each before moving to the next.

## Data to Collect for Each:
- Official website, phone, address
- Description (2-3 compelling sentences)
- Community type
- Resident count (estimate ok)
- Google Reviews rating
- Monthly cost range
- Care levels available
- Housing options available
- 10-15 key amenities
- Confidence ratings for each field
- All source URLs

## Output Format:

For each community, provide JSON in this exact format:

```json
{
  "name": "",
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

## Important:
- Be thorough but efficient
- Use web search for each community
- Cross-reference multiple sources
- Provide confidence levels honestly
- Document all sources
- Note any data limitations

Please start with Community #1 and work through all 10.
```

---

## Expected Output Format

### Complete JSON Structure

```json
{
  "name": "Brookdale Chatfield",
  "description": "A vibrant independent living community in West Hartford offering resort-style amenities, elegant apartment homes, and an active lifestyle with numerous social activities and wellness programs.",
  "community_type": "Independent Living",
  "resident_count": 120,
  "star_rating": 4.0,
  "monthly_cost_min": 3500,
  "monthly_cost_max": 5500,
  "phone": "(860) 231-9777",
  "website": "https://www.brookdale.com/en/communities/brookdale-chatfield.html",
  "care_levels": [
    "Independent Living"
  ],
  "housing_options": [
    "Studio",
    "One-bedroom apartment",
    "Two-bedroom apartment"
  ],
  "amenities": [
    "Fitness Center",
    "Fine Dining Restaurant",
    "Bistro Cafe",
    "Beauty Salon & Barber Shop",
    "Movie Theater",
    "Library",
    "Arts & Crafts Studio",
    "Game Room",
    "Outdoor Walking Trails",
    "Scheduled Transportation",
    "24-Hour Emergency Response",
    "Housekeeping Services",
    "Social Activities & Events",
    "Wellness Programs"
  ],
  "data_confidence": {
    "pricing": "medium",
    "amenities": "high",
    "resident_count": "estimated",
    "care_levels": "confirmed",
    "housing_options": "confirmed"
  },
  "sources": [
    "Official Brookdale Website: https://www.brookdale.com/en/communities/brookdale-chatfield.html",
    "Google Reviews: 4.0 stars (156 reviews)",
    "A Place for Mom: https://www.aplaceformom.com/...",
    "Caring.com Reviews"
  ],
  "notes": "Pricing varies by apartment size and floor plan. Listed range is estimated based on online sources - call for current accurate pricing. Community is part of the larger Brookdale Senior Living network."
}
```

### Field Definitions

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `name` | string | Official community name | Yes |
| `description` | string | 2-3 sentence description | Yes |
| `community_type` | string | Primary type of care | Yes |
| `resident_count` | number | Approximate # of residents | Optional |
| `star_rating` | number | Google rating (0-5) | Optional |
| `monthly_cost_min` | number | Minimum monthly cost | Optional |
| `monthly_cost_max` | number | Maximum monthly cost | Optional |
| `phone` | string | Main phone number | Yes |
| `website` | string | Official website URL | Yes |
| `care_levels` | array | List of care types offered | Yes |
| `housing_options` | array | Available unit types | Yes |
| `amenities` | array | List of amenities/services | Yes |
| `data_confidence` | object | Confidence per field | Yes |
| `sources` | array | List of source URLs | Yes |
| `notes` | string | Important caveats/notes | Optional |

---

## Quality Assurance

### Confidence Levels Explained

#### High Confidence
- Information found on official website
- Consistent across multiple sources
- Recently updated (within 6 months)
- Specific and detailed

**Examples:**
- Amenities list from official website
- Care levels explicitly stated
- Contact information

#### Medium Confidence
- Found online but not on official site
- Some variation between sources
- May not be current
- General rather than specific

**Examples:**
- Pricing ranges (often outdated online)
- Housing options (may not list all types)
- Resident count from third-party sites

#### Low Confidence / Estimated
- Only found on third-party sites
- Conflicting information
- Clearly outdated
- Inferred from context

**Examples:**
- Resident count estimates
- Older pricing information
- Amenities from reviews rather than official sources

### Verification Checklist

After receiving Claude's research, verify:

#### Must Verify by Phone:
- [ ] Current monthly pricing
- [ ] Entrance fees
- [ ] Current availability
- [ ] Recent renovations or changes

#### Can Verify Online:
- [ ] Website URL loads correctly
- [ ] Phone number format is correct
- [ ] Google Reviews rating is accurate
- [ ] Address matches Google Maps

#### Can Accept As-Is:
- [ ] Amenities list (comprehensive enough)
- [ ] Care levels (if confirmed)
- [ ] Housing options (if confirmed)
- [ ] Description (accurate enough)

---

## Database Update Process

### Option 1: Manual Update via Supabase Dashboard

**Best for:** Small batches (1-3 communities)

1. Log into Supabase Dashboard
2. Navigate to Table Editor → communities
3. Find the community row by name
4. Click Edit
5. Paste each field from JSON
6. Click Save
7. Verify in the app UI

**Pros:**
- Safest approach
- Easy to verify each field
- Can review before saving

**Cons:**
- Time-consuming for many communities
- Manual copy-paste prone to errors

### Option 2: SQL Update Script

**Best for:** Medium batches (4-7 communities)

1. Generate SQL from JSON:

```sql
UPDATE communities
SET
  description = 'A vibrant independent living community...',
  community_type = 'Independent Living',
  resident_count = 120,
  star_rating = 4.0,
  monthly_cost_min = 3500,
  monthly_cost_max = 5500,
  phone = '(860) 231-9777',
  website = 'https://www.brookdale.com/...',
  care_levels = ARRAY['Independent Living'],
  housing_options = ARRAY['Studio', 'One-bedroom apartment', 'Two-bedroom apartment'],
  amenities = ARRAY['Fitness Center', 'Fine Dining Restaurant', 'Beauty Salon', '...'],
  updated_at = NOW()
WHERE name = 'Brookdale Chatfield';
```

2. Review the SQL
3. Run in Supabase SQL Editor
4. Verify updates in app

**Pros:**
- Faster than manual
- Can review SQL before executing
- Easy to undo if needed

**Cons:**
- Need to convert JSON to SQL
- Must be careful with syntax

### Option 3: Bulk API Update Script

**Best for:** Large batches (8-10 communities)

Create a Node.js script:

```javascript
// bulk-update.js
import { createClient } from '@supabase/supabase-js'
import communitiesData from './research-results.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function updateCommunities() {
  for (const community of communitiesData) {
    const { name, ...updates } = community

    // Remove confidence and sources fields (not in DB)
    delete updates.data_confidence
    delete updates.sources
    delete updates.notes

    const { data, error } = await supabase
      .from('communities')
      .update(updates)
      .eq('name', name)

    if (error) {
      console.error(`Error updating ${name}:`, error)
    } else {
      console.log(`✓ Updated ${name}`)
    }
  }

  console.log('All communities updated!')
}

updateCommunities()
```

Run:
```bash
node bulk-update.js
```

**Pros:**
- Fastest approach
- Consistent updates
- Easy to re-run if needed

**Cons:**
- Requires script setup
- Less visibility into individual updates
- Need to test first

### Recommended Approach

**For your 10 communities:**

1. **Research Phase**: Use Claude to research all 10
2. **Review Phase**: Review JSON output for each
3. **Test Update**: Manually update 1-2 communities via Dashboard
4. **Bulk Update**: Create SQL script for remaining 8
5. **Verification**: Check all communities in the app UI

---

## Timeline & Resources

### Time Estimates

#### With Claude Research:

| Phase | Time | Description |
|-------|------|-------------|
| Research Setup | 5 min | Prepare prompt and community list |
| Claude Research | 1-2 hours | Claude researches all 10 communities |
| Review & Validate | 30-45 min | Review JSON output, note corrections |
| Phone Verification | 1-2 hours | Call to verify pricing (optional but recommended) |
| Database Updates | 30 min | Update Supabase with all data |
| UI Testing | 15 min | Verify all data displays correctly |
| **Total** | **3-5 hours** | Complete data population |

#### Without Claude Research:

| Phase | Time |
|-------|------|
| Manual Research | 10-20 hours |
| Data Entry | 2-3 hours |
| Verification | 2-3 hours |
| **Total** | **14-26 hours** |

### Cost Breakdown

| Approach | Cost |
|----------|------|
| Claude Research (this conversation) | $0 |
| Claude API (if automating) | ~$30-50 |
| Phone calls for verification | ~$0 (cell phone) |
| **Total** | **$0-50** |

### Required Resources

#### Tools:
- ✅ Claude (this conversation)
- ✅ Supabase account
- ✅ Your retirement app (running locally)
- ⚠️ Phone (for price verification - optional)

#### Access Needed:
- ✅ Supabase Dashboard access
- ✅ SQL Editor permissions
- ✅ API keys (already configured)

#### Skills Required:
- Basic JSON understanding
- Supabase Dashboard navigation
- Copy-paste abilities
- (Optional) Basic SQL knowledge

---

## Success Criteria

### Must Have (Required for Launch):
- [ ] All 10 communities have descriptions
- [ ] All have accurate contact information (phone, website)
- [ ] All have community type specified
- [ ] All have at least 8 amenities listed
- [ ] All have care levels identified
- [ ] All have housing options listed

### Should Have (Highly Recommended):
- [ ] 8+ communities have pricing information
- [ ] 8+ communities have Google ratings
- [ ] 8+ communities have resident counts
- [ ] All data is less than 6 months old

### Nice to Have (Future Enhancement):
- [ ] All pricing verified by phone within 30 days
- [ ] Community images added
- [ ] Additional photos in gallery
- [ ] Reviews/testimonials included

---

## Next Steps

### Immediate Actions:

1. **Choose Approach:**
   - [ ] Test with 1 community
   - [ ] Research 3-4 communities
   - [ ] Research all 10 at once

2. **Prepare:**
   - [ ] Review this documentation
   - [ ] Have Supabase Dashboard open
   - [ ] Have app running locally

3. **Execute:**
   - [ ] Use prompt template to ask Claude to research
   - [ ] Review JSON output
   - [ ] Update database
   - [ ] Verify in UI

4. **Iterate:**
   - [ ] Make corrections as needed
   - [ ] Add missing information
   - [ ] Phone verify pricing (optional)

### Long-term Maintenance:

- [ ] Update data every 3-6 months
- [ ] Add new communities as they open
- [ ] Keep pricing current
- [ ] Monitor Google Reviews for changes

---

## Appendix: Example Research Output

### Sample Claude Research Response

```markdown
I've completed research on Brookdale Chatfield. Here's what I found:

**Official Website**: https://www.brookdale.com/en/communities/brookdale-chatfield.html
**Google Reviews**: 4.0 stars (156 reviews)

### Key Findings:
- Independent living community in West Hartford
- Focuses on active lifestyle and socialization
- Part of Brookdale Senior Living network
- Offers studio, 1BR, and 2BR apartments
- Pricing not listed online - requires contact

### Confidence Levels:
- Amenities: HIGH (detailed list on website)
- Care Levels: HIGH (explicitly states independent living only)
- Pricing: MEDIUM (estimated from third-party sites)
- Resident Count: LOW (estimated from facility size)

Here's the structured JSON output:

[JSON data follows...]
```

---

## Document Version

**Version**: 1.0
**Last Updated**: January 2025
**Author**: Claude with Tom Suharto
**Status**: Ready for Use

---

## Questions or Issues?

If you encounter any issues during the research process:

1. **Claude can't find information**: Some communities have limited online presence - note this and plan to call
2. **Conflicting data**: Note discrepancies and verify with phone call
3. **Outdated information**: Mark with low confidence and verify
4. **Missing pricing**: Very common - just note "Call for pricing"

**Remember**: It's better to have accurate, incomplete data than complete, inaccurate data. Always mark confidence levels honestly.
