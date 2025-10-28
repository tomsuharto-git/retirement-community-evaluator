import type { Community, FilterOptions } from "./types"

const API_BASE = "/api"

export class ApiClient {
  static async getCommunities(filters?: Partial<FilterOptions> & { search?: string }): Promise<Community[]> {
    const params = new URLSearchParams()

    if (filters?.search) params.append("search", filters.search)
    if (filters?.visited && filters.visited !== "all") params.append("visited", filters.visited)
    if (filters?.sortBy) params.append("sortBy", filters.sortBy)
    if (filters?.communityType) params.append("communityType", filters.communityType)
    if (filters?.maxDistance) params.append("maxDistance", filters.maxDistance.toString())
    if (filters?.minRating) params.append("minRating", filters.minRating.toString())

    const response = await fetch(`${API_BASE}/communities?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch communities")
    }

    const data = await response.json()
    return data.communities
  }

  static async getCommunity(id: string): Promise<Community> {
    const response = await fetch(`${API_BASE}/communities/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch community")
    }

    const data = await response.json()
    return data.community
  }

  static async updateCommunity(id: string, updates: Partial<Community>): Promise<Community> {
    const response = await fetch(`${API_BASE}/communities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error("Failed to update community")
    }

    const data = await response.json()
    return data.community
  }

  static async toggleVisited(id: string, visited: boolean): Promise<Community> {
    const response = await fetch(`${API_BASE}/communities/${id}/visited`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visited }),
    })

    if (!response.ok) {
      throw new Error("Failed to update visited status")
    }

    const data = await response.json()
    return data.community
  }

  static async toggleCompare(id: string, compare_selected: boolean): Promise<Community> {
    const response = await fetch(`${API_BASE}/communities/${id}/compare`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ compare_selected }),
    })

    if (!response.ok) {
      throw new Error("Failed to update compare status")
    }

    const data = await response.json()
    return data.community
  }

  static async createCommunity(community: Omit<Community, "id" | "created_at" | "updated_at">): Promise<Community> {
    const response = await fetch(`${API_BASE}/communities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(community),
    })

    if (!response.ok) {
      throw new Error("Failed to create community")
    }

    const data = await response.json()
    return data.community
  }

  static async deleteCommunity(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/communities/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete community")
    }
  }
}
