CURR_DIR=$(cd "$(dirname "$0")"; pwd)

echo "git remote -v"
echo `git remote -v`

echo "cp config"
cp -ra $CURR_DIR/.git/config $CURR_DIR/.git/config.bak

gitName=`grep -E "url = .*.git" $CURR_DIR/.git/config|awk -F 'qiushaocloud/' '{print $2}'`
echo "gitName: $gitName"

# 推送到 gitee
echo "推送到 gitee: git@gitee.com:qiushaocloud/$gitName"
git remote set-url origin git@gitee.com:qiushaocloud/$gitName
git push

# 推送到 github
echo "推送到 github: git@github.com:qiushaocloud/$gitName"
git remote set-url origin git@github.com:qiushaocloud/$gitName
git push

# 推送到 gitlab
echo "推送到 gitlab: git@gitlab.com:qiushaoyumeng/$gitName"
git remote set-url origin git@gitlab.com:qiushaoyumeng/$gitName
git push

# 推送到 gitcode
echo "推送到 gitcode: git@gitcode.net:qiushaocloud/$gitName"
git remote set-url origin git@gitcode.net:qiushaocloud/$gitName
git push

# 推送到自建的 gitea
# echo "推送到自建的 gitea: ssh://git@gitea.qiushaocloud.top:61322/qiushaocloud/$gitName"
# git remote set-url origin ssh://git@gitea.qiushaocloud.top:61322/qiushaocloud/$gitName
# git push

# 推送到自建的 gitlab
echo "推送到自建的 gitlab: ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName"
git remote set-url origin ssh://git@gitlab.qiushaocloud.top:61023/qiushaocloud/$gitName
git push

echo "mv config"
mv $CURR_DIR/.git/config.bak $CURR_DIR/.git/config
