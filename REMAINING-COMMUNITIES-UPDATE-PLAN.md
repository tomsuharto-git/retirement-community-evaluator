# Remaining Communities Update Plan

## Status Overview

### ✅ Completed (2/10):
1. **Duncaster** - Bloomfield (6.1 miles)
2. **Seabury** - Bloomfield (6.2 miles)

### 🔄 To Research (8/10):
3. **Brookdale Chatfield** - West Hartford (2.1 miles) ⭐ Closest
4. **Brookdale West Hartford** - West Hartford (2.4 miles)
5. **Avery West Hartford** - West Hartford (2.7 miles)
6. **Avery Heights** - Hartford (2.7 miles)
7. **The McAuley** - West Hartford (3.2 miles)
8. **Farmington Station** - Farmington (4.3 miles)
9. **Middlewoods of Farmington** - Farmington (5.4 miles)
10. **River Ridge at Avon** - Avon (7.8 miles) ⭐ Farthest

---

## Research Template Checklist

For each community, gather the following information:

### ✅ Basic Information
- [ ] Official name
- [ ] Full street address
- [ ] Phone number (real, not placeholder)
- [ ] Official website URL
- [ ] Year established (if available)

### ✅ Community Classification
- [ ] Community type (Independent Living, Assisted Living, Memory Care, CCRC, etc.)
- [ ] Resident count (approximate)
- [ ] Google Reviews rating (1-5 stars)
- [ ] Awards or recognition
- [ ] Accreditations (CARF, Medicare/Medicaid, etc.)

### ✅ Financial Information (Critical)
- [ ] Monthly cost range (min - max)
- [ ] Financial plan types offered (Life Care, Fee-for-Service, etc.)
- [ ] Entrance fees (if applicable)
- [ ] What's included in monthly cost
- [ ] Contract types (if multiple options like Duncaster)
- [ ] Refundability terms

### ✅ Care Levels (Select all that apply)
- [ ] Independent Living
- [ ] Assisted Living
- [ ] Memory Care
- [ ] Skilled Nursing
- [ ] Rehabilitation Care
- [ ] Respite Care
- [ ] Hospice Care
- [ ] Other specialized care

### ✅ Housing Options
- [ ] Studio apartments
- [ ] One-bedroom apartments
- [ ] Two-bedroom apartments
- [ ] Apartments with den
- [ ] Villa
- [ ] Cottage
- [ ] Townhome
- [ ] Memory care apartments
- [ ] Other configurations

### ✅ Amenities (10-25 detailed amenities)
Use descriptive names:
- ✅ "Indoor Heated Lap Pool" not "Pool"
- ✅ "Fitness Center with Personal Trainer" not "Gym"
- Include unique/signature features
- Note size/scale (acres, number of clubs, etc.)

### ✅ Section Summaries (1-2 sentences each)

#### Financials Summary
- Payment structure and contract types
- What's included, unique financial features
- Entrance fees and refundability

#### Care Summary
- Care philosophy and approach
- Key differentiators in care model
- Ratings, certifications, special programs

#### Housing Summary
- Style and types of housing
- Unique features of residences
- Setting, views, campus details

#### Community Summary
- Lifestyle and culture
- Activities, programs, social life
- Unique amenities or campus features

---

## Recommended Research Order

### Phase 1: West Hartford Cluster (Days 1-2)
**Why**: Closest to home, likely to visit first

1. **Brookdale Chatfield** (2.1 miles) - Priority #1
   - Closest community
   - Large Brookdale chain (easier to research)

2. **Brookdale West Hartford** (2.4 miles) - Priority #2
   - Same Brookdale chain (compare to Chatfield)
   - Memory care specialty

3. **Avery West Hartford** (2.7 miles) - Priority #3
   - Upscale independent living
   - West Hartford Center location

4. **The McAuley** (3.2 miles) - Priority #4
   - Assisted living focus
   - Religious affiliation (Sisters of Mercy)

