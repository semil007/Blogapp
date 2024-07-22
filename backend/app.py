from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()

app = Flask(__name__)
CORS(app)


cohere_api_key = os.getenv('COHERE_API_KEY') #The openai and hugging face api are avaibile only for prices

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    
    try:
        headers = {
            'Authorization': f'Bearer {cohere_api_key}',
            'Content-Type': 'application/json'
        }
        payload = {
            'model': 'command-xlarge-nightly',
            'prompt': prompt,
            'max_tokens': 500
        }
        response = requests.post(
            'https://api.cohere.ai/v1/generate',
            headers=headers,
            json=payload
        )
        
        # Log the response for debugging
        print("Response Status Code:", response.status_code)
        print("Response JSON:", response.json())
        
        response_data = response.json()
        if 'error' in response_data:
            raise Exception(response_data['error'])
        if 'text' in response_data:
            generated_text = response_data['text']
        elif 'generations' in response_data:
            generated_text = response_data['generations'][0]['text']
        else:
            raise Exception('Unexpected response format')

        return jsonify({'response': generated_text.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
