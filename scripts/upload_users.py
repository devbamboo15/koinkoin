import json
import requests

with open('./upload_users.json') as f:
  data = json.load(f)

headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjEsImVtYWlsIjoiby5hdG9zZUBzamZpbmFuem1hbm4uY29tIiwibmV0d29ya0lkIjoxMzUwfSwic2NvcGVzIjpbInVzZXIiLCJobWFjIiwiYWRtaW4iXSwiaXAiOiI4OS4xODcuMTYxLjIyMCIsImlzcyI6ImhvbGxhZXguY29tIiwiaWF0IjoxNjEzNjQwODIyLCJleHAiOjE2MTM3MjcyMjJ9.iTUjul20R3LH3yopUgEebb0rZhXL9-Ozp26RvjRFxJI"
}
url = "https://api.koinkoin.io/plugins/upload-users"
start = 120
step = 30
stop = len(data)


for i in range(start, stop, step):
    print("%s:%s" % (i, step))
    payload = {"users":data[i:i+step]}
    r = requests.post(url, json=payload, headers=headers)
    print("Response: [%s] %s" % (r.status_code, r.text))