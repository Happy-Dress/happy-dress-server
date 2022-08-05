#!/bin/bash

BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
REGEXP="^((feat|fix|chore|refactor)\/[A-Z0-9]+-[0-9]+$)"

if [[ $BRANCH_NAME == "head" ]]
 then
  echo "Detached head state detected. Skipping branch checks."
else
  if [[ $BRANCH_NAME == "develop" ]]
   then
  echo "Detached develop state detected. Skipping branch checks."
elif [[ ! $BRANCH_NAME =~ $REGEXP ]]
   then
  echo -e "\nCurrent branch name \"$BRANCH_NAME\" violates branch naming conventions.\n
    See - https://happydress.atlassian.net/l/cp/BmBJXxhr\n"
  exit 1
  fi
fi