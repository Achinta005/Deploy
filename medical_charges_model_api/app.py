from flask import Flask
from flask_cors import CORS
from config import DevelopmentConfig

# Create Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(DevelopmentConfig)

# Enable CORS
# Enable CORS for ALL routes from your Vercel domain
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5000",
            "https://deploy-five-khaki.vercel.app",  # Your Vercel domain
            "https://*.vercel.app"  # All Vercel preview URLs
        ],
        "methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Import API routes
from api.predict import predict_bp
app.register_blueprint(predict_bp)

@app.route('/')
def home():
    return {
        "message": "Medical Charges Prediction API",
        "version": "1.0.0",
        "endpoints": {
            "predict": "/api/predict",
            "health": "/health"
        }
    }

@app.route('/health')
def health():
    return {"status": "healthy"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)