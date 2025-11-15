"use client"

import type { Community } from "@/lib/types"
import { CommunityCard } from "./community-card"

interface CommunityGridProps {
  communities: Community[]
  onToggleVisited: (id: string) => void
  selectedCommunity?: string
  onCommunitySelect: (id: string) => void
  onCommunityHover: (id: string | undefined) => void
}

export function CommunityGrid({
  communities,
  onToggleVisited,
  selectedCommunity,
  onCommunitySelect,
  onCommunityHover,
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
    <div className="flex flex-col gap-4">
      {communities.map((community) => (
        <div
          key={community.id}
          onClick={() => onCommunitySelect(community.id)}
          onMouseEnter={() => onCommunityHover(community.id)}
          onMouseLeave={() => onCommunityHover(undefined)}
          className="cursor-pointer"
        >
          <CommunityCard
            community={community}
            onToggleVisited={onToggleVisited}
          />
        </div>
      ))}
    </div>
  )
}
