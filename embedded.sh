#!/bin/bash
cd build
cp index.html index-copy.html
gzip -f index.html
mv index-copy.html index.html
cd ..
mkdir build/out
node create-progem.js
mkdir -p ../src/static
cp build/out/index.html.gz.h ../src/static/
