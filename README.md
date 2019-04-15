# GarageControl
Control a garage door via HTTP requests and a raspberry pi

## Environment
- `SECRET`: Secret phrase to provide for super secure authentication. Provide this as a query parameter
  - e.g. `http://localhost:3000/?secret=secret`
- `PORT`: Port on which to listen for requests
- `RELAY_PIN`: GPIO pin connected to the relay module
- `SENSOR_PIN`: GPIO pin connected to the sensor/reed switch

## Installing, Deploying
`npm install`

`npm start`

## API
| Type | Endpoint | Description               | Result                                 |
|------|----------|---------------------------|----------------------------------------|
| GET  | /open    | Open garage door          | 200 OPENING <br> 400 Garage already open!   |
| GET  | /close   | Close garage door         | 200 CLOSING <br> 400 Garage already closed! |
| GET  | /state   | Get current garage status | 200 CLOSED | OPEN | CLOSING | OPENING  |

## Running as a Service
Roughly follow this guide: https://gist.github.com/joepie91/73ce30dd258296bd24af23e9c5f761aa

Create user: 

`sudo useradd garage-control`

Install nvm and node:

```
sudo su garage-control
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm use stable
```

Install the service:

```
echo -e "SECRET=mysecret\nPORT=myport" > garage.env
sudo cp garage-control.service /etc/systemd/system/my-application.service
chmod +x start.sh
sudo systemctl enable my-application
sudo systemctl start my-application
```


## Troubleshooting
I had to run the following commands in order to resolve permission errors:

```
sudo chown -R root:gpio /sys/class/gpio && sudo chmod -R 770 /sys/class/gpio;\
sudo chown -R root:gpio /sys/devices/virtual/gpio && sudo chmod -R 770 /sys/devices/virtual/gpio;\
sudo chown -R root:gpio /sys$devpath && sudo chmod -R 770 /sys$devpath
```

## TODO
Implement basic authentication
