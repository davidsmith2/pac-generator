# deploy.sh
#!/usr/local/bin/grunt

SHA1=$1
AWS_ACCESS_KEY_ID=$2
AWS_SECRET_ACCESS_KEY=$3

# push server
docker-compose push davidsmith2/pac-generator-server:"$SHA1"

# push client
docker-compose push davidsmith2/pac-generator-client:"$SHA1"

# deploy
./node_modules/.bin/grunt deploy \
	--SHA1="$SHA1" \
	--AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
	--AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
