import requests
import os

scrape_key = os.environ['SCRAPE_KEY']
payload = {'key': scrape_key}
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

response = requests.put('https://apw.locrian24.now.sh/api/scrape', headers = headers, json = payload)

print(response)

