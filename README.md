<div align="center">

# ExoPlanet AI Observatory

**AI-powered exoplanet detection platform using NASA Kepler & TESS transit photometry data**

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.x-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-00e676?style=for-the-badge)](LICENSE)

</div>

---

## Overview

**ExoPlanet AI Observatory** is a full-stack machine learning web application that classifies whether a candidate star signal is a genuine exoplanet or a false positive — using the same transit photometry parameters measured by NASA's Kepler and TESS space telescopes.

The app uses a **Random Forest ensemble classifier** trained on over 150,000 light curve observations to deliver predictions with **94.8% precision**, paired with a modern glassmorphic UI featuring animated transit light curves, SHAP-style feature explainability, and a live confidence gauge.

---

## Features

| Feature | Description |
|---|---|
| 🔭 **Exoplanet Classification** | Random Forest classifier with 94.8% precision on validated NASA KOI catalog data |
| 📈 **Animated Light Curve** | Point-by-point stellar flux simulation with transit dip fill, baseline marker, and minimum dip annotation |
| 🧠 **Feature Importance** | SHAP-style panel showing which parameter drove the prediction |
| 🎡 **Confidence Gauge** | Animated SVG radial arc gauge showing model confidence percentage |
| 📜 **Prediction History** | LocalStorage-backed session history of your last 5 predictions |
| 🌗 **Dark / Light Theme** | Toggle between deep-space dark mode and astronomical twilight light mode |
| 🔔 **Toast Notifications** | Real-time confirmation or false-positive alerts after each analysis |
| ⚡ **Preset Candidates** | One-click presets for Earth, Kepler-452b, TRAPPIST-1e, WASP-12b, and Eclipsing Binary |
| 📊 **Stat Counter Animation** | Live counters for 5,500+ confirmed exoplanets, 94.8% precision, and 150,000+ light curves |
| 🖱️ **Mouse Parallax Hero** | Orbital graphic tracks mouse movement for a premium interactive feel |

---

## Machine Learning Model

- **Algorithm**: Random Forest Classifier (800 decision trees)
- **Dataset**: NASA Exoplanet Archive — Kepler Objects of Interest (KOI)
- **Preprocessing**: Median imputation (SimpleImputer) + StandardScaler normalization
- **Accuracy**: ~94% on hold-out test data
- **Precision**: 94.8% on validated KOI catalog

### Input Features

| Parameter | Unit | Description |
|---|---|---|
| `Orbital Period` | days | Time for one complete orbit around the host star |
| `Planet Radius` | R⊕ | Ratio of planet radius to Earth's radius |
| `Transit Depth` | ΔF/F | Fractional stellar flux decrease during transit |
| `Transit Duration` | hours | Total time from first to last contact |
| `Eccentricity` | 0–1 | Orbital ellipticity (0 = circular) |

---

## Tech Stack

**Backend**
- Python 3.11+
- Flask 2.x
- Scikit-learn, Pandas, NumPy

**Frontend**
- Vanilla HTML / CSS / JavaScript
- Plotly.js (interactive light curve charts)
- Plus Jakarta Sans + Inter (Google Fonts)

**ML Pipeline**
- Random Forest Classifier
- SimpleImputer (median strategy)
- StandardScaler normalization

---

## Project Structure

```
exoplanet-detector-ai/
│
├── model/
│   ├── random_forest_model.pkl   # Trained RF classifier
│   ├── scaler.pkl                # Feature scaler
│   └── imputer.pkl               # Median imputer
│
├── static/
│   ├── style.css                 # Glassmorphic UI with light/dark theme
│   └── scripts.js                # Animations, parallax, gauge, toasts, history
│
├── templates/
│   └── index.html                # Single-page app with 3 navigable pages
│
├── train_model.py                # Model training script
├── app.py                        # Flask backend & /predict API
├── exoplanets.csv                # NASA Kepler dataset
├── requirements.txt
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/akshaywesleykothapalli/exoplanet-detector-ai.git
cd exoplanet-detector-ai
```

### 2. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. (Optional) Retrain the model

```bash
python3 train_model.py
```

> The repository already includes pre-trained model artifacts in `/model`. Skip this step unless you want to retrain on fresh data.

### 5. Run the app

```bash
python3 app.py
```

### 6. Open in your browser

```
http://127.0.0.1:5050/
```

---

## Sample Test Values

| Preset | Orbital Period | Planet Radius | Transit Depth | Duration | Eccentricity |
|---|---|---|---|---|---|
| **Earth-like** | 365.25 | 1.0 | 0.000084 | 13.0 | 0.017 |
| **Kepler-452b** | 384.84 | 1.63 | 0.00021 | 10.5 | 0.03 |
| **TRAPPIST-1e** | 6.10 | 0.92 | 0.0048 | 1.0 | 0.007 |
| **Hot Jupiter** | 1.09 | 19.0 | 0.015 | 3.0 | 0.0 |
| **Eclipsing Binary** | 2.4 | 28.0 | 0.18 | 48.0 | 0.45 |

---

## Research References

- [NASA Exoplanet Archive — Kepler Cumulative KOI](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative)
- [NASA Exoplanet Archive — TESS Objects of Interest](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI)
- [NASA Exoplanet Archive — K2 Planets & Candidates](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2pandc)
- [MNRAS: Machine Learning in Exoplanet Detection (2022)](https://academic.oup.com/mnras/article/513/4/5505/6472249)
- [MDPI Electronics: Deep Learning for Transit Photometry (2024)](https://www.mdpi.com/2079-9292/13/19/3950)

---

## Author

**Akshay Wesley Kothapalli** — ML & Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-akshaywesleykothapalli-181717?style=flat-square&logo=github)](https://github.com/akshaywesleykothapalli)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Akshay_Wesley-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/akshay-wesley-kothapalli-966738378)

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and build on it.

---

<div align="center">

⭐ **If you found this project interesting, give it a star on GitHub!**

</div>