### Phase 2: Hartford (Day 3)
5. **Avery Heights** (2.7 miles) - Priority #5
   - Full-service CCRC
   - Largest in Hartford area

### Phase 3: Farmington Cluster (Days 4-5)
6. **Farmington Station** (4.3 miles) - Priority #6
   - Luxury community with golf

7. **Middlewoods of Farmington** (5.4 miles) - Priority #7
   - Nature-focused community

### Phase 4: Avon (Day 6)
8. **River Ridge at Avon** (7.8 miles) - Priority #8
   - Riverside location
   - Farthest but unique setting

---

## Time Estimates

### Per Community:
- **Research**: 45-60 minutes
- **Data structuring**: 15 minutes
- **SQL creation**: 10 minutes
- **Verification**: 10 minutes
- **Total per community**: ~1.5-2 hours

### Total Project:
- **8 remaining communities × 1.5 hours** = ~12 hours
- **Spread over 6 days** = ~2 hours per day
- **Or 3 intensive days** = ~4 hours per day

---

## Research Workflow (Per Community)

### Step 1: Web Research (45-60 min)
1. Search official website
2. Search "[Community Name] Connecticut pricing"
3. Search "[Community Name] financial plans contracts"
4. Search "[Community Name] Google reviews"
5. Check third-party sites (A Place for Mom, Seniorly, etc.)
6. Look for awards, accreditations, year established

### Step 2: Data Compilation (15 min)
1. Create `[COMMUNITY-NAME]-RESEARCH.md`
2. Fill in all fields from template
3. Write 4 section summaries
4. Note data confidence levels
5. List sources

### Step 3: Structured Output (10 min)
1. Create `[community-name]-data.json`
2. Ensure all fields match database schema
3. Include section summaries
4. Add data confidence and sources

### Step 4: SQL Generation (10 min)
1. Create `supabase-update-[community-name].sql`
2. Include all fields
3. Add verification query
4. Test for syntax errors

### Step 5: Database Update & Verification (10 min)
1. Run SQL in Supabase
2. Check API endpoint for updated data
3. View detail page in browser
4. Verify summaries display correctly
5. Check amenities expand/collapse

---

## Special Considerations

### Brookdale Communities (Chatfield & West Hartford)
- **Chain communities**: Easier to research, standardized info
- **Likely similarities**: Compare to identify differences
- **Corporate pricing**: May be more transparent online
- **National brand**: Look for corporate resources

### Religious-Affiliated (The McAuley)
- **Mission-driven**: Emphasize values and philosophy
- **Charitable care**: May have financial assistance programs
- **Catholic affiliation**: Sisters of Mercy background

### Luxury Communities (Avery, Farmington Station)
- **Upscale amenities**: Concierge, fine dining, cultural programs
- **Higher price points**: Expect $6,000+ monthly
- **Location premium**: West Hartford Center, Golf course access

### Nature-Focused (Middlewoods, River Ridge)
- **Outdoor emphasis**: Trails, views, natural settings
- **Active lifestyle**: Outdoor recreation focus
- **Scenic locations**: River views, wooded areas

---

## Quality Standards

### Must Have for Each Community:
- ✅ Real phone number (not placeholder)
- ✅ Official website URL
- ✅ At least 10 detailed amenities
- ✅ Complete care levels list
- ✅ All 4 section summaries written
- ✅ Financial information (at minimum, monthly range)
- ✅ Specific, not generic descriptions

### Data Confidence Levels:
- **High**: Confirmed from official website or direct contact
- **Medium**: Cross-referenced from 2-3 third-party sources
- **Low/Estimated**: Single source or educated guess

### Summary Quality Check:
Ask for each summary:
1. Could this apply to ANY community? (If yes, rewrite)
2. Does it include specific details? (Numbers, names, features)
3. Does it tell a story about THIS community?
4. Is it 1-2 sentences (not too long)?

---

## Batch Processing Options

### Option A: One-by-One (Recommended)
- Research and complete each community fully
- Update database immediately
- Verify in UI before moving to next
- **Pros**: Thorough, immediate feedback, easier to track
- **Cons**: Takes full 12 hours spread over time

