# Research Instructions vs Database Schema - Alignment Audit

## Executive Summary

**Status**: ⚠️ Mostly aligned, but with some gaps

**Key Finding**: Research instructions capture most needed data, but missing a few fields and could be more specific about data formatting.

---

## Complete Field Comparison

### Database Schema (from types.ts)

| Field | Type | Research Captures? | Notes |
|-------|------|-------------------|-------|
| **id** | string | ❌ No (auto-generated) | ✅ Correct - DB handles this |
| **name** | string | ✅ Yes | ✅ Covered |
| **location** | string | ⚠️ Partial | Gets city, but field expects just city name |
| **address** | string (optional) | ⚠️ Partial | Research gets it, but not in JSON template |
| **latitude** | number | ❌ No | ❌ **GAP** - Not in research instructions |
| **longitude** | number | ❌ No | ❌ **GAP** - Not in research instructions |
| **distance_miles** | number (optional) | ❌ No | ✅ OK - Calculated from lat/long |
| **drive_time_minutes** | number (optional) | ❌ No | ✅ OK - Calculated from lat/long |
| **star_rating** | number (optional) | ✅ Yes | ✅ Covered |
| **resident_count** | number (optional) | ✅ Yes | ✅ Covered |
| **visited** | boolean | ❌ No | ✅ OK - User sets this |
| **compare_selected** | boolean | ❌ No | ✅ OK - User sets this |
| **community_type** | string (optional) | ✅ Yes | ✅ Covered |
| **monthly_cost_min** | number (optional) | ✅ Yes | ✅ Covered |
| **monthly_cost_max** | number (optional) | ✅ Yes | ✅ Covered |
| **amenities** | string[] (optional) | ✅ Yes | ✅ Covered |
| **description** | string (optional) | ✅ Yes | ✅ Covered |
| **phone** | string (optional) | ✅ Yes | ✅ Covered |
| **website** | string (optional) | ✅ Yes | ✅ Covered |
| **image_url** | string (optional) | ❌ No | ⚠️ Future enhancement |
| **created_at** | string (optional) | ❌ No | ✅ OK - DB handles this |
| **updated_at** | string (optional) | ❌ No | ✅ OK - DB handles this |
| **care_levels** | string[] (optional) | ✅ Yes | ✅ Covered |
| **housing_options** | string[] (optional) | ✅ Yes | ✅ Covered |
| **review_first_year_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_affordability_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_care_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_housing_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_community_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_overall_rating** | number (optional) | ❌ No | ✅ OK - User fills this |
| **review_pros** | string (optional) | ❌ No | ✅ OK - User fills this |
| **review_cons** | string (optional) | ❌ No | ✅ OK - User fills this |
| **review_notes** | string (optional) | ❌ No | ✅ OK - User fills this |

---

## Critical Gaps Found

### 🚨 GAP #1: Address Field

**Database Schema:**
```typescript
location: string        // "Bloomfield"
address?: string        // "40 Loeffler Road, Bloomfield, CT 06002"
```

**Research Template:**
```json
{
  "name": "",
  "description": "",
  // ... but no "address" field!
}
```

**Impact:** We're getting addresses during research but not capturing them in structured format.

**For Duncaster:**
- ✅ Found: "40 Loeffler Road, Bloomfield, Connecticut"
- ❌ Not included in JSON output
- ⚠️ Currently showing just "Bloomfield" in location field

**Fix Needed:** Add `address` field to research JSON template.

---

### 🚨 GAP #2: Latitude/Longitude

**Database Schema:**
```typescript
latitude: number   // Required!
longitude: number  // Required!
```

**Research Instructions:** Don't mention getting coordinates at all.

**Current Situation:**
- Database already has lat/long for all 10 communities
- Research doesn't need to find these
- ✅ OK to leave as-is

**BUT:** If adding NEW communities in future, need process to get coordinates.

