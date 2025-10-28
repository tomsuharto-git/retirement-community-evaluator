"use client"

import type { Community } from "@/lib/types"
import { CommunityCard } from "./community-card"

interface CommunityGridProps {
  communities: Community[]
  onToggleVisited: (id: string) => void
  onToggleCompare: (id: string) => void
  compareSelected: string[]
  selectedCommunity?: string
  onCommunitySelect: (id: string) => void
}

export function CommunityGrid({
  communities,
  onToggleVisited,
  onToggleCompare,
  compareSelected,
  selectedCommunity,
  onCommunitySelect,
}: CommunityGridProps) {
  if (communities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-2">No communities found</div>
        <div className="text-sm text-muted-foreground">Try adjusting your search or filters</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <div key={community.id} onClick={() => onCommunitySelect(community.id)} className="cursor-pointer">
          <CommunityCard
            community={community}
            onToggleVisited={onToggleVisited}
            onToggleCompare={onToggleCompare}
            isCompareSelected={compareSelected.includes(community.id)}
          />
        </div>
      ))}
    </div>
  )
}
