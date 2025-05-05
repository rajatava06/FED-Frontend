from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import re

app = Flask(__name__)
CORS(app)

# Import your existing SerpApiRAG class
# This assumes your SerpApiRAG class is in a file called serpapi_rag.py
from serpapi_rag import SerpApiRAG

# Initialize the RAG system
rag = SerpApiRAG()

@app.route('/api/fetch-medium-content', methods=['POST'])
def fetch_medium_content():
    data = request.json
    medium_url = data.get('url')
    
    if not medium_url:
        return jsonify({
            'error': 'No Medium URL provided'
        }), 400
    
    try:
        # Use your existing fetch_page_content method
        content = rag.fetch_page_content(medium_url)
        
        # Extract title
        title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        title = title_match.group(1) if title_match else "Talent Building in HR: From Recruitment to Development"
        
        # Format content for display
        soup = BeautifulSoup(content, 'html.parser')
        formatted_content = ""
        
        # Get main article content - adjust selectors based on Medium's structure
        article_content = soup.find('article') or soup.find('main')
        if article_content:
            # Remove unnecessary elements
            for tag in article_content.select('nav, .js-postMetaLockup, .pw-highlight-menu'):
                if tag:
                    tag.decompose()
            
            # Process paragraphs and headings
            for element in article_content.find_all(['p', 'h2', 'h3', 'ul', 'ol', 'blockquote']):
                if element.name in ['h2', 'h3']:
                    formatted_content += f"<{element.name} class='medium-heading'>{element.get_text()}</{element.name}>"
                elif element.name == 'blockquote':
                    formatted_content += f"<blockquote class='medium-quote'>{element.get_text()}</blockquote>"
                elif element.name in ['ul', 'ol']:
                    list_items = ''.join([f"<li>{li.get_text()}</li>" for li in element.find_all('li')])
                    formatted_content += f"<{element.name} class='medium-list'>{list_items}</{element.name}>"
                else:
                    formatted_content += f"<p class='medium-paragraph'>{element.get_text()}</p>"
        
        return jsonify({
            'title': title,
            'content': formatted_content,
            'url': medium_url
        })
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)