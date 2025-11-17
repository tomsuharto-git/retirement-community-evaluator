# Retirement Communities - Relevant Documentation

Essential documentation for the CCRC Comparison Tool.

---

## Core Documentation (Read First)

- `.meridian/CODE_GUIDE.md` - Meridian patterns for Retirement Communities (590 lines)
- `database-taxonomy.md` - Database schema and taxonomy
- `v0-requirements-doc.md` - Original requirements and features
- `technical MVP.md` - MVP scope and technical decisions

## Data Structure & Research

- `CLAUDE-RESEARCH-WORKFLOW.md` - Research methodology for gathering community data
- `COMMUNITY-DATA-POPULATION-PLAN.md` - Plan for populating database
- `DOCS-RESEARCH-APPROACH.md` - Documentation and research approach

## Example Community Data

- `avery-heights-data.json` - Example community data structure
- `AVERY-HEIGHTS-RESEARCH.md` - Example research documentation
- `DUNCASTER-COMPARISON.md` - Example comparison methodology
- `FARMINGTON-STATION-RESEARCH.md` - Another research example

## Database

- `scripts/002_seed_communities_data.sql` - Database seed script (syncs JSON → Supabase)

---

## Project Structure Reference

```
srce-retirement-evaluator/
├── app/              # Next.js 14 App Router
├── components/       # React components
├── lib/              # Utilities, types, Supabase client
├── scripts/          # Database scripts
├── *-data.json       # Community data files (10+)
└── *-RESEARCH.md     # Research documentation
```

---

## Quick Reference

### When adding a new community:
1. Create `{community-slug}-data.json` (copy template from avery-heights-data.json)
2. Create `{COMMUNITY-NAME}-RESEARCH.md` (document sources)
3. Run `scripts/002_seed_communities_data.sql` to sync to database
4. Validate data appears in app

### When updating community data:
1. Edit `{community-slug}-data.json`
2. Run seed script to sync to Supabase
3. Verify changes in app

### When adding a new feature:
1. Check `v0-requirements-doc.md` for planned features
2. Follow shadcn/ui component patterns
3. Use Server Components by default
4. Write tests (TDD enabled)

### When debugging data issues:
1. Check `database-taxonomy.md` for schema
2. Validate JSON with Zod schema (lib/types.ts)
3. Check data_confidence field for known issues
4. Review sources array for verification

---

**Load Order Priority:**
1. CODE_GUIDE.md (Meridian patterns)
2. database-taxonomy.md (data structure)
3. v0-requirements-doc.md (requirements)
4. Example community data files (patterns)
