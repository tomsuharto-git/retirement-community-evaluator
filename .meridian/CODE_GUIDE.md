<CODE_GUIDE>
# Retirement Communities Evaluator - Code Guide

**Project:** CCRC Comparison & Evaluation Tool
**Stack:** Next.js 14, React 19, TypeScript, Supabase, Tailwind CSS, shadcn/ui (Radix UI)
**Purpose:** Help users compare and evaluate retirement communities (CCRCs) in Connecticut
**Status:** Feature Building Phase + TDD Mode Enabled

---

## 🎯 Core Data Structure (CRITICAL)

### Community Data Schema

**File Pattern:** `{community-slug}-data.json`

```typescript
interface Community {
  name: string;
  location: string;  // "City, State"
  address: string;
  description: string;
  community_type: string;  // "CCRC (Continuing Care Retirement Community)"
  resident_count: number | null;
  star_rating: number | null;
  monthly_cost_min: number;
  monthly_cost_max: number;
  phone: string;
  website: string;
  care_levels: string[];  // Independent Living, Assisted Living, etc.
  housing_options: string[];
  amenities: string[];
  financials_summary: string;
  care_summary: string;
  housing_summary: string;
  community_summary: string;
  data_confidence: {
    address: "verified" | "high" | "medium" | "low";
    phone: "verified" | "high" | "medium" | "low";
    pricing: "verified" | "high" | "medium" | "low";
    care_levels: "verified" | "high" | "medium" | "low";
    amenities: "verified" | "high" | "medium" | "low";
    [key: string]: string;
  };
  sources: string[];  // URLs
  notes: string;  // Research notes, critical differentiators
}
```

**NEVER modify this schema without updating:**
1. All community JSON files
2. Supabase database schema
3. TypeScript types (`lib/types.ts`)
4. Component interfaces

---

## 📁 File Organization

```
srce-retirement-evaluator/
├── app/
│   ├── page.tsx                  # Home page (search/filter)
│   ├── community/[id]/page.tsx   # Individual community page
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── community-card.tsx        # Grid view card
│   ├── community-grid.tsx        # Grid container
│   ├── community-map.tsx         # Map view
│   ├── search-filters.tsx        # Search and filter UI
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── utils.ts                  # Utility functions
│   └── supabase.ts               # Supabase client
│
├── scripts/
│   └── 002_seed_communities_data.sql  # Database seed script
│
├── {community-slug}-data.json    # Community data files
└── {COMMUNITY-NAME}-RESEARCH.md  # Research documentation
```

---

## 🔧 Core Patterns (CRITICAL)

### 1. Community Data Validation

**ALWAYS validate community data before rendering:**

```typescript
// lib/types.ts
import { z } from 'zod';

const CommunitySchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  monthly_cost_min: z.number().positive(),
  monthly_cost_max: z.number().positive(),
  care_levels: z.array(z.string()).min(1),
  // ... full schema
});

// Validate before use
export function validateCommunity(data: unknown): Community {
  return CommunitySchema.parse(data);
}
```

**Never render unvalidated data - prevents runtime errors**

### 2. shadcn/ui Component Usage

**Standard Pattern:**

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{community.name}</CardTitle>
        <CardDescription>{community.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{community.community_type}</Badge>
      </CardContent>
    </Card>
  );
}
```

**ALWAYS use shadcn/ui components - maintains design consistency**

### 3. Search & Filter Logic

**Filter State Pattern:**

```typescript
// components/search-filters.tsx
const [filters, setFilters] = useState({
  search: '',
  careLevel: 'all',
  priceRange: [0, 15000],
  amenities: [] as string[],
});

