#!/usr/bin/env sh

red="\033[0;31m"
green="\033[0;32m"
blue="\033[0;34m"
color_off="\033[0;39m"

### checkout master
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

### Confirm diff before committing
echo ${green}
echo "============"
echo "$(git diff)"
echo "============"
echo ${color_off}

while true;do
  echo -n ${red}
  echo "Please check the difference.\nIs it OK to go through git push with this difference?\nType yes or no."
  echo ${color_off}
  read answer
  case $answer in
    yes)
      break
      ;;
    no)
      echo ${blue}
      echo "Please execute the following command after correcting\n" \
        "% git add .\n" \
        "% git commit -m 'Commit upgrade to v${version}'\n" \
        "% git push origin ${branch}\n" \
        "% git tag -a v${version} -m '${changelog}'\n"
      echo ${color_off}
      exit
      ;;
    *)
      echo "cannot understand $answer.\n"
      ;;
  esac
done

### git commit & git push
git add test/ss_to_json.js package.json CHANGELOG.md
git commit -m "Commit upgrade to v${version}"
git push origin ${branch}

### Add tags locally
git tag -a v${version} -m "${changelog}"

echo ${blue}
echo "Please run 'git push origin v${version}' after merging release branch."
echo ${color_off}
