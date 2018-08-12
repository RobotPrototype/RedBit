#!/bin/bash

export NODE_PATH="./js"

for file in ./js/test/*.test.js
do
  echo ""
  echo "Running test file $file"
  echo ""
  nodejs "$file"
  exit_code=$?

  if [ $exit_code -eq 0 ]
  then
    echo ""
    echo "SUCCESS"
    echo ""
  else
    echo ""
    echo "FAILURE"
    echo ""
  fi
done
