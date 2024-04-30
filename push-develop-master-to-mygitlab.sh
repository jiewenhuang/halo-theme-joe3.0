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
if [ "$isMasterMerge2Develop" == "yes" ]; then
  echo "合并 master 分支到 develop 分支"
    git checkout -b develop origin/master || git checkout master
    git pull origin master
    git checkout -b develop origin/develop || git checkout develop
    git merge master
    # 提交 master to develop 合并的代码
    echo "提交 master to develop 合并的代码"
    git add .
    git commit -m "merge master to develop" --no-verify
fi
git push origin develop

# 推送到 master 分支
echo "推送到 master 分支"
git checkout -b master origin/master || git checkout master
git pull origin master
if [ "$isDevelopMerge2Master" == "yes" ]; then
    echo "合并 develop 分支到 master 分支"
    git merge develop
    # 提交 develop to master 合并的代码
    echo "提交 develop to master 合并的代码"
    git add .
    git commit -m "merge develop to master" --no-verify
fi
git push origin master
