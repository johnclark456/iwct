#!/bin/bash -x

files=$(find ./ -iname "*$1*")

for f in $files; do
  gm convert -rotate -90 "$f" "$f"
done