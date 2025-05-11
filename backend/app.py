#backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [BACKEND] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%dT%H:%M:%S%z'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.before_request
def log_request():
    logger.info(f"Received {request.method} request to {request.path} from {request.remote_addr}")

@app.after_request
def log_response(response):
    logger.info(f"Completed {request.method} request to {request.path} with status {response.status_code}")
    return response

@app.route('/api/hello', methods=['GET'])
def hello():
    logger.info("Processing /api/hello request")
    return jsonify({"message": "Hello from Python Backend!"})

@app.route('/api/data', methods=['GET'])
def get_data():
    logger.info("Processing /api/data request")
    # Sample data
    data = [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"}
    ]
    logger.info(f"Returning {len(data)} items")
    return jsonify(data)

if __name__ == '__main__':
    logger.info("Starting Flask application")
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)