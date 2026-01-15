import pandas as pd
import numpy as np
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# ============================
# 📁 Setup
# ============================
os.makedirs("model", exist_ok=True)

print("📥 Loading dataset...")
df = pd.read_csv("exoplanets.csv")

# ============================
# 🎯 Selected Features (MUST MATCH FRONTEND)
# ============================
FEATURES = [
    "orbital_period",
    "planet_radius",
    "transit_depth",
    "transit_duration",
    "eccentricity"
]

TARGET = "confirmed"

X = df[FEATURES]
y = df[TARGET]

# ============================
# 🧹 Handle Missing Values
# ============================
print("🧹 Handling missing values...")
imputer = SimpleImputer(strategy="mean")
X_imputed = imputer.fit_transform(X)

# ============================
# 📏 Scale Features
# ============================
print("📏 Scaling features...")
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_imputed)

# ============================
# 🔀 Train/Test Split
# ============================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# ============================
# 🌲 Train Random Forest
# ============================
print("🌲 Training Random Forest...")
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# ============================
# 📊 Evaluation
# ============================
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("\n✅ Model trained successfully!")
print(f"🎯 Accuracy: {accuracy:.4f}")
print("\n📄 Classification Report:")
print(classification_report(y_test, y_pred))

# ============================
# 💾 Save Artifacts
# ============================
print("\n💾 Saving model & preprocessors...")
joblib.dump(model, "model/random_forest_model.pkl")
joblib.dump(imputer, "model/imputer.pkl")
joblib.dump(scaler, "model/scaler.pkl")

print("✅ Files saved in /model/")
