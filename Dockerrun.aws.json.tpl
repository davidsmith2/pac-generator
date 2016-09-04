{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "davidsmith2/pac-generator:XXX",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": "8081"
    }
  ],
  "Volumes": [
    {
      "HostDirectory": ".",
      "ContainerDirectory": "/home/app/pac-generator"
    },
    {
      "ContainerDirectory": "/home/app/pac-generator/node_modules"
    }
  ]  
}