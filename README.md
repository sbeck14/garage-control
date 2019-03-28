# GarageControl

## Environment
- `SECRET`: Secret phrase to provide for super secure authentication. Provide this as a query parameter
  - e.g. `http://localhost:3000/?secret=secret`
- `PORT`: Port on which to listen for requests
- `RELAY_PIN`: GPIO pin connected to the relay module
- `SENSOR_PIN`: GPIO pin connected to the sensor/reed switch

## Installing, Deploying
`npm install`

`npm start`

## Troubleshooting
I had to run the following commands in order to resolve permission errors:

```
sudo chown -R root:gpio /sys/class/gpio && sudo chmod -R 770 /sys/class/gpio;\
sudo chown -R root:gpio /sys/devices/virtual/gpio && sudo chmod -R 770 /sys/devices/virtual/gpio;\
sudo chown -R root:gpio /sys$devpath && sudo chmod -R 770 /sys$devpath
```