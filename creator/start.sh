#!/bin/sh

cur_path=$(cd "$(dirname "$0")"; pwd)
echo $cur_path


node $cur_path/app.js --port 3000 --scriptSuffix sh >> $cur_path/log.log 2>&1 &