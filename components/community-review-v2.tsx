"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, Pencil, Plus, X } from "lucide-react"
import type { Community } from "@/lib/types"
import { ApiClient } from "@/lib/api-client"
import { useDebounce } from "@/hooks/use-debounce"

interface CommunityReviewV2Props {
  community: Community
  onUpdate: (updated: Community) => void
}

export function CommunityReviewV2({ community, onUpdate }: CommunityReviewV2Props) {
  const [ratings, setRatings] = useState({
    affordability: community.review_affordability_rating || 0,
    care: community.review_care_rating || 0,
    housing: community.review_housing_rating || 0,
    community: community.review_community_rating || 0,
    overall: community.review_overall_rating || 0,
  })

  // Parse pros and cons from text to array (assuming newline-separated for now)
  const [pros, setPros] = useState<string[]>(
    community.review_pros ? community.review_pros.split('\n').filter(Boolean) : []
  )
  const [cons, setCons] = useState<string[]>(
    community.review_cons ? community.review_cons.split('\n').filter(Boolean) : []
  )
  const [notes, setNotes] = useState(community.review_notes || "")
  const [newPro, setNewPro] = useState("")
  const [newCon, setNewCon] = useState("")

  // Debounce notes to auto-save
  const debouncedNotes = useDebounce(notes, 1000)
  const debouncedRatings = useDebounce(ratings, 1000)

  useEffect(() => {
    // Auto-save when ratings or notes change
    const saveReview = async () => {
      try {
        const updated = await ApiClient.updateCommunity(community.id, {
          review_affordability_rating: ratings.affordability,
          review_care_rating: ratings.care,
          review_housing_rating: ratings.housing,
          review_community_rating: ratings.community,
          review_overall_rating: ratings.overall,
          review_notes: notes,
          review_pros: pros.join('\n'),
          review_cons: cons.join('\n'),
        })
        onUpdate(updated)
      } catch (err) {
        console.error("Error saving review:", err)
      }
    }

    if (debouncedNotes !== community.review_notes ||
        JSON.stringify(debouncedRatings) !== JSON.stringify({
          affordability: community.review_affordability_rating || 0,
          care: community.review_care_rating || 0,
          housing: community.review_housing_rating || 0,
          community: community.review_community_rating || 0,
          overall: community.review_overall_rating || 0,
        })) {
      saveReview()
    }
  }, [debouncedNotes, debouncedRatings])

  const renderStars = (rating: number, category: keyof typeof ratings) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRatings({ ...ratings, [category]: star })}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const addPro = () => {
    if (newPro.trim()) {
      const updatedPros = [...pros, newPro.trim()]
      setPros(updatedPros)
      setNewPro("")
      // Save immediately
      ApiClient.updateCommunity(community.id, {
        review_pros: updatedPros.join('\n'),
      }).then(onUpdate)
    }
  }

  const removePro = (index: number) => {
    const updatedPros = pros.filter((_, i) => i !== index)
    setPros(updatedPros)
    // Save immediately
    ApiClient.updateCommunity(community.id, {
      review_pros: updatedPros.join('\n'),
    }).then(onUpdate)
  }

  const addCon = () => {
    if (newCon.trim()) {
      const updatedCons = [...cons, newCon.trim()]
      setCons(updatedCons)
      setNewCon("")
      // Save immediately
      ApiClient.updateCommunity(community.id, {
        review_cons: updatedCons.join('\n'),
      }).then(onUpdate)
    }
  }

  const removeCon = (index: number) => {
    const updatedCons = cons.filter((_, i) => i !== index)
    setCons(updatedCons)
    // Save immediately
    ApiClient.updateCommunity(community.id, {
      review_cons: updatedCons.join('\n'),
    }).then(onUpdate)
  }

  return (
    <Card className="border-l-4 border-l-[#3B82F6]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pencil className="h-5 w-5 text-[#3B82F6]" />
          Suharto Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rate Your Experience */}
        <div>
          <h3 className="font-semibold mb-4">Rate Your Experience</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Affordability */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Affordability</span>
              {renderStars(ratings.affordability, 'affordability')}
            </div>

            {/* Care */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Care</span>
              {renderStars(ratings.care, 'care')}
            </div>

            {/* Housing */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Housing</span>
              {renderStars(ratings.housing, 'housing')}
            </div>

            {/* Community */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Community</span>
              {renderStars(ratings.community, 'community')}
            </div>

            {/* Overall Rating */}
            <div className="flex items-center justify-between md:col-span-2">
              <span className="text-sm font-medium">Overall Rating</span>
              {renderStars(ratings.overall, 'overall')}
            </div>
          </div>
        </div>

        {/* Pros */}
        <div>
          <h3 className="font-semibold mb-3">Pros</h3>
          <div className="space-y-2">
            {pros.map((pro, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                <span className="flex-1 text-sm">{pro}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePro(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                placeholder="Add a pro..."
                value={newPro}
                onChange={(e) => setNewPro(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addPro()
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={addPro}
                size="sm"
                variant="outline"
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cons */}
        <div>
          <h3 className="font-semibold mb-3">Cons</h3>
          <div className="space-y-2">
            {cons.map((con, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                <span className="flex-1 text-sm">{con}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCon(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                placeholder="Add a con..."
                value={newCon}
                onChange={(e) => setNewCon(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addCon()
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={addCon}
                size="sm"
                variant="outline"
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Review Notes */}
        <div>
          <h3 className="font-semibold mb-3">Review Notes</h3>
          <Textarea
            placeholder="Share your thoughts and impressions..."
            value={notes}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setNotes(e.target.value)
              }
            }}
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-muted-foreground text-right mt-1">
            {notes.length}/1000
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
