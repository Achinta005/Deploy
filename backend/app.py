from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained models
with open('non_smoker_model.pkl', 'rb') as f:
    non_smoker_model = pickle.load(f)

with open('smoker_model.pkl', 'rb') as f:
    smoker_model = pickle.load(f)

@app.route('/')
def home():
    return jsonify({"message": "Medical Charges Prediction API"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        age = float(data['age'])
        bmi = float(data['bmi'])
        children = int(data['children'])
        smoker = data['smoker'].lower()
        sex = data['sex'].lower()
        region = data['region'].lower()
        
        # Convert categorical to numerical
        sex_bin = 1 if sex == 'male' else 0
        
        # One-hot encoding for region
        regions = ['northeast', 'northwest', 'southeast', 'southwest']
        region_encoded = [1 if r == region else 0 for r in regions]
        
        # Prepare input
        input_features = [age, bmi, children, sex_bin] + region_encoded
        input_array = np.array([input_features])
        
        # Select model based on smoker status
        if smoker == 'yes':
            prediction = smoker_model.predict(input_array)[0]
        else:
            prediction = non_smoker_model.predict(input_array)[0]
        
        return jsonify({
            "predicted_charge": round(prediction, 2),
            "input_data": {
                "age": age,
                "bmi": bmi,
                "children": children,
                "smoker": smoker,
                "sex": sex,
                "region": region
            }
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=False)