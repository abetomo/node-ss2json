#!/usr/bin/env sh

git checkout master
git pull

### Increment version
version_option=${1:-patch}
version=$(npm --no-git-tag-version version ${version_option} | sed -e s/^v//)

### Add to CHANGELOG.md
current_tag=$(git tag --sort=-taggerdate | head -1 | sed -e s/^v//)
echo "## [${version}] - $(date +%Y-%m-%d)" >> CHANGELOG.md
# Assumption that squash merging is done
changelog=$(git log v${current_tag}.. | grep '(#[0-9]*)' | sed -e 's/^\s*/- /g' | tee -a CHANGELOG.md)

### Automatic correction of test code by creating branch
branch="release/${version}"
git checkout -b ${branch}
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

### git commit & git push
git add test/ss_to_json.js package.json CHANGELOG.md
git commit -m "Commit upgrade to v${version}"
git push origin ${branch}

### Add tags locally
git tag -a v${version} -m "${changelog}"

echo "Please run 'git push origin v${version}' after merging release branch."
