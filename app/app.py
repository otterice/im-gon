# from flask import Flask

# app = Flask(__name__)

# @app.route('/', methods=['GET', 'POST'])
# def welcome():
#     return "Hello World!"

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=105)

# from flask import Flask
# import requests
# import json
# import yelp

# app = Flask(__name__)

# @app.route('/hello/', methods=['GET', 'POST'])
# def welcome():
#     return "Hello World!"

# @app.route('/coffee-shops/', methods=['GET'])
# def coffee_shops():
#     lat = 37.7749
#     long = -122.4194
#     api_response = yelp.around(lat, long,169)
#     print(api_response)
#     return api_response

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=105)

from flask import Flask, jsonify
import yelp

app = Flask(__name__)

@app.route('/coffee-shops/', methods=['GET'])
def coffee_shops():
    lat = 37.7749
    long = -122.4194
    results = yelp.around(lat, long, 169)
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)