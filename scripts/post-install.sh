#!/usr/bin/env bash


cd /home/ec2-user/sgbus
npm install
webpack --config ./webpack.prod.config.js --progress --colors