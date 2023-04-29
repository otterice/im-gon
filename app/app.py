from flask import Flask, jsonify
import yelp

app = Flask(__name__)

@app.route('/', methods=['GET'])
def nearby_fun(): 
    lat = 33.975600
    long = -117.357151
    results = yelp.around(lat, long, 1690)
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)