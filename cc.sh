isMerge=$1

echo "isMerge: $isMerge"

if [ $isMerge == "yes" ]; then
  echo "merge"
else
  echo "not merge"
fi