# Exoplanet Detection AI

An AI-powered web application that predicts the existence of exoplanets using machine learning and visualizes transit light curves interactively.

Built with **Flask**, **Scikit-learn**, and a modern **HTML/CSS/JavaScript** frontend.

---

## 🚀 Project Overview

Exoplanets are planets that orbit stars outside our solar system.  
This project uses a **Random Forest classifier** trained on astronomical parameters to determine whether a given exoplanet candidate is likely to be real.

The application provides:
- Intelligent predictions
- Confidence scores
- Animated transit light curve visualization
- Feature importance explainability
- A modern, interactive UI

---

## ✨ Key Features

- 🔭 **AI-based Exoplanet Classification**
- 📈 **Animated Transit Light Curve Visualization**
- 🧠 **Explainable AI (Feature Importance Panel)**
- 🎨 **Modern UI with Smooth Animations**
- ⚡ **Fast Flask Backend**
- 🧪 **Pre-trained Machine Learning Model**
- 🔄 **Reset & Re-analyze Workflow**

---

## 🧠 Machine Learning Model

- Algorithm: **Random Forest Classifier**
- Dataset: NASA Exoplanet Dataset
- Features Used:
  - Orbital Period
  - Planet Radius
  - Transit Depth
  - Transit Duration
  - Orbital Eccentricity
- Accuracy: **~94% on test data**

---

## 🗂️ Project Structure

exoplanet-detector-ai/
│
├── model/
│ ├── random_forest_model.pkl
│ ├── scaler.pkl
│ └── imputer.pkl
│
├── static/
│ ├── style.css
│ └── script.js
│
├── templates/
│ └── index.html
│
├── train_model.py
├── app.py
├── requirements.txt
├── .gitignore
└── README.md


---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/akshaywesleykothapalli/exoplanet-detector-ai.git
cd exoplanet-detector-ai
2️⃣ Create and activate a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
3️⃣ Install dependencies
pip install -r requirements.txt
4️⃣ (Optional) Train the machine learning model
python3 train_model.py
⚠️ If you skip this step, the pre-trained model included in the repository will be used.

5️⃣ Run the Flask application
python3 app.py
6️⃣ Open in your browser
http://127.0.0.1:5000/
🧪 Sample Input Values (For Testing)
You can use these values to quickly test the model:

Feature	Value
Orbital Period	365.25
Planet Radius	1.0
Transit Depth	0.01
Transit Duration	13.0
Eccentricity	0.017
📊 Explainability (Why This Prediction?)
The model displays a feature importance panel showing which parameters influenced the prediction the most, helping users understand why a planet was classified as confirmed or not.

🔮 Future Enhancements
🌍 Add habitability score prediction

📉 Support real NASA light curve uploads

🤖 Upgrade to deep learning models

☁️ Deploy to cloud (Render / AWS / Vercel)

📱 Mobile responsiveness improvements

👨‍💻 Author
Akshay Wesley Kothapalli
ML & Full-Stack Developer

🔗 GitHub: https://github.com/akshaywesleykothapalli
🔗 LinkedIn: https://www.linkedin.com/in/akshay-wesley-kothapalli-966738378

📜 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute.

⭐ If you found this project interesting, consider starring the repository!


---