// Apply filters
const filteredCommunities = communities.filter(community => {
  // Search filter
  if (filters.search && !community.name.toLowerCase().includes(filters.search.toLowerCase())) {
    return false;
  }

  // Care level filter
  if (filters.careLevel !== 'all' && !community.care_levels.includes(filters.careLevel)) {
    return false;
  }

  // Price range filter
  if (community.monthly_cost_min > filters.priceRange[1] ||
      community.monthly_cost_max < filters.priceRange[0]) {
    return false;
  }

  return true;
});
```

---

## 💾 Supabase Integration

### Database Schema

**Table: `communities`**

```sql
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT NOT NULL,
  community_type TEXT NOT NULL,
  resident_count INTEGER,
  star_rating NUMERIC(2,1),
  monthly_cost_min NUMERIC(10,2) NOT NULL,
  monthly_cost_max NUMERIC(10,2) NOT NULL,
  phone TEXT,
  website TEXT,
  care_levels TEXT[] NOT NULL,
  housing_options TEXT[],
  amenities TEXT[],
  financials_summary TEXT,
  care_summary TEXT,
  housing_summary TEXT,
  community_summary TEXT,
  data_confidence JSONB,
  sources TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Data Fetching Pattern

```typescript
// app/page.tsx (Server Component)
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = createClient();

  const { data: communities, error } = await supabase
    .from('communities')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching communities:', error);
    return <div>Error loading communities</div>;
  }

  return <CommunityGrid communities={communities} />;
}
```

**Use Server Components for data fetching - better performance**

---

## 🎨 UI Patterns

### Community Card Layout

```typescript
// components/community-card.tsx
export function CommunityCard({ community }: Props) {
  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{community.name}</CardTitle>
            <CardDescription>{community.location}</CardDescription>
          </div>
          {community.star_rating && (
            <Badge variant="secondary">{community.star_rating} ★</Badge>
          )}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {community.description}
        </p>

        {/* Price Range */}
        <div className="mt-4">
          <p className="text-lg font-semibold">
            ${community.monthly_cost_min.toLocaleString()} -
            ${community.monthly_cost_max.toLocaleString()}/mo
          </p>
        </div>

        {/* Care Levels */}
        <div className="mt-4 flex flex-wrap gap-2">
          {community.care_levels.slice(0, 3).map(level => (
            <Badge key={level} variant="outline">{level}</Badge>
          ))}
          {community.care_levels.length > 3 && (
            <Badge variant="outline">+{community.care_levels.length - 3} more</Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/community/${community.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🚫 Anti-Patterns (NEVER DO)

❌ **Don't hardcode community data in components**
```typescript
// WRONG
const communities = [
  { name: "Avery Heights", ... }
];

// RIGHT
const { data: communities } = await supabase.from('communities').select('*');
```

❌ **Don't skip data validation**
```typescript
// WRONG
function CommunityCard({ community: any }) { ... }

// RIGHT
import { Community } from '@/lib/types';
function CommunityCard({ community }: { community: Community }) { ... }
```

❌ **Don't use inline styles instead of Tailwind**
```typescript
// WRONG
<div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>

// RIGHT
<div className="p-4 bg-gray-100">
```

❌ **Don't fetch data in Client Components unnecessarily**
```typescript
// WRONG (Client Component)
'use client';
const [data, setData] = useState([]);
useEffect(() => { fetch('/api/communities')... }, []);

// RIGHT (Server Component)
const { data } = await supabase.from('communities').select('*');
```

---

## 🧪 TDD Patterns (ENABLED)

### Test Structure

```typescript
// __tests__/community-card.test.tsx
import { render, screen } from '@testing-library/react';
import { CommunityCard } from '@/components/community-card';

const mockCommunity: Community = {
  name: "Test Community",
  location: "Hartford, CT",
  monthly_cost_min: 3000,
  monthly_cost_max: 6000,
  care_levels: ["Independent Living"],
  // ... required fields
};

describe('CommunityCard', () => {
  it('renders community name', () => {
    render(<CommunityCard community={mockCommunity} />);
    expect(screen.getByText('Test Community')).toBeInTheDocument();
  });

  it('displays price range', () => {
    render(<CommunityCard community={mockCommunity} />);
    expect(screen.getByText(/\$3,000.*\$6,000/)).toBeInTheDocument();
  });

  it('shows care levels as badges', () => {
    render(<CommunityCard community={mockCommunity} />);
    expect(screen.getByText('Independent Living')).toBeInTheDocument();
  });
});
```

### Validation Tests

```typescript
// __tests__/validation.test.ts
import { validateCommunity } from '@/lib/types';

