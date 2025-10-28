# Claude Research Workflow for Community Data Population

## Overview
Use Claude's built-in web search and research capabilities to automatically gather and structure data for each retirement community.

## Claude's Research Capabilities

Claude can:
- ✅ Search the web for current information
- ✅ Visit and read website content
- ✅ Find reviews and ratings
- ✅ Cross-reference multiple sources
- ✅ Extract and structure data
- ✅ Verify information accuracy

## Recommended Workflow

### Step 1: Research Phase (Claude Does This)
For each community, Claude will:

1. **Web Search**
   - Search for "[Community Name] Connecticut retirement community"
   - Search for "[Community Name] pricing"
   - Search for "[Community Name] reviews"
   - Search for "[Community Name] amenities"

2. **Website Analysis**
   - Visit official website
   - Extract key information
   - Find pricing pages
   - Identify amenities and services

3. **Reviews & Ratings**
   - Find Google Reviews rating
   - Check third-party review sites
   - Note common themes in reviews

4. **Cross-Reference**
   - Compare information across sources
   - Flag any discrepancies
   - Note confidence level for each data point

### Step 2: Data Structuring (Claude Does This)
Claude will format all findings as JSON matching our database schema:

```json
{
  "name": "Community Name",
  "description": "2-3 sentence description",
  "community_type": "Independent Living",
  "resident_count": 120,
  "star_rating": 4.5,
  "monthly_cost_min": 3500,
  "monthly_cost_max": 5500,
  "phone": "(860) 555-0123",
  "website": "https://example.com",
  "care_levels": ["Independent Living", "Assisted Living"],
  "housing_options": ["Studio", "One-bedroom apartment", "Two-bedroom apartment"],
  "amenities": ["Fitness Center", "Dining", "Transportation", "Pool"],
  "data_confidence": {
    "pricing": "high",
    "amenities": "high",
    "resident_count": "estimated",
    "care_levels": "confirmed"
  },
  "sources": [
    "Official website: https://...",
    "Google Reviews: 4.5 stars (234 reviews)",
    "A Place for Mom: https://..."
  ]
}
```

### Step 3: Review Phase (You Do This)
You review Claude's findings and:
- ✅ Approve data
- ⚠️ Flag items for phone verification
- ❌ Correct any errors

### Step 4: Database Update (We Do Together)
- Generate SQL update statements
- Execute in Supabase
- Verify in the UI

## Detailed Research Prompt Template

Here's the exact prompt to use for each community:

```markdown
I need you to research and gather comprehensive data about a retirement community in Connecticut.

## Community to Research:
**Name**: [COMMUNITY NAME]
**Location**: [CITY], Connecticut

## Research Tasks:

### 1. Web Search & Website Analysis
Please search the web and visit the official website to find:
- Official website URL
- Complete address
- Phone number
- Description of the community (what makes it unique?)
- Type of community (Independent Living, Assisted Living, Memory Care, Continuing Care, etc.)

### 2. Pricing Information
Search for and find:
- Monthly cost range (minimum and maximum)
- What's included in the monthly cost
- Entrance fees (if applicable)
- Any other fees mentioned

### 3. Care Levels Available
Determine which care levels are offered:
- Independent Living
- Assisted Living
- Memory Care
- Skilled Nursing
- Rehabilitation Care
- Respite Care
- Hospice Care

### 4. Housing Options
Find what types of units are available:
- Studio
- One-bedroom apartment
- Two-bedroom apartment
- Villa
- Cottage
- Townhome
- Memory care apartment

### 5. Amenities & Features
List all amenities and services offered (aim for 10-15):
- Fitness facilities
- Dining options
- Transportation
- Social activities
- Healthcare services
- Recreational facilities
- Other unique features

### 6. Reviews & Ratings
Find:
- Google Reviews rating (out of 5)
- Number of reviews
- Common themes in reviews (positive and negative)

### 7. Additional Information
- Approximate number of residents
- Year established (if available)
- Any special certifications or awards

## Output Format:

Please provide your findings in this JSON format:

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
    "care_levels": "confirmed/inferred/unknown"
  },
  "sources": [],
  "notes": "Any important notes or caveats about the data"
}
```

