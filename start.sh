#!/bin/bash


if [ $1 = "kill" ]; then
    pkill -f ./node_modules
    pkill -f nodemon
    pkill -f server.js
else
    npm install
    npm run apiServer &
    npm run dev &
    cd public
    npm start &
    trap "echo hello" SIGINT &
    sleep 100
    cd .. & exit 0
fi

