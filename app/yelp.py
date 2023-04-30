import requests
import json

api_key = 'YA161LE1yz6X6GDKlKM8K1SDYTQv8XwYCsTPPZ2sSIphzVz2xvkcD5czI24KRfKvtY_vY1zHj-vF1A-K2Ts1C3BOM9C4CIFMgxXVQtSRIhZgxQ_wWX0mGiODIKZNZHYx'

#where you are/start/currently reside
# lat = 33.975756978566686
# long = -117.3389807714277
# rad = 1609

categories = "Active Life, Arts & Entertainment,Food, Hotels & Travel,Nightlife, Restaurants, Shopping"

def around(lat,long,rad):
    headers = {'Authorization': 'Bearer {}'.format(api_key)}
    search_api_url = "https://api.yelp.com/v3/businesses/search?latitude={}&longitude={}&radius={}&categories={}".format(lat, long, rad, categories)
    params = {'term': 'coffee','limit': 50}

    response = requests.get(search_api_url, headers=headers, params=params, timeout=5)

    data = json.loads(response.text)

    results = []
    for business in data['businesses']:
        result = {}
        result['name'] = business['name']
        result['city'] = business['location']['city']
        result['address'] = business['location']['address1']
        result['coordinates'] = [business['coordinates']['latitude'], business['coordinates']['longitude']]
        results.append(result)

    with open('location.json', 'w') as f:
        json.dump(results, f, indent=4)

    return results

