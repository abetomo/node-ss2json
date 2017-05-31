#!/usr/bin/env sh

version=$(git tag -l | tail -n1 | sed -e s/^v//)
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

git push origin $(git tag -l | tail -n1)
