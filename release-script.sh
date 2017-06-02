#!/usr/bin/env sh

branch=$(git rev-parse --abbrev-ref HEAD)

git clone git@github.com:abetomo/node-ss2json.git -b ${branch}
cd node-ss2json
git config --global user.email "${GH_USER_EMAIL}"
git config --global user.name "${GH_USER_NAME}"

### Increment version
version_option=${1:-patch}
version=$(npm --no-git-tag-version version ${version_option} | sed -e s/^v//)

### Add to CHANGELOG.md
current_tag=$(git for-each-ref --sort=-taggerdate --format='%(tag)' refs/tags | head -1 | sed -e s/^v//)
echo "## [${version}] - $(date +%Y-%m-%d)" >> CHANGELOG.md
# Assumption that squash merging is done
changelog=$(git log v${current_tag}.. | grep '(#[0-9]*)' | sed -e 's/^\s*/- /g' | sed -e '$d' | tee -a CHANGELOG.md)

### Automatic correction of test code
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

### git commit & git push
git add test/ss_to_json.js package.json CHANGELOG.md
git commit -m "Commit upgrade to v${version}"
git push

### Merge into master
git checkout master
git merge ${branch}
git push

cd ..
git pull
rm -rf github_deploy_key node-ss2json
