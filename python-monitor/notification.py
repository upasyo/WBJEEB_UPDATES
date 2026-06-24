import requests
from config import NTFY_TOPIC

def send_notification(title, message, importance, source):
    if not NTFY_TOPIC:
        print("NTFY_TOPIC not set. Skipping notification.")
        return

    data = f"Importance: {importance}\n\nSummary:\n{message}\n\nSource:\n{source}"
    
    requests.post(
        f"https://ntfy.sh/{NTFY_TOPIC}",
        data=data.encode("utf-8"),
        headers={"Title": title}
    )