### Option B: Research All, Then Process
- Research all 8 communities first (6-8 hours)
- Create all data files in batch
- Update database in bulk
- **Pros**: Research momentum, pattern recognition
- **Cons**: Harder to track, delayed verification

### Option C: Cluster Batches (Hybrid)
- Research West Hartford cluster (4 communities)
- Process and update those 4
- Then Farmington cluster
- Then Avon
- **Pros**: Geographic grouping, manageable chunks
- **Cons**: Still requires dedicated time blocks

**Recommendation**: **Option C (Cluster Batches)** - Best balance of efficiency and quality control

---

## Documentation to Create

For each community:
1. `[COMMUNITY-NAME]-RESEARCH.md` - Full research report
2. `[community-name]-data.json` - Structured data
3. `supabase-update-[community-name].sql` - Database update script

Optional:
4. Comparison documents as patterns emerge
5. Summary document after all 10 complete

---

## Success Criteria

### Per Community:
- [ ] All database fields populated (no nulls except optional)
- [ ] 4 section summaries written and specific
- [ ] 10+ detailed amenities listed
- [ ] Real contact information verified
- [ ] Detail page displays correctly
- [ ] No generic filler text

### Overall Project:
- [ ] All 10 communities fully researched
- [ ] Consistent data quality across all
- [ ] All summaries are community-specific
- [ ] Financial information captured for all
- [ ] UI displays all communities properly
- [ ] Ready for user comparison shopping

---

## Tracking Progress

### Checklist Format:
```
Communities Research Status:
[✅] Duncaster - Complete (2025-10-24)
[✅] Seabury - Complete (2025-10-24)
[ ] Brookdale Chatfield - Not started
[ ] Brookdale West Hartford - Not started
[ ] Avery West Hartford - Not started
[ ] Avery Heights - Not started
[ ] The McAuley - Not started
[ ] Farmington Station - Not started
[ ] Middlewoods of Farmington - Not started
[ ] River Ridge at Avon - Not started

Progress: 2/10 (20%)
Estimated Time Remaining: ~12 hours
```

---

## Next Steps

### To Start:
1. ✅ Review this plan
2. Choose processing option (A, B, or C)
3. Block time for research sessions
4. Start with Brookdale Chatfield (closest, easiest)

### Command to Execute:
"Research Brookdale Chatfield in West Hartford, Connecticut following the updated research template. Include all financial plan details, 4 section summaries, and comprehensive amenities list."

---

## Files Already Created as Templates:
- ✅ `UPDATED-RESEARCH-TEMPLATE.md` - Research guidelines
- ✅ `DUNCASTER-RESEARCH.md` - Example research report
- ✅ `SEABURY-RESEARCH.md` - Example research report
- ✅ `duncaster-data.json` - Example structured data
- ✅ `seabury-data.json` - Example structured data
- ✅ `supabase-update-duncaster.sql` - Example SQL
- ✅ `supabase-update-seabury.sql` - Example SQL

---

## Estimated Completion Timeline

### Conservative (2 hours/day):
- **Days 1-2**: West Hartford cluster (4 communities)
- **Day 3**: Hartford (1 community)
- **Days 4-5**: Farmington cluster (2 communities)
- **Day 6**: Avon (1 community)
- **Total**: 6 days

### Aggressive (4 hours/day):
- **Day 1**: West Hartford cluster (4 communities)
- **Day 2**: Hartford + Farmington start (2 communities)
- **Day 3**: Farmington finish + Avon (2 communities)
- **Total**: 3 days

### Single Session (12 hours):
- **One marathon session**: All 8 communities
- **Recommended breaks**: Every 2 hours
- **Total**: 1 day (requires stamina)

---

## Ready to Begin!

**Next Command**:
> "Research Brookdale Chatfield following the complete template. Include financial plans, all amenities, and write specific section summaries."

Or specify your preferred processing option and I'll adjust the approach!