## Important Instructions:
- Use web search to find current, accurate information
- Visit official websites when possible
- Cross-reference multiple sources for pricing
- If you can't find information, use null or mark as "unknown"
- Include your confidence level for each category
- List all sources you used
- Note any discrepancies between sources
```

## Automation Script

I can also create a script that batches multiple communities:

```markdown
I need you to research 10 retirement communities in Connecticut. For each community, gather comprehensive data.

## Communities to Research:
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

For EACH community, please:
1. Search the web for their official website
2. Research pricing, amenities, care levels, and housing options
3. Find Google Reviews ratings
4. Structure the data in JSON format

Work through them one at a time, and provide complete research for each before moving to the next.

Use the same JSON format and data fields as specified in the template above.
```

## Expected Results

For each community, Claude should provide:

### High Confidence Data:
- Official website URL
- Phone number
- Address
- Community type
- Key amenities
- Available care levels

### Medium Confidence Data:
- Pricing ranges (often requires calling for exact pricing)
- Housing options (may not list all types online)
- Star ratings

### Low Confidence / Requires Verification:
- Exact resident count (rarely published)
- Current availability
- Specific entrance fees
- Recent changes or updates

## Quality Assurance

After Claude's research, verify:

### Critical Fields (Must Call to Verify):
- [ ] Current monthly pricing
- [ ] Entrance fees
- [ ] Current availability
- [ ] Any recent changes

### Can Verify Online:
- [ ] Website URL works
- [ ] Phone number is correct
- [ ] Google Reviews rating matches
- [ ] Amenities list is comprehensive

## Advantages of Using Claude's Research

1. **Speed**: Can research all 10 communities in one session
2. **Comprehensive**: Searches multiple sources automatically
3. **Current**: Gets latest information from the web
4. **Structured**: Returns data in our exact format
5. **Sourced**: Provides references for verification
6. **Intelligent**: Can infer missing information from context

## Workflow Example

### You Ask:
"Research Brookdale Chatfield in West Hartford, Connecticut and provide comprehensive community data"

### Claude Does:
1. Searches "Brookdale Chatfield West Hartford Connecticut"
2. Visits official Brookdale website
3. Searches "Brookdale Chatfield reviews"
4. Searches "Brookdale Chatfield pricing"
5. Searches "Brookdale Chatfield amenities"
6. Cross-references information
7. Structures data as JSON
8. Provides confidence ratings

### You Get:
- Complete JSON ready to insert into database
- Source links for verification
- Confidence levels for each field
- Notes about any gaps or uncertainties

## Next Steps

**Option A: One-by-One (Thorough)**
- Start with one community
- Let Claude research it completely
- Review and approve
- Update database
- Repeat for remaining 9

**Option B: Batch Research (Faster)**
- Ask Claude to research all 10 at once
- Review all findings together
- Make corrections as needed
- Bulk update database

**Option C: Hybrid (Recommended)**
- Ask Claude to research 3-4 communities at a time
- Review each batch
- Update database in batches
- Ensures quality while maintaining speed

## Time Estimate

With Claude's research capabilities:
- **Research Phase**: ~5-10 minutes per community (Claude does this)
- **Review Phase**: ~5 minutes per community (you verify)
- **Update Phase**: ~5 minutes total (bulk update)

**Total**: 2-3 hours for all 10 communities (vs 10-20 hours manually)

## Cost

Using Claude's built-in research in this conversation:
- **Cost**: Included in your Claude subscription
- **No additional API fees needed**

## Ready to Start?

Would you like to:
1. **Test with one community** - See the full research process
2. **Batch 3-4 communities** - Get a good sample
3. **Do all 10 at once** - Complete the full dataset

Just let me know which community you'd like to start with, or say "start with all 10" and I'll begin researching!
