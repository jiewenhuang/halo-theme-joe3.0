CURR_DIR=$(cd "$(dirname "$0")"; pwd)

isDevelopMerge2Master=$1
isMasterMerge2Develop=$2

echo "isDevelopMerge2Master: $isDevelopMerge2Master"
echo "isMasterMerge2Develop: $isMasterMerge2Develop"

echo "git remote -v"
echo `git remote -v`

gitName=`grep -E "url = .*.git" $CURR_DIR/.git/config|awk -F 'qiushaocloud/' '{print $2}'`
echo "gitName: $gitName"

# 推送到自建的 gitlab
echo "推送到自建的 gitlab: ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName"
git remote set-url origin ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName

# 推送到 develop 分支
echo "推送到 develop 分支"
git checkout -b develop origin/develop || git checkout develop
git pull origin develop
if [ "$isMasterMerge2Develop" == "true" ]; then
  echo "合并 master 分支到 develop 分支"
    git checkout -b develop origin/master || git checkout master
    git pull origin master
    git checkout -b develop origin/develop || git checkout develop
    git merge master
fi
git push origin develop

# 推送到 master 分支
echo "推送到 master 分支"
git checkout -b master origin/master || git checkout master
git pull origin master
if [ "$isDevelopMerge2Master" == "true" ]; then
  echo "合并 develop 分支到 master 分支"
  git merge develop
fi
git push origin master
