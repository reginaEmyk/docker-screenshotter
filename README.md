A dockerized pupeteer screenshotter API. Receives an url and returns a screenshot.

## Requirements
Docker

### Build/run api
docker build . -t screenshotter && docker run -p 8080:8080 screenshotter

### API call Example

curl -X POST http://localhost:8080/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://halfwaypint.london"}' \
  --output screenshot.png


curl -X POST http://localhost:8080/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://aespa.com"}' \
  --output screenshot.png


## Known problems
No screenshot is returned if the url takes longer than 30000 to load, due to Navigation timeout in src/routes/screenshot. 
You may alter that by increasing pupeteer timeout 
