#!/bin/bash

npm run build

cd ./build

rm -rf index.html
rm -rf robots.txt
rm -rf service-worker.js