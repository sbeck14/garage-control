#!/bin/bash

# Load NVM
. /home/garage-control/.nvm/nvm.sh

# Pull latest changes
cd /home/garage-control/garage-control/
git pull
npm install

# Start garage control
npm start