**Solution Options:**
1. Keep existing lat/long (don't change)
2. For new communities: Use Google Maps Geocoding API
3. Manual lookup on Google Maps

**Recommendation:** ✅ Don't change existing coordinates, add note to research docs about handling new communities.

---

## JSON Template Comparison

### Current Research Template:
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
  "data_confidence": {...},
  "sources": [],
  "notes": ""
}
```

### Should Be (Database-Aligned):
```json
{
  "name": "",
  "location": "",           // ← City only (e.g., "Bloomfield")
  "address": "",            // ← MISSING! Full address
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

  // Research metadata (not in DB)
  "data_confidence": {...},
  "sources": [],
  "notes": ""
}
```

---

## Site Architecture Alignment

### Community Card (List View)

**Shows:**
- ✅ Name - researched
- ✅ Location - researched (city)
- ✅ Community Type - researched
- ✅ Distance/Drive time - from DB (lat/long)
- ✅ Star Rating - researched
- ✅ Resident Count - researched
- ✅ Phone - researched
- ✅ Price Range - researched
- ✅ Top 3-4 Amenities - researched
- ✅ Visited status - user set

**Coverage:** ✅ 100% of displayed fields are researched or user-managed

---

### Detail Page - Overview Section

**Shows:**
- ✅ Name - researched
- ✅ Address/Location - ⚠️ **ISSUE**: Shows city, but could show full address
- ✅ Distance/Drive time - from DB
- ✅ Description - researched
- ✅ Google Reviews - researched
- ✅ Community Type - researched
- ✅ Population - researched
- ✅ Contact - researched
- ✅ Website link - researched

**Coverage:** 90% - Missing full address display

---

### Detail Page - Care Section

**Shows:**
- ✅ Care Levels badges - researched

**Coverage:** ✅ 100%

---

### Detail Page - Housing Section

**Shows:**
- ✅ Housing Options badges - researched

**Coverage:** ✅ 100%

---

### Detail Page - Community Section

**Shows:**
- ✅ Amenities badges - researched

**Coverage:** ✅ 100%

---

### Detail Page - Financials Section

**Shows:**
- ✅ Monthly Cost Range - researched

**Could Show (Not in research):**
- ⚠️ Entrance fees
- ⚠️ What's included in cost
- ⚠️ Additional fees

**Coverage:** 100% of what's implemented, but room for enhancement

---

## Data Format Alignment

### ✅ Aligned Correctly:

| Field | Research Format | DB Format | Match? |
|-------|----------------|-----------|--------|
| name | string | string | ✅ |
| description | string | string | ✅ |
| community_type | string | string | ✅ |
| phone | string "(860) 726-2000" | string | ✅ |
| website | string URL | string | ✅ |
| star_rating | number (0-5) | number | ✅ |
| resident_count | number | number | ✅ |
| monthly_cost_min | number | number | ✅ |
| monthly_cost_max | number | number | ✅ |
| care_levels | string[] | string[] | ✅ |
| housing_options | string[] | string[] | ✅ |
| amenities | string[] | string[] | ✅ |

---

## Research Instructions Quality Check

### What's Working Well:

1. ✅ **Care Levels**: Lists all possible options clearly
2. ✅ **Housing Options**: Lists all possible types
3. ✅ **Amenities**: Open-ended, captures unique features
4. ✅ **Pricing**: Clearly asks for min/max range
5. ✅ **Contact Info**: Gets phone and website
6. ✅ **Description**: Requests compelling 2-3 sentences
7. ✅ **Data Confidence**: Good metadata for quality assessment

### What Needs Improvement:

1. ❌ **Missing Address Field** in JSON template
2. ⚠️ **Location vs Address** confusion - need clarification
3. ⚠️ **Star Rating Source** - should specify "Google Reviews rating"
4. ⚠️ **Community Type** - could provide examples to ensure consistency
5. ⚠️ **Amenity Standardization** - no guidance on naming conventions

---

## Specific Issues Found in Duncaster Research

### Issue 1: Location vs Address

**Research Found:**
- Location: "Bloomfield, Connecticut"
- Address: "40 Loeffler Road, Bloomfield, CT 06002"

**Database Has:**
- `location`: "Bloomfield"
- `address`: (not captured)

**What Should Happen:**
- `location`: "Bloomfield" (city only)
- `address`: "40 Loeffler Road, Bloomfield, CT 06002" (full address)

### Issue 2: Phone Number Format

**Research Output:** "(860) 726-2000" ✅ Good
**Database:** "(860) 555-0129" (placeholder)

**Consistency:** ✅ Format matches, just need to update value

### Issue 3: Amenity Names

**Research Output:**
- "Indoor Heated Lap Pool"
- "Fitness Center with Personal Trainer"
- "94 Acres of Grounds & Walking Trails"

**Database Pattern:** Mostly short names
- "Pool"
- "Fitness Center"
- "Golf"

**Issue:** Inconsistent detail level

**Recommendation:**
- ✅ Use descriptive names from research (they're better!)
- Update existing entries to match detail level
- Add style guide for future research

---

## Recommendations

### Immediate Fixes (For Next Research):

1. **Update JSON Template:**
```json
{
  "name": "Community Name",
  "location": "City",              // ← ADD THIS
  "address": "Full Street Address", // ← ADD THIS
  "description": "...",
  "community_type": "CCRC",
  "resident_count": 340,
  "star_rating": 5.0,              // ← Specify "Google Reviews rating"
  "monthly_cost_min": 4500,
  "monthly_cost_max": 9200,
  "phone": "(860) 726-2000",
  "website": "https://example.com",
  "care_levels": [...],
  "housing_options": [...],
  "amenities": [...]
}
```

2. **Clarify Instructions:**
   - Specify "Google Reviews rating" (not other review sites)
   - Provide amenity naming examples (descriptive vs. short)
   - Clarify location = city only, address = full street address

3. **Add Amenity Style Guide:**
```
✅ Good: "Indoor Heated Lap Pool"
❌ Avoid: "Pool"

