#!/usr/bin/env sh

branch=${TRAVIS_BRANCH}

### check branch
echo ${branch} | grep 'release'
if [ $? -ne 0 ]; then
    echo "[${branch}] It is not a target branch"
    exit 0
fi

### ssh settings
openssl aes-256-cbc -K ${encrypted_8b68e74ad801_key} -iv ${encrypted_8b68e74ad801_iv} -in ".travis/github_deploy_key.enc" -out github_deploy_key -d
$(npm bin)/set-up-ssh --key ${encrypted_8b68e74ad801_key} --iv ${encrypted_8b68e74ad801_iv} --path-encrypted-key ".travis/github_deploy_key.enc"

### git settings
git config --global user.email "${GH_USER_EMAIL}"
git config --global user.name "${GH_USER_NAME}"

### check version
new_version=$(echo ${branch} | cut -d/ -f2)
current_version=$(node -e 'console.log(require("./package.json").version)')
if [ "${new_version}" = "${current_version}" ]; then
    echo "[${new_version}] It is already released."
    exit 0
fi

### Clone working repository
echo 'Clone working repository'
git clone git@github.com:abetomo/node-ss2json.git -b "${branch}"
cd node-ss2json

### Update version
version=$(npm --no-git-tag-version version ${new_version} | sed -e s/^v//)

### Add to CHANGELOG.md
current_tag=$(git for-each-ref --sort=-taggerdate --format='%(tag)' refs/tags | head -1 | sed -e s/^v//)
echo "## [${version}] - $(date +%Y-%m-%d)" | tee -a CHANGELOG.md
# Assumption that squash merging is done
changelog=$(git log v${current_tag}.. | grep '(#[0-9]*)' | sed -e 's/^\s*/- /g' | sed -e '$d' | tee -a CHANGELOG.md)
echo ${changelog}

### Automatic correction of test code
sed -i -e "s/\(const packageVersion =\).\+/\1 '${version}'/" test/ss_to_json.js

### git commit & git push On the release branch
git add test/ss_to_json.js package.json CHANGELOG.md
git commit -m "Commit upgrade to v${version}"
git push

### Merge into master
git checkout master
git merge ${branch}
git push

### Tagging
git tag -a v${version} -m "${changelog}"
git push origin v${version}

cd ..
git pull
rm -rf github_deploy_key node-ss2json
