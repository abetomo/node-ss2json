#!/usr/bin/env sh

### Increment version
version_option=${1:-patch}
version=$(npm --no-git-tag-version version ${version_option} | sed -e s/^v//)

### Add to CHANGELOG.md
current_version=$(npm version from-git | sed -e s/^v//)
echo "## [${version}] - $(date +%Y-%m-%d)" >> CHANGELOG.md
# Assumption that squash merging is done
git log v${current_version}.. | grep '(#[0-9]*)' | sed -e 's/^\s*/- /g' >> CHANGELOG.md

### Automatic correction of test code by creating branch
branch="release/${version}"
git checkout -b ${branch}
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

### git commit & git push
git add test/ss_to_json.js package.json CHANGELOG.md
git commit -m "Commit upgrade to v${version}"
git push origin ${branch}

### Add tags locally
git tag -a v${version} -m v${version}

echo "Please run 'git push origin v${version}' after merging release branch."
