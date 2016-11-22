# deploy.sh
#!/usr/local/bin/grunt

SHA1=$1
AWS_ACCESS_KEY_ID=$2
AWS_SECRET_ACCESS_KEY=$3
DOCKER_EMAIL=$4
DOCKER_USERNAME=$5
DOCKER_PASSWORD=$6

# login
docker login -e "$DOCKER_EMAIL" -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"

# push
docker-compose -f docker-compose.production.yml push

# deploy
./node_modules/.bin/grunt deploy \
	--SHA1="$SHA1" \
	--AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
	--AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
