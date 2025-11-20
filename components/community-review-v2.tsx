"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, Pencil, Plus, X, Edit2, Save } from "lucide-react"
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
  const [editingNotes, setEditingNotes] = useState(false)
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
            onClick={() => setRatings({ ...ratings, [category]: star === rating ? 0 : star })}
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

  const handleSaveNotes = async () => {
    try {
      const updated = await ApiClient.updateCommunity(community.id, {
        review_notes: notes,
      })
      onUpdate(updated)
      setEditingNotes(false)
    } catch (err) {
      console.error("Error saving notes:", err)
    }
  }

  return (
    <Card className="border-l-4 border-l-[#3B82F6]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Pencil className="h-5 w-5 text-[#3B82F6]" />
          Suharto Review
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
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
            <div className="flex flex-wrap gap-2 mb-2">
              {pros.map((pro, index) => (
                <div
                  key={index}
                  className="group relative inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                  <span>{pro}</span>
                  <button
                    onClick={() => removePro(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-green-800 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
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
            <div className="flex flex-wrap gap-2 mb-2">
              {cons.map((con, index) => (
                <div
                  key={index}
                  className="group relative inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                  <span>{con}</span>
                  <button
                    onClick={() => removeCon(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 hover:bg-red-800 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Review Notes</h3>
            {!editingNotes && notes ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingNotes(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          {editingNotes || !notes ? (
            <>
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
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-muted-foreground">
                  {notes.length}/1000
                </div>
                {notes && (
                  <Button
                    onClick={handleSaveNotes}
                    size="sm"
                    variant="outline"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                )}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground whitespace-pre-wrap">{notes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
