"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import type { FilterOptions } from "@/lib/types"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  compareCount: number
  onCompare: () => void
  onClearCompare: () => void
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  compareCount,
  onCompare,
  onClearCompare,
}: SearchFiltersProps) {
  const visitedOptions = [
    { value: "all", label: "All" },
    { value: "visited", label: "Visited" },
    { value: "not-visited", label: "Not Visited" },
  ]

  const sortOptions = [
    { value: "distance", label: "Distance" },
    { value: "rating", label: "Rating" },
    { value: "name", label: "Name" },
    { value: "cost", label: "Cost" },
  ]

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2">
          {/* Visited Filter */}
          <div className="flex items-center gap-2">
            {visitedOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.visited === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onFiltersChange({ ...filters, visited: option.value as FilterOptions["visited"] })}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Sort By */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as FilterOptions["sortBy"] })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Compare Button */}
          {compareCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-1">
                {compareCount} selected
              </Badge>
              <Button size="sm" onClick={onCompare} disabled={compareCount === 0}>
                Compare
              </Button>
              <Button variant="outline" size="sm" onClick={onClearCompare}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
