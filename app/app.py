from flask import Flask, jsonify, request
import yelp

app = Flask(__name__)

@app.route('/ycyrc', methods=['GET'])
def nearby_fun(): 
    start_lat = request.args.get('startLat')
    start_long = request.args.get('startLong')
    end_lat = request.args.get('endLat')
    end_long = request.args.get('endLong')
    # Use the inputted coordinates to get Yelp results
    results = yelp.around(start_lat, start_long, 1690)

    print("test")
    print(start_lat,start_long,end_lat,end_long)

    return jsonify(results)

    




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)

