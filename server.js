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

function toggleRelay() {
  relay.writeSync(1);
  setTimeout(() => relay.writeSync(0), 1000);
}

const getSwitchState = () => sensor.readSync() === 0 ? 'closed' : 'open';

// Use super basic/insecure secret authentication
app.use((req, res, next) => {
  if (secret !== req.query.secret) {
    res.sendStatus(401);
  } else { 
    next();
  }
});

app.get('/open', (req, res) => {
  if (getSwitchState() === 'closed') {
    toggleRelay();
  }
  res.sendStatus(200);
});

app.get('/close', (req, res) => {
  if (getSwitchState() === 'open') {
    toggleRelay();
  }
  res.sendStatus(200);
});

app.get('/state', (req, res) => {
  res.send(getSwitchState());
  res.status(200);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));