CURR_DIR=$(cd "$(dirname "$0")"; pwd)

echo "git remote -v"
echo `git remote -v`

gitName=`grep -E "url = .*.git" $CURR_DIR/.git/config|awk -F 'qiushaocloud/' '{print $2}'`
echo "gitName: $gitName"

# 切换成 github 远程仓库
echo "推送到 github: git@github.com:qiushaocloud/$gitName"
git remote set-url origin git@github.com:qiushaocloud/$gitName

# 切换到 source-code-main 分支拉取代码
echo "切换到 source-code-main 分支拉取代码"
git checkout -b source-code-main origin/source-code-main || git checkout source-code-main
git pull origin source-code-main

# 切换到 develop 分支，拉取最新代码，合并 source-code-main 分支代码
echo "切换到 develop 分支"
git checkout -b develop origin/develop || git checkout develop
git pull origin develop

echo "合并 source-code-main 分支代码"
git merge source-code-main

# 提交合并的代码
echo "提交合并的代码"
git add .
git commit -m "merge source-code-main to develop"

# 提交代码到 develop 分支
echo "推送到 github: git@github.com:qiushaocloud/$gitName"
echo "提交代码到 develop 分支"
git push origin develop

# 推送到自建的 gitlab
echo "推送到自建的 gitlab: ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName"
git remote set-url origin ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName
git push