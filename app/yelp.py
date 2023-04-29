import requests
import json

api_key= 'lqV8h9Ut1h-q5K49ZDz0Dv9t2ZwFZVZ6HI-DjWTr9TXqMFlzO5NbDbxMoSqJPJVNIaMYND6qTYtWqeUtraucXy0sQ943Yvi3fAfqAgKMF9DYB-eYKnkxMyRbiFFNZHYx'

#where you are/start/currently reside
lat = 33.975756978566686
long = -117.3389807714277
rad = 1609

headers = {'Authorization': 'Bearer {}'.format(api_key)}
search_api_url = "https://api.yelp.com/v3/businesses/search?latitude={}&longitude={}&radius={}".format(lat, long, rad)
params = {'term': 'coffee', 'location': 'Toronto, Ontario','limit': 50}

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

# import requests
# import json

# api_key = 'lqV8h9Ut1h-q5K49ZDz0Dv9t2ZwFZVZ6HI-DjWTr9TXqMFlzO5NbDbxMoSqJPJVNIaMYND6qTYtWqeUtraucXy0sQ943Yvi3fAfqAgKMF9DYB-eYKnkxMyRbiFFNZHYx'

# lat = 37.7749
# long = -122.4194 
# rad = 500

# headers = {'Authorization': 'Bearer {}'.format(api_key)}
# search_api_url = "https://api.yelp.com/v3/businesses/search?latitude={}&longitude={}&radius={}".format(lat, long, rad)
# params = {'term': 'coffee', 'location': 'California, Riverside','limit': 50}

# response = requests.get(search_api_url, headers=headers, params=params, timeout=5)

# if response.status_code == 200:
#     data = response.json()
#     if 'businesses' in data:
#         businesses = data['businesses']
#         if len(businesses) > 0:
#             first_business = businesses[0]
#             location = {
#                 'name': first_business['name'],
#                 'city': first_business['location']['city'],
#                 'address': first_business['location']['address1'],
#                 'coordinates': {
#                     'latitude': first_business['coordinates']['latitude'],
#                     'longitude': first_business['coordinates']['longitude']
#                 }
#             }
#             with open('location.json', 'w') as f:
#                 json.dump(location, f, indent=4)
#     else:
#         print("No businesses found.")
# else:
#     print("Request failed with status code: {}".format(response.status_code))

# import requests
# import json

# api_key= 'lqV8h9Ut1h-q5K49ZDz0Dv9t2ZwFZVZ6HI-DjWTr9TXqMFlzO5NbDbxMoSqJPJVNIaMYND6qTYtWqeUtraucXy0sQ943Yvi3fAfqAgKMF9DYB-eYKnkxMyRbiFFNZHYx'

# #where you are/start/currently reside
# lat = 33.975756978566686
# long = -117.3389807714277

# headers = {'Authorization': 'Bearer {}'.format(api_key)}
# search_api_url = "https://api.yelp.com/v3/businesses/search?latitude={}&longitude={}&radius=1609".format(lat, long)
# params = {'term': 'coffee', 'location': 'Toronto, Ontario','limit': 50}

# response = requests.get(search_api_url, headers=headers, params=params, timeout=5)

# data = json.loads(response.text)

# for business in data['businesses']:
#     print("Latitude: {}, Longitude: {}".format(business['coordinates']['latitude'], business['coordinates']['longitude']),
#           business['name'], 
#           business['location']['address1'], 
#           business['location']['city'])

