import os

import requests

ENV_GCP_KEY = "GCP_KEY"

PARAMS_LATLNG = "latlng"
PARAMS_RADIUS = "radius"
PARAMS_SEARCH_TYPE = "search_type"

KEYWORD_MAPPING = {
    "ramen": "ラーメン",
    "cafe": "カフェ"
}

PLACE_API_ENDPOINT = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

def search_ramen(request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    if  ENV_GCP_KEY not in os.environ:
        return ({"error": "internal error"}, 404)
    
    if PARAMS_LATLNG not in request.args:
        return ({"error": "no latlng"}, 404)

    latlng = request.args[PARAMS_LATLNG]
    radius = request.args[PARAMS_RADIUS] if PARAMS_RADIUS in request.args else 500
    search_type = request.args[PARAMS_SEARCH_TYPE] if PARAMS_SEARCH_TYPE in request.args else "ramen"

    if search_type not in KEYWORD_MAPPING:
        return ({"error": "unknown search type"}, 404)

    params = {
        "key": os.environ[ENV_GCP_KEY],
        "language": "ja",
        "type": "restaurant",
        "location": latlng,
        "keyword": KEYWORD_MAPPING[search_type],
        "radius": radius
    }
    r = requests.get(PLACE_API_ENDPOINT, params=params)

    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    return (r.content, 200, headers)