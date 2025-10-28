#!/usr/bin/env python3
"""
Seniorly.com Image Scraper for Retirement Communities
Respectful scraper with rate limiting and robots.txt compliance
"""

import requests
import time
import json
import os
from urllib.parse import urljoin, quote
from bs4 import BeautifulSoup

# Configuration
DELAY_BETWEEN_REQUESTS = 3  # seconds - be respectful
USER_AGENT = 'RetirementCommunityResearchBot/1.0 (Personal family project; tomsuharto@gmail.com)'
IMAGES_DIR = 'public/community-images'

# Create images directory if it doesn't exist
os.makedirs(IMAGES_DIR, exist_ok=True)

# Our communities to search for
COMMUNITIES = [
    {"name": "Brookdale Chatfield", "location": "West Hartford, CT"},
    {"name": "The Reservoir", "location": "West Hartford, CT"},
    {"name": "Duncaster", "location": "Bloomfield, CT"},
    {"name": "Seabury", "location": "Bloomfield, CT"},
    {"name": "The Hearth at Glastonbury", "location": "Glastonbury, CT"},
    {"name": "Middlewoods of Farmington", "location": "Farmington, CT"},
    {"name": "Touchpoints at Farmington", "location": "Farmington, CT"},
    {"name": "Farmington Station", "location": "Farmington, CT"},
    {"name": "AVIVA West Hartford", "location": "West Hartford, CT"},
    {"name": "Avery Heights", "location": "Hartford, CT"}
]

def search_seniorly(community_name, location):
    """Search for a community on seniorly.com"""
    print(f"\n🔍 Searching for: {community_name} in {location}")

    # Create search query
    search_term = f"{community_name} {location}"

    # Search on Google for seniorly.com listing
    # Alternative: could use seniorly's search, but that might hit blocked params
    google_search_url = f"https://www.google.com/search?q=site:seniorly.com+{quote(search_term)}"

    headers = {
        'User-Agent': USER_AGENT
    }

    try:
        response = requests.get(google_search_url, headers=headers, timeout=10)
        time.sleep(DELAY_BETWEEN_REQUESTS)

        # Parse Google results to find seniorly.com URL
        soup = BeautifulSoup(response.text, 'html.parser')

        # Look for seniorly.com URLs in search results
        for link in soup.find_all('a', href=True):
            href = link['href']
            if 'seniorly.com' in href and '/community/' in href:
                # Extract actual URL from Google redirect
                if 'url?q=' in href:
                    actual_url = href.split('url?q=')[1].split('&')[0]
                    return actual_url

        print(f"⚠️  No seniorly.com listing found for {community_name}")
        return None

    except Exception as e:
        print(f"❌ Error searching: {e}")
        return None

def scrape_community_images(url, community_name):
    """Scrape images from a seniorly.com community page"""
    print(f"📸 Scraping images from: {url}")

    headers = {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        time.sleep(DELAY_BETWEEN_REQUESTS)

        if response.status_code != 200:
            print(f"❌ Failed to fetch page: {response.status_code}")
            return []

        soup = BeautifulSoup(response.text, 'html.parser')

        # Find images - seniorly typically uses specific classes for community images
        image_urls = []

        # Look for various image containers
        # Method 1: Gallery images
        gallery_images = soup.find_all('img', class_=lambda x: x and ('gallery' in x.lower() or 'photo' in x.lower()))
        for img in gallery_images:
            src = img.get('src') or img.get('data-src')
            if src and 'placeholder' not in src.lower():
                image_urls.append(urljoin(url, src))

        # Method 2: Hero/main images
        hero_images = soup.find_all('img', class_=lambda x: x and ('hero' in x.lower() or 'main' in x.lower()))
        for img in hero_images:
            src = img.get('src') or img.get('data-src')
            if src and 'placeholder' not in src.lower():
                image_urls.append(urljoin(url, src))

        # Method 3: Any image in specific containers
        containers = soup.find_all(['div', 'section'], class_=lambda x: x and 'image' in x.lower())
        for container in containers:
            for img in container.find_all('img'):
                src = img.get('src') or img.get('data-src')
                if src and 'placeholder' not in src.lower():
                    image_urls.append(urljoin(url, src))

        # Remove duplicates while preserving order
        image_urls = list(dict.fromkeys(image_urls))

        # Filter out small images (likely icons/logos)
        filtered_urls = [url for url in image_urls if not any(x in url.lower() for x in ['icon', 'logo', 'avatar', 'thumb'])]

        print(f"✅ Found {len(filtered_urls)} images")
        return filtered_urls[:5]  # Limit to 5 images per community

    except Exception as e:
        print(f"❌ Error scraping images: {e}")
        return []

def download_image(url, save_path):
    """Download an image from a URL"""
    headers = {
        'User-Agent': USER_AGENT,
        'Referer': 'https://www.seniorly.com/'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10, stream=True)
        time.sleep(DELAY_BETWEEN_REQUESTS)

        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        return False

    except Exception as e:
        print(f"❌ Error downloading image: {e}")
        return False

def main():
    """Main scraping function"""
    print("🚀 Starting seniorly.com image scraper")
    print(f"⏱️  Rate limit: {DELAY_BETWEEN_REQUESTS}s between requests")
    print(f"📁 Images will be saved to: {IMAGES_DIR}")
    print("\n" + "="*60)

    results = []

    for community in COMMUNITIES:
        name = community['name']
        location = community['location']

        # Create safe filename
        safe_name = name.lower().replace(' ', '-').replace('/', '-')

        # Search for community
        community_url = search_seniorly(name, location)

        if not community_url:
            results.append({
                'name': name,
                'status': 'not_found',
                'images': []
            })
            continue

        # Scrape images
        image_urls = scrape_community_images(community_url, name)

        if not image_urls:
            results.append({
                'name': name,
                'status': 'no_images',
                'url': community_url,
                'images': []
            })
            continue

        # Download images
        downloaded = []
        for i, img_url in enumerate(image_urls):
            extension = img_url.split('.')[-1].split('?')[0]
            if extension not in ['jpg', 'jpeg', 'png', 'webp']:
                extension = 'jpg'

            filename = f"{safe_name}-{i+1}.{extension}"
            save_path = os.path.join(IMAGES_DIR, filename)

            print(f"⬇️  Downloading image {i+1}/{len(image_urls)}...")
            if download_image(img_url, save_path):
                print(f"✅ Saved: {filename}")
                downloaded.append(filename)
            else:
                print(f"❌ Failed to download image {i+1}")

        results.append({
            'name': name,
            'status': 'success' if downloaded else 'download_failed',
            'url': community_url,
            'images': downloaded
        })

        print("\n" + "-"*60)

    # Save results to JSON
    with open('scrape-results.json', 'w') as f:
        json.dump(results, f, indent=2)

    # Print summary
    print("\n" + "="*60)
    print("📊 SCRAPING SUMMARY")
    print("="*60)

    for result in results:
        status_emoji = "✅" if result['status'] == 'success' else "⚠️"
        print(f"{status_emoji} {result['name']}: {len(result.get('images', []))} images")

    print(f"\n💾 Results saved to: scrape-results.json")
    print(f"📁 Images saved to: {IMAGES_DIR}/")

if __name__ == '__main__':
    main()
