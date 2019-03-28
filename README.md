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