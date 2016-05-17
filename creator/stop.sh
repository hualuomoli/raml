#!/bin/sh

cur_path=$(cd "$(dirname "$0")"; pwd)
echo $cur_path

ps -ef|grep node|grep $cur_path/app.js|grep -v grep|awk '{print $2}'|xargs kill -9