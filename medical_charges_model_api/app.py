from flask import Flask
from flask_cors import CORS
from config import DevelopmentConfig

# Create Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(DevelopmentConfig)

# Enable CORS
# Update CORS to allow Vercel domain
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://*.vercel.app"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
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