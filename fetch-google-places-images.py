#!/usr/bin/env python3
"""
Google Places API Image Fetcher for Retirement Communities
Uses legitimate Google Places API to fetch community photos
"""

import requests
import time
import json
import os
from urllib.parse import urlencode

# Configuration
GOOGLE_API_KEY = os.environ.get('GOOGLE_PLACES_API_KEY', '')
IMAGES_DIR = 'public/community-images'
DELAY_BETWEEN_REQUESTS = 0.5  # seconds
MAX_PHOTOS_PER_COMMUNITY = 3

# Create images directory
os.makedirs(IMAGES_DIR, exist_ok=True)

# Our communities
COMMUNITIES = [
    {"name": "Brookdale Chatfield", "location": "West Hartford, CT", "address": "200 Bloomfield Ave, West Hartford, CT"},
    {"name": "The Reservoir", "location": "West Hartford, CT", "address": "1801 Asylum Ave, West Hartford, CT"},
    {"name": "Duncaster", "location": "Bloomfield, CT", "address": "40 Loeffler Rd, Bloomfield, CT"},
    {"name": "Seabury", "location": "Bloomfield, CT", "address": "200 Seabury Dr, Bloomfield, CT"},
    {"name": "The Hearth at Glastonbury", "location": "Glastonbury, CT", "address": "3268 Main St, Glastonbury, CT"},
    {"name": "Middlewoods of Farmington", "location": "Farmington, CT", "address": "509 Middle Rd, Farmington, CT"},
    {"name": "Touchpoints at Farmington", "location": "Farmington, CT", "address": "1 Touchpoints Way, Farmington, CT"},
    {"name": "Farmington Station", "location": "Farmington, CT", "address": "1 Farm Glen Blvd, Farmington, CT"},
    {"name": "AVIVA West Hartford", "location": "West Hartford, CT", "address": "1 Hamilton Heights Dr, West Hartford, CT"},
    {"name": "Avery Heights", "location": "Hartford, CT", "address": "705 New Britain Ave, Hartford, CT"}
]

def check_api_key():
    """Check if API key is set"""
    if not GOOGLE_API_KEY:
        print("❌ ERROR: Google Places API key not set!")
        print("\n📝 To set it up:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create a new project or select existing")
        print("3. Enable 'Places API' and 'Places API (New)'")
        print("4. Create credentials (API key)")
        print("5. Set environment variable:")
        print("   export GOOGLE_PLACES_API_KEY='your-api-key-here'")
        print("\n💰 Pricing: First $200/month free, then ~$0.017 per photo request")
        return False
    return True

def search_place(name, location):
    """Search for a place using Google Places API"""
    print(f"\n🔍 Searching: {name}")

    # Use Text Search (new) API
    url = "https://places.googleapis.com/v1/places:searchText"

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.photos"
    }

    data = {
        "textQuery": f"{name} {location}",
        "languageCode": "en"
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        time.sleep(DELAY_BETWEEN_REQUESTS)

        if response.status_code == 200:
            result = response.json()
            if 'places' in result and len(result['places']) > 0:
                place = result['places'][0]
                print(f"✅ Found: {place.get('displayName', {}).get('text', 'Unknown')}")
                print(f"   Address: {place.get('formattedAddress', 'N/A')}")
                return place
            else:
                print(f"⚠️  No results found")
                return None
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"   Response: {response.text}")
            return None

    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def download_place_photo(photo_name, save_path, max_width=1200):
    """Download a photo using Google Places Photo API"""

    # Use the photo resource name to get the photo
    url = f"https://places.googleapis.com/v1/{photo_name}/media"

    params = {
        "maxWidthPx": max_width,
        "key": GOOGLE_API_KEY
    }

    try:
        response = requests.get(url, params=params, timeout=30, stream=True)
        time.sleep(DELAY_BETWEEN_REQUESTS)

        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        else:
            print(f"   ❌ Download failed: {response.status_code}")
            return False

    except Exception as e:
        print(f"   ❌ Download error: {e}")
        return False

def fetch_community_images(community):
    """Fetch and download images for a community"""
    name = community['name']
    location = community['location']

    # Create safe filename
    safe_name = name.lower().replace(' ', '-').replace('/', '-')

    # Search for the place
    place = search_place(name, location)

    if not place:
        return {
            'name': name,
            'status': 'not_found',
            'images': []
        }

    # Get photos
    photos = place.get('photos', [])

    if not photos:
        print(f"   ℹ️  No photos available")
        return {
            'name': name,
            'status': 'no_photos',
            'place_id': place.get('id'),
            'images': []
        }

    print(f"   📸 Found {len(photos)} photos (downloading up to {MAX_PHOTOS_PER_COMMUNITY})")

    # Download photos
    downloaded = []
    for i, photo in enumerate(photos[:MAX_PHOTOS_PER_COMMUNITY]):
        photo_name = photo.get('name', '')
        if not photo_name:
            continue

        filename = f"{safe_name}-{i+1}.jpg"
        save_path = os.path.join(IMAGES_DIR, filename)

        print(f"   ⬇️  Downloading photo {i+1}/{min(len(photos), MAX_PHOTOS_PER_COMMUNITY)}...")

        if download_place_photo(photo_name, save_path):
            print(f"   ✅ Saved: {filename}")
            downloaded.append(filename)

    return {
        'name': name,
        'status': 'success' if downloaded else 'download_failed',
        'place_id': place.get('id'),
        'address': place.get('formattedAddress'),
        'images': downloaded,
        'total_photos_available': len(photos)
    }

def main():
    """Main function"""
    print("🚀 Google Places API Image Fetcher")
    print("="*60)

    if not check_api_key():
        return

    print(f"\n📸 Will fetch up to {MAX_PHOTOS_PER_COMMUNITY} photos per community")
    print(f"📁 Saving to: {IMAGES_DIR}")
    print(f"💰 Estimated cost: ${len(COMMUNITIES) * MAX_PHOTOS_PER_COMMUNITY * 0.007:.2f}")
    print("\n" + "="*60)

    results = []

    for community in COMMUNITIES:
        result = fetch_community_images(community)
        results.append(result)
        print("-"*60)

    # Save results
    with open('google-places-results.json', 'w') as f:
        json.dump(results, f, indent=2)

    # Print summary
    print("\n" + "="*60)
    print("📊 SUMMARY")
    print("="*60)

    total_images = 0
    for result in results:
        status_emoji = "✅" if result['status'] == 'success' else "⚠️"
        image_count = len(result.get('images', []))
        total_images += image_count
        print(f"{status_emoji} {result['name']}: {image_count} images")
        if result.get('total_photos_available', 0) > 0:
            print(f"   ({result['total_photos_available']} photos available on Google)")

    print(f"\n📸 Total images downloaded: {total_images}")
    print(f"💾 Results saved to: google-places-results.json")
    print(f"📁 Images saved to: {IMAGES_DIR}/")
    print(f"\n💰 Estimated cost: ${total_images * 0.007:.2f}")

if __name__ == '__main__':
    main()
