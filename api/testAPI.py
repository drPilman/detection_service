import requests
from URL_class import URL

url = URL()
url.url = 'http://not_fishing_site/'
requests.post('http://127.0.0.1:8000/url', url.url)