import requests
from bs4 import BeautifulSoup
import json
import os
import time
import hashlib
from urllib.parse import urljoin
from config import WBJEE_URL, SNAPSHOT_DIR, DATA_FILE
from ai_analysis import analyze_change
from notification import send_notification
from pdf_monitor import get_pdf_hash, extract_text

if not os.path.exists(SNAPSHOT_DIR):
    os.makedirs(SNAPSHOT_DIR)

DATA_PATH = os.path.join(SNAPSHOT_DIR, DATA_FILE)

def load_data():
    if os.path.exists(DATA_PATH):
        with open(DATA_PATH, 'r') as f:
            return json.load(f)
    return {"pages": {}, "pdfs": {}}

def save_data(data):
    with open(DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)

def fetch_page(url, retries=3):
    for attempt in range(retries):
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            return response.content
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1} failed for {url}: {e}")
            time.sleep(5)
    return None

def extract_links_and_text(html, base_url):
    soup = BeautifulSoup(html, 'lxml')
    for script in soup(["script", "style"]):
        script.extract()
        
    text = soup.get_text(separator=' ', strip=True)
    
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        full_url = urljoin(base_url, href)
        links.append({'text': a.get_text(strip=True), 'url': full_url})
        
    return text, links

def hash_content(content):
    return hashlib.md5(content.encode('utf-8')).hexdigest()

def process_page(url, name, data):
    print(f"Monitoring {name}: {url}")
    html_content = fetch_page(url)
    if not html_content:
        print(f"Failed to fetch {url}")
        return

    text, links = extract_links_and_text(html_content, url)
    content_hash = hash_content(text)
    
    if name not in data['pages']:
        data['pages'][name] = {'hash': content_hash, 'text': text}
        print(f"Initial snapshot saved for {name}.")
        return

    old_hash = data['pages'][name].get('hash')
    if old_hash != content_hash:
        print(f"Change detected in {name}!")
        
        change_description = f"Page: {name}\nURL: {url}\nOld Text Snippet: {data['pages'][name]['text'][:500]}...\nNew Text Snippet: {text[:500]}..."
        
        ai_response = analyze_change(f"The webpage {name} at {url} has been updated. Change details: {change_description}")
        
        importance = "LOW"
        if "Importance: CRITICAL" in ai_response.upper():
            importance = "CRITICAL"
        elif "Importance: HIGH" in ai_response.upper():
            importance = "HIGH"
        elif "Importance: MEDIUM" in ai_response.upper():
            importance = "MEDIUM"

        if importance in ["MEDIUM", "HIGH", "CRITICAL"]:
            send_notification(f"WBJEE Update: {name}", ai_response, importance, url)
        
        data['pages'][name] = {'hash': content_hash, 'text': text}
        
    for link in links:
        if link['url'].lower().endswith('.pdf'):
            process_pdf(link['url'], link['text'], data)

def process_pdf(url, text_desc, data):
    if url in data['pdfs']:
        return 
        
    print(f"New PDF found: {url}")
    pdf_content = fetch_page(url)
    if not pdf_content:
        return
        
    pdf_path = os.path.join(SNAPSHOT_DIR, "temp.pdf")
    with open(pdf_path, 'wb') as f:
        f.write(pdf_content)
        
    pdf_hash = get_pdf_hash(pdf_path)
    
    known_hashes = [p.get('hash') for p in data['pdfs'].values()]
    if pdf_hash in known_hashes:
        os.remove(pdf_path)
        return
        
    try:
        pdf_text = extract_text(pdf_path)
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        pdf_text = "Could not extract text."
        
    ai_response = analyze_change(f"A new PDF titled '{text_desc}' was uploaded to WBJEE at {url}. Contents: {pdf_text[:1500]}...")
    
    importance = "LOW"
    if "Importance: CRITICAL" in ai_response.upper():
        importance = "CRITICAL"
    elif "Importance: HIGH" in ai_response.upper():
        importance = "HIGH"
    elif "Importance: MEDIUM" in ai_response.upper():
        importance = "MEDIUM"
        
    if importance == "LOW":
        importance = "HIGH"
        
    send_notification(f"New WBJEE PDF: {text_desc}", ai_response, importance, url)
    
    data['pdfs'][url] = {'hash': pdf_hash, 'title': text_desc}
    os.remove(pdf_path)

def monitor():
    data = load_data()
    
    urls_to_monitor = {
        "WBJEE Homepage": WBJEE_URL,
        "WBJEE Exam Page": f"{WBJEE_URL}/wbjee/",
        "JELET Page": f"{WBJEE_URL}/jelet/",
        "JENPAS Page": f"{WBJEE_URL}/jenpas-ug/",
    }
    
    for name, url in urls_to_monitor.items():
        try:
            process_page(url, name, data)
        except Exception as e:
            print(f"Error processing {name}: {e}")
            
    save_data(data)

if __name__ == "__main__":
    monitor()
