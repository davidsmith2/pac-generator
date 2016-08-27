# deploy.sh
#!/usr/local/bin/grunt

SHA1=$1
AWS_ACCESS_KEY_ID=$2
AWS_SECRET_ACCESS_KEY=$3

docker push davidsmith2/pac-generator:"$SHA1"

docker exec -it "$(docker ps -q)" /usr/local/bin/grunt deploy \
	--SHA1="$SHA1" \
	--AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
	--AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"
