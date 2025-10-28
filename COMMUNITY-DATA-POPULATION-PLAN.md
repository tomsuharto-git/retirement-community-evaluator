# Community Data Population Plan

## Overview
Use Claude (via API or manual process) to research and populate accurate data for each retirement community in Connecticut.

## Current Communities (10 Total)
1. Brookdale Chatfield - West Hartford
2. Brookdale West Hartford - West Hartford
3. Avery West Hartford - West Hartford
4. Avery Heights - Hartford
5. The McAuley - West Hartford
6. Farmington Station - Farmington
7. Middlewoods of Farmington - Farmington
8. Duncaster - Bloomfield
9. Seabury - Bloomfield
10. River Ridge at Avon - Avon

## Data Fields to Populate

### Basic Information (Already Have)
- ✅ Name
- ✅ Location/Address
- ✅ Latitude/Longitude
- ✅ Distance/Drive time from home
- ⚠️ Phone (may need verification)

### Information to Research & Add

#### 1. Community Details
- **Description** (2-3 sentences about the community)
- **Community Type** (Independent Living, Assisted Living, Memory Care, Continuing Care, etc.)
- **Resident Count** (approximate number of residents)
- **Star Rating** (from Google Reviews)
- **Website URL**

#### 2. Financial Information
- **Monthly Cost Range** (min and max)
- **Entrance Fees** (if applicable)
- **What's Included** in the cost
- **Additional Fees** to be aware of

#### 3. Care Levels Available
Choose from:
- Independent Living
- Assisted Living
- Memory Care
- Skilled Nursing
- Rehabilitation Care
- Respite Care
- Hospice Care

#### 4. Housing Options
Choose from:
- Studio
- One-bedroom apartment
- Two-bedroom apartment
- Villa
- Cottage
- Townhome
- Memory care apartment

#### 5. Amenities (Community Features)
Examples:
- Fitness Center
- Pool (Indoor/Outdoor)
- Dining Options
- Transportation Services
- Library
- Theater/Movie Room
- Art Studio
- Game Room
- Salon/Spa
- Café/Bistro
- Gardens/Walking Trails
- Golf Course
- Activities/Events
- Pet-Friendly
- Etc.

#### 6. Images
- **Hero Image** (main community photo)
- **Additional Photos** (optional: gallery of 4-6 images)

## Implementation Approaches

### Approach 1: Manual Research + Claude Assistance (Recommended)
**Best for: Accuracy and control**

#### Step 1: Research Each Community
For each community:
1. Visit official website
2. Check Google Maps/Reviews
3. Look at third-party senior living sites (A Place for Mom, Caring.com, etc.)
4. Check local news/articles

#### Step 2: Use Claude to Summarize
Create a prompt template:
```
I'm researching [COMMUNITY NAME] in [LOCATION], Connecticut.

Based on the following information from their website and reviews:
[PASTE WEBSITE CONTENT]
[PASTE REVIEWS]

Please provide:
1. A 2-3 sentence description
2. Community type(s)
3. Approximate resident count (if mentioned)
4. Monthly cost range (if mentioned)
5. List of care levels available
6. List of housing options available
7. List of 10-15 key amenities
8. Any other notable features

Format the response as JSON that matches our Community type.
```

#### Step 3: Manual Data Entry
- Copy Claude's response
- Review for accuracy
- Update Supabase directly via SQL or through a data entry form

### Approach 2: Web Scraping + Claude API (Automated)
**Best for: Speed and scale (if expanding beyond 10 communities)**

#### Components Needed:
1. **Web Scraper** (Playwright or Puppeteer)
   - Scrape official websites
   - Scrape Google Reviews
   - Scrape third-party aggregator sites

2. **Claude API Integration**
   - Send scraped content to Claude
   - Ask Claude to extract and structure data
   - Validate and format response

3. **Data Pipeline**
   - Validate extracted data
   - Transform to match database schema
   - Bulk update Supabase