✅ Good: "Fitness Center with Personal Trainer"
❌ Avoid: "Gym"

✅ Good: "Restaurant-Style Dining"
❌ Avoid: "Food"
```

### Medium-term Enhancements:

4. **Add to Research (Optional):**
   - Entrance fee range (for CCRCs)
   - What's included in monthly cost
   - Year established
   - Awards/certifications
   - Parent company

5. **Add to Database Schema (Future):**
```typescript
interface Community {
  // ... existing fields ...

  // Additional details
  year_established?: number
  entrance_fee_min?: number
  entrance_fee_max?: number
  whats_included?: string[]
  awards?: string[]
  parent_company?: string
}
```

---

## Updated Research Prompt Template

### Improved Version:

```markdown
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
```

---

## Final Assessment

### Research Coverage Score: 85/100

**Strengths:**
- ✅ Captures all essential fields
- ✅ Good data confidence tracking
- ✅ Multiple source verification
- ✅ Structured output format

**Gaps:**
- ❌ Missing address field in template (5 points)
- ⚠️ No amenity naming standards (5 points)
- ⚠️ No lat/long guidance for new communities (5 points)

### Database Alignment Score: 90/100

**Strengths:**
- ✅ Research matches 90% of DB fields
- ✅ Data types align correctly
- ✅ Array fields handled properly

**Gaps:**
- ❌ Address not captured (5 points)
- ⚠️ No guidance for new community coordinates (5 points)

### Site Architecture Alignment Score: 95/100

**Strengths:**
- ✅ All displayed fields are researched
- ✅ Card view 100% covered
- ✅ Detail page 95% covered

**Gaps:**
- ⚠️ Could display full address (not just city) (5 points)

---

## Action Items

### Before Next Research Session:

- [ ] Update research JSON template to include `location` and `address`
- [ ] Add amenity naming style guide to instructions
- [ ] Clarify Google Reviews vs other review sites
- [ ] Add examples for community_type consistency

### For Duncaster Update:

- [ ] Include full address: "40 Loeffler Road, Bloomfield, CT 06002"
- [ ] Use descriptive amenity names from research
- [ ] Keep existing lat/long (don't change)

### Documentation:

- [ ] Update CLAUDE-RESEARCH-WORKFLOW.md with address field
- [ ] Update DOCS-RESEARCH-APPROACH.md with improved template
- [ ] Add amenity naming guide to docs

---

## Conclusion

**Overall Status:** ⚠️ **Mostly Aligned with Minor Gaps**

The research instructions capture **85-90% of needed data** effectively. The main gaps are:
1. Address field not in JSON template
2. Amenity naming inconsistency
3. No clear guidance for new community coordinates

**These are easy fixes** that can be addressed before researching the remaining 9 communities.

**Recommendation:** Update the research template now, then proceed with updating Duncaster and researching the other communities.
