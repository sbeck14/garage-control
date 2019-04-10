const express = require('express');
const assert = require('assert');
const Gpio = require('onoff').Gpio;
const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET;
const relayPin = process.env.RELAY_PIN || 17;
const sensorPin = process.env.SENSOR_PIN || 23;

assert.ok(process.env.SECRET, 'SECRET environment variable is required.');

const relay = new Gpio(relayPin, 'out');
const sensor = new Gpio(sensorPin, 'in');

let isClosing = false;
let isOpening = false;

function toggleRelay() {
  relay.writeSync(1);
  setTimeout(() => relay.writeSync(0), 1000);
}

const getSwitchState = () => {
  if (isClosing) {
    return 'CLOSING';
  } else if (isOpening) {
    return 'OPENING';
  } else if (sensor.readSync() === 1) {
    return 'CLOSED';
  } else {
    return 'OPEN';
  }
}

// Use super basic/insecure secret authentication
app.use((req, res, next) => {
  if (secret !== req.query.secret) {
    res.sendStatus(401);
  } else { 
    next();
  }
});

app.get('/open', (req, res) => {
  console.log(`Received 'GET /open' from ${req.ip}`);
  if (getSwitchState() === 'CLOSED' || (req.query.force && req.query.force === 'true')) {
    console.log('Opening garage door...');
    toggleRelay();
    console.log('Setting state to OPENING');
    isOpening = true;
    setTimeout(() => { 
      console.log('Setting state to OPEN');
      isOpening = false; 
    }, 15000);
    res.send('OPENING');
    res.status(200);
  } else {
    console.log('Garage already open!');
    res.send('Garage already open!');
    res.sendStatus(400);
  }
});

app.get('/close', (req, res) => {
  console.log(`Received 'GET /close' from ${req.ip}`);
  if (getSwitchState() === 'OPEN' || (req.query.force && req.query.force === 'true')) {
    console.log('Closing garage door...');
    toggleRelay();
    console.log('Setting state to CLOSING');
    isClosing = true;
    setTimeout(() => { 
      isClosing = false; 
      console.log('Setting state to CLOSED');
    }, 15000);
    res.send('CLOSING');
    res.status(200);
  } else {
    console.log('Garage already closed!');
    res.send('Garage already closed!');
    res.sendStatus(400);
  }
});

app.get('/state', (req, res) => {
  console.log(`Received 'GET /state' from ${req.ip}`);
  console.log(`Garage is ${getSwitchState()}`);
  res.send(getSwitchState());
  res.status(200);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));