from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load model & preprocessors
model = joblib.load("model/random_forest_model.pkl")
imputer = joblib.load("model/imputer.pkl")
scaler = joblib.load("model/scaler.pkl")

# Feature names (manual & reliable)
feature_names = [
    "orbital_period",
    "planet_radius",
    "transit_depth",
    "transit_duration",
    "eccentricity"
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]
    X = scaler.transform(imputer.transform([data]))

    prediction = int(model.predict(X)[0])
    confidence = float(max(model.predict_proba(X)[0]))

    # Light curve simulation
    time = np.linspace(0, 10, 100)
    depth = data[2]
    brightness = 1 - depth * np.exp(-((time - 5) ** 2) / 0.1)

    # 🧠 Explainability (Random Forest)
    importances = model.feature_importances_

    explainability = sorted([
        {
            "feature": feature_names[i].replace("_", " ").title(),
            "importance": round(float(importances[i]), 3)
        }
        for i in range(len(feature_names))
    ], key=lambda x: x["importance"], reverse=True)

    return jsonify({
        "prediction": prediction,
        "confidence": confidence,
        "plot_data": {
            "time": time.tolist(),
            "brightness": brightness.tolist()
        },
        "explainability": explainability
    })

if __name__ == "__main__":
    app.run(debug=False)
