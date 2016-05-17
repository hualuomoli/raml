#!/bin/sh

echo 'filepath:$1'
echo 'filename:$2'

cd $1

raml2html $2.raml > $2.html