#!/bin/sh

cur_path=$(cd "$(dirname "$0")"; pwd)
echo $cur_path


node $cur_path/app.js >> $cur_path/log.log 2>&1 &