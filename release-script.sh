#!/usr/bin/env sh

newversion=${1:-patch}
version=$(npm --no-git-tag-version version ${newversion} | sed -e s/^v//)
branch="release/${version}"

git checkout -b ${branch}
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

git add test/ss_to_json.js
git commit -m "Commit upgrade to v${version}"
git push origin ${branch}

git tag -a v${version} -m v${version}

echo "Please run 'git push origin v${version}' after merging release branch."
