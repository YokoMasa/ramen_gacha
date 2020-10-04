import os

ENV_GCP_KEY = "GCP_KEY"

def search_ramen(request):
    if  ENV_GCP_KEY not in os.environ:
        return "error"

    return {"text": "hello"}