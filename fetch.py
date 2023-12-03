import re
from googleapiclient.discovery import build

def get_video_details(api_key, video_url):
    # Extract video ID from URL
    video_id_match = re.search(r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})', video_url)
    
    if video_id_match:
        video_id = video_id_match.group(1)
    else:
        print("Invalid YouTube URL. Couldn't extract video ID.")
        return

    youtube = build('youtube', 'v3', developerKey=api_key)

    # Retrieve video details using the video ID
    video_details = youtube.videos().list(part='snippet', id=video_id).execute()

    # Extract and print relevant details
    snippet = video_details['items'][0]['snippet']
    print(f"Video ID: {video_id}")
    print(f"Title: {snippet['title']}")
    print(f"Description: {snippet['description']}")
    print(f"Published At: {snippet['publishedAt']}")
    print(f"Thumbnail URL: {snippet['thumbnails']['high']['url']}")
    print("\n")

# Replace 'YOUR_API_KEY' with your actual API key
api_key = 'AIzaSyBG7YBeYmcINh0XGBJ52IFOHHfse9cXFrg'
video_url = 'https://www.youtube.com/watch?v=YykjpeuMNEk'
get_video_details(api_key, video_url)
