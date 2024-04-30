CURR_DIR=$(cd "$(dirname "$0")"; pwd)

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
git push origin develop

# 推送到 master 分支
echo "推送到 master 分支"
git checkout -b master origin/master || git checkout master
git pull origin master
git push origin master
