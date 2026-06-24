import google.generativeai as genai
from config import GEMINI_API_KEY
import os

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using the recommended model for general text
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None

def analyze_change(change_description):
    if not model:
        return "Importance: MEDIUM\nSummary: Change detected, but Gemini API key is missing.\nDetails: Cannot analyze without API key.\nRecommended Action: Check the website manually."
        
    prompt = f"""
    You are an AI monitoring system for the WBJEE (West Bengal Joint Entrance Examinations Board) website.
    Analyze the following website/PDF change and provide a summary, explanation, importance level (MEDIUM, HIGH, CRITICAL), and recommended action.
    
    Ignore LOW changes unless it's a completely new system.
    
    CRITICAL: Seat matrix changed, New counselling round announced, Admission process modified.
    HIGH: Counselling dates changed, Important PDF uploaded.
    MEDIUM: New general notice uploaded.
    
    Change details: 
    {change_description}
    
    Format your response EXACTLY like this:
    Importance: [Level]
    Summary: [Summary]
    Details: [Explanation]
    Recommended Action: [Action]
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"AI Analysis failed: {e}")
        return "Importance: HIGH\nSummary: Change detected but AI analysis failed.\nDetails: An error occurred while calling the Gemini API.\nRecommended Action: Please visit the URL manually."
