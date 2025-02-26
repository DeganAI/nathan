#!/bin/bash

# nathan’s cleanup crew—torching the grind, one dir at a time

# stamp the mission start
echo "[$(date '+%Y-%m-%d %H:%M:%S')] cleanup kicked off—hold tight"

# dirs to obliterate—add more here if the grind grows
TARGETS=("node_modules" "dist")

# sweep the battlefield
for target in "${TARGETS[@]}"; do
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] hunting $target dirs"
  find . -type d -name "$target" -exec rm -rf {} + 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $target wiped clean"
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $target fight got messy—check the rubble"
  fi
done

# victory lap
echo "[$(date '+%Y-%m-%d %H:%M:%S')] cleanup done—nathan’s ready to roll"

# exit clean—like a pro
exit 0