describe('Community Validation', () => {
  it('validates correct community data', () => {
    const valid = {
      name: "Test",
      location: "Hartford, CT",
      monthly_cost_min: 3000,
      monthly_cost_max: 6000,
      // ... all required fields
    };

    expect(() => validateCommunity(valid)).not.toThrow();
  });

  it('rejects missing required fields', () => {
    const invalid = { name: "Test" };  // Missing required fields
    expect(() => validateCommunity(invalid)).toThrow();
  });

  it('rejects invalid price ranges', () => {
    const invalid = {
      // ... valid fields
      monthly_cost_min: -100,  // Negative price
    };
    expect(() => validateCommunity(invalid)).toThrow();
  });
});
```

---

## 💡 Common Tasks

### Adding a New Community

**1. Create data file:**
```bash
# Copy template
cp avery-heights-data.json new-community-data.json

# Edit with community details
# Remember to update ALL required fields
```

**2. Create research file:**
```bash
# Document research sources
cp AVERY-HEIGHTS-RESEARCH.md NEW-COMMUNITY-RESEARCH.md
```

**3. Add to database:**
```bash
# Run seed script (updates automatically)
psql -d retirement_communities -f scripts/002_seed_communities_data.sql
```

**4. Verify:**
```bash
# Check community appears in app
npm run dev
# Navigate to http://localhost:3000
```

### Updating Community Data

**ALWAYS update both files:**
1. `{community-slug}-data.json` - Source of truth
2. Supabase database - Run seed script to sync

```bash
# After editing JSON
psql -d retirement_communities -f scripts/002_seed_communities_data.sql
```

### Adding New Filter

**1. Update filter state:**
```typescript
// components/search-filters.tsx
const [filters, setFilters] = useState({
  // ... existing filters
  newFilter: 'default-value',
});
```

**2. Add filter UI:**
```typescript
<Select value={filters.newFilter} onValueChange={(v) => setFilters({...filters, newFilter: v})}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**3. Apply filter logic:**
```typescript
const filtered = communities.filter(c => {
  // ... existing filters
  if (filters.newFilter !== 'all' && !matchesNewFilter(c, filters.newFilter)) {
    return false;
  }
  return true;
});
```

---

## 📚 Key Documentation

**MUST READ before coding:**

1. **`database-taxonomy.md`** - Database schema and taxonomy
2. **`v0-requirements-doc.md`** - Original requirements and features
3. **`technical MVP.md`** - MVP scope and technical decisions
4. **`CLAUDE-RESEARCH-WORKFLOW.md`** - Research methodology

**Example Research Files:**
- `AVERY-HEIGHTS-RESEARCH.md` - Shows research depth and sourcing
- `DUNCASTER-COMPARISON.md` - Comparison methodology

---

## 🎯 Core Features

### 1. Search & Filter
- Text search (name, location, description)
- Care level filtering
- Price range slider
- Amenity checkboxes
- Community type filter

### 2. Community Cards
- Grid view (3-4 columns)
- List view (single column)
- Map view (geographic)
- Sort options (price, rating, name)

### 3. Community Detail Pages
- Full description
- All care levels and housing options
- Complete amenity list
- Pricing breakdown
- Contact information
- Source citations
- Data confidence indicators

### 4. Comparison Tool (Future)
- Side-by-side comparison
- Highlight differences
- Export comparison as PDF

---

## 🔄 Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run type checking
npm run build

# Run tests
npm test
```

### Database Sync

```bash
# Sync JSON files to Supabase
psql -d retirement_communities -f scripts/002_seed_communities_data.sql

# Or use Supabase CLI
supabase db reset  # Resets and re-seeds
```

### Deployment

```bash
# Deploy to Vercel
vercel --prod

# Vercel automatically:
# - Builds Next.js app
# - Runs type checking
# - Deploys to production
```

---

## 🔄 Version

**Last Updated:** November 17, 2025
**Current Phase:** Feature Building
**Next Phase:** Comparison Tool, Map View, Advanced Filters
**TDD:** Enabled

</CODE_GUIDE>
