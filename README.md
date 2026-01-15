# 🌌 Exoplanet Detector AI

An AI-powered web application that predicts whether a celestial object is an **exoplanet** using machine learning techniques and astronomical data.

This project combines **data science, machine learning, and web development** to demonstrate how AI can assist in space research and astronomical discovery.

---

## 🚀 Project Overview

Exoplanets are planets that exist outside our solar system. Detecting them traditionally requires complex astronomical analysis.  
This project simplifies that process by using a **Machine Learning model** trained on real exoplanet data to classify whether an observed object is likely an exoplanet.

The application provides:
- A user-friendly web interface
- A trained **Random Forest classifier**
- Real-time predictions based on input parameters

---

## 🧠 Machine Learning Model

- **Algorithm:** Random Forest Classifier  
- **Preprocessing:**
  - Missing value handling using imputation
  - Feature scaling
- **Model Files:**
  - `random_forest_model.pkl`
  - `scaler.pkl`
  - `imputer.pkl`

The model is trained using astronomical features from the dataset to accurately predict exoplanet candidates.

---

## 🛠️ Tech Stack

### Backend
- Python
- Flask
- Scikit-learn
- Pandas
- NumPy

### Frontend
- HTML
- CSS
- JavaScript

### Tools
- Git & GitHub
- VS Code
- macOS Terminal

---

## 📁 Project Structure

ExoplanetDetector/
├── app.py
├── train_model.py
├── exoplanets.csv
├── requirements.txt
├── README.md
├── model/
│ ├── random_forest_model.pkl
│ ├── scaler.pkl
│ └── imputer.pkl
├── templates/
│ └── index.html
├── static/
│ ├── style.css
│ └── scripts.js
└── .gitignore


---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/akshaywesleykothapalli/exoplanet-detector-ai.git
cd exoplanet-detector-ai
2️⃣ Create and activate virtual environment (optional but recommended)
bash
Copy code
python3 -m venv venv
source venv/bin/activate
3️⃣ Install dependencies
bash
Copy code
pip install -r requirements.txt
4️⃣ Run the Flask application
bash
Copy code
python app.py
5️⃣ Open in browser
cpp
Copy code
http://127.0.0.1:5000/
📊 Dataset
The dataset (exoplanets.csv) contains astronomical parameters used for classification.
Features are preprocessed before being fed into the ML model.

🎯 Features
Predicts exoplanet existence using AI

Simple and interactive UI

Pre-trained ML model included

Clean and modular project structure

🔮 Future Enhancements
Improve model accuracy with deep learning

Add data visualization and charts

Deploy application to cloud (Render / Railway)

Add API support

Support real-time astronomical datasets

👨‍💻 Author
Akshay Wesley Kothapalli
GitHub: https://github.com/akshaywesleykothapalli

📜 License
This project is created for educational and academic purposes.

⭐ Acknowledgements
NASA Exoplanet Archive (dataset inspiration)

Scikit-learn documentation

Flask documentation