#### Implementation Steps:
```typescript
// Pseudo-code for automation
async function populateCommunityData(communityName: string) {
  // 1. Scrape data
  const websiteData = await scrapeWebsite(communityUrl)
  const googleReviews = await scrapeGoogleReviews(communityName)

  // 2. Send to Claude API
  const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Extract structured data from this retirement community information: ${websiteData}`
      }]
    })
  })

  // 3. Parse and validate
  const structuredData = parseClaudeResponse(claudeResponse)

  // 4. Update database
  await supabase
    .from('communities')
    .update(structuredData)
    .eq('name', communityName)
}
```

### Approach 3: Hybrid Approach (Recommended for 10 communities)
**Best balance of speed and accuracy**

#### Process:
1. **Automated Data Gathering**
   - Use Playwright to visit each community's website
   - Scrape basic info, amenities lists, pricing pages
   - Capture screenshots for review

2. **Claude-Assisted Extraction**
   - Feed scraped content to Claude (via API or chat)
   - Claude extracts and structures data
   - Returns JSON matching our schema

3. **Manual Review & Refinement**
   - Review Claude's output for each community
   - Make corrections where needed
   - Add missing information from direct calls to communities

4. **Bulk Update**
   - Create a JSON file with all community data
   - Write a script to bulk update Supabase

## Recommended Workflow (Step-by-Step)

### Phase 1: Data Collection (Day 1)
For each of the 10 communities:
1. Visit official website → Save key pages as PDF
2. Check Google Maps → Screenshot reviews and rating
3. Visit A Place for Mom / Caring.com → Screenshot details
4. Create a folder per community with all collected data

### Phase 2: Claude Processing (Day 1-2)
1. Create a structured prompt template
2. For each community, feed collected data to Claude
3. Ask Claude to output structured JSON
4. Save each JSON response to a file

### Phase 3: Review & Validation (Day 2)
1. Review each community's data
2. Call communities directly to verify:
   - Current pricing
   - Available care levels
   - Current resident count
3. Make corrections to JSON files

### Phase 4: Database Update (Day 2)
1. Create a bulk update script
2. Test with 1-2 communities first
3. Bulk update all communities
4. Verify in the UI

## Sample Prompt Template

```markdown
# Community Data Extraction Task

I need you to help me populate a database for a retirement community in Connecticut.

## Community: [COMMUNITY NAME]
## Location: [ADDRESS]

## Source Information:
[PASTE WEBSITE CONTENT, REVIEWS, ETC.]

## Please extract and format the following as JSON:

{
  "description": "2-3 sentence description of the community",
  "community_type": "Primary type (Independent Living, Assisted Living, etc.)",
  "resident_count": estimated_number,
  "star_rating": google_rating_out_of_5,
  "monthly_cost_min": minimum_monthly_cost,
  "monthly_cost_max": maximum_monthly_cost,
  "phone": "phone_number",
  "website": "website_url",
  "care_levels": [
    "List of available care levels"
  ],
  "housing_options": [
    "List of available housing types"
  ],
  "amenities": [
    "List of 10-15 key amenities"
  ]
}

## Instructions:
- Be conservative with estimates
- If information is not available, use null
- For amenities, focus on the most important/unique features
- For pricing, look for both entrance fees and monthly costs
```

## Tools & Resources Needed

### Tools:
- Claude (API or chat interface)
- Playwright/Puppeteer (for web scraping)
- Google Maps API (for accurate ratings/reviews)
- Supabase CLI (for bulk updates)

### Resources:
- Official community websites
- Google Maps reviews
- Third-party sites:
  - A Place for Mom (aplaceformom.com)
  - Caring.com
  - SeniorLiving.org
  - SeniorHousingNet.com

### Budget Considerations:
- **Claude API**: ~$3-5 per community (with Claude 3.5 Sonnet)
  - Total for 10 communities: ~$30-50
- **Time**:
  - Manual: ~1-2 hours per community = 10-20 hours
  - Hybrid: ~30 min per community = 5 hours
  - Fully automated: ~10-15 hours setup + 1 hour run

## Deliverables

1. **Completed Community Data**
   - All 10 communities with complete information
   - Verified pricing and contact information
   - Accurate amenities lists

2. **Community Images**
   - Hero image for each community
   - Stored in Supabase Storage or external CDN

3. **Data Quality Report**
   - Confidence level for each data field
   - List of fields that need phone verification
   - Notes on any discrepancies found

## Next Steps

1. **Decide on Approach**
   - Choose: Manual, Automated, or Hybrid
   - Set timeline and budget

2. **Set Up Infrastructure** (if automating)
   - Set up Claude API key
   - Create scraping scripts
   - Test with 1 community

3. **Execute Data Collection**
   - Follow chosen workflow
   - Document any issues or challenges

4. **Quality Assurance**
   - Review all data in the UI
   - Test all external links
   - Verify phone numbers work

5. **Final Updates**
   - Make any necessary corrections
   - Add any missing information
   - Update timestamp fields

## Success Criteria

- ✅ All 10 communities have complete basic information
- ✅ At least 80% of optional fields are populated
- ✅ All pricing information is current (verified within last 30 days)
- ✅ All phone numbers and websites are functional
- ✅ Each community has at least 8 amenities listed
- ✅ Care levels and housing options are accurate
