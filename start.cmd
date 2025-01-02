docker-compose kill swtp-server swtp-frontend swtp-frontend-debug swtp-database
docker-compose build
docker-compose up -d swtp-server swtp-frontend swtp-frontend-debug swtp-database
docker image prune -f
pause