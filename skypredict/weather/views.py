import requests
import json
from django.shortcuts import render

API_KEY = '0f5c1fec3b2dfd2a082265e1bc9bda0e'   # 🔑 put your API key

def index(request):
    city = request.GET.get('city', 'Kolkata')

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"

    try:
        data = requests.get(url).json()
        forecast_data = requests.get(forecast_url).json()
    except:
        return render(request, 'index.html', {
            'error': 'API connection error!',
            'forecast': [],
            'forecast_json': json.dumps([])
        })

    forecast_list = []

    if forecast_data.get('list'):
        for i in forecast_data['list'][::8][:5]:
            forecast_list.append({
                'date': i['dt_txt'].split()[0],
                'temp': i['main']['temp'],
                'icon': i['weather'][0]['icon'],
            })

    if str(data.get('cod')) != "200":
        return render(request, 'index.html', {
            'city': city,
            'error': 'City not found!',
            'forecast': [],
            'forecast_json': json.dumps([])
        })

    context = {
    'city': data.get('name'),   # ✅ Correct city from API

    'temperature': round(data.get('main', {}).get('temp', 0), 1),
    'humidity': data.get('main', {}).get('humidity'),
    'wind': data.get('wind', {}).get('speed'),

    'description': data.get('weather', [{}])[0].get('description'),
    'icon': data.get('weather', [{}])[0].get('icon'),

    # 🔥 IMPORTANT FIX
    'condition': data.get('weather', [{}])[0].get('main'),

    'forecast': forecast_list,
    'forecast_json': json.dumps(forecast_list)
}

    return render(request, 'index.html', context)