import requests
import json

url = "http://localhost:3005/api/chart"
payload = {
    "date": "1990-01-01",
    "time": "12:00",
    "location": "Warsaw"
}

try:
    response = requests.post(url, json=payload)
    data = response.json()
    print(f"Houses Key Exists: {'houses' in data}")
    print(f"Cusps Length: {len(data['houses']['cusps'])}")
    print(f"Ascendant: {data['houses']['ascendant']}")
    print(f"Cusp 1: {data['houses']['cusps'][0]}")
except Exception as e:
    print(f"Error: {e}")
