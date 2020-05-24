#!/bin/bash
  
# remove current git remote config & history
rm -r .git

# re-initialize git
git init

echo -n "Repo Url: "
read REPO

if [ -n  "$REPO" ]; then
    eval "git remote add origin $REPO"
fi

# Add enviroment variable file and add PORT
touch .env
echo "PORT=3001" >> .env

yarn install

echo $"👍 Your Good to go! Get started by running ..."
echo "yarn dev"

# self destruct
rm setup.sh