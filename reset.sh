#!/bin/bash

git pull
cp ./package.json ../applied-angular
cp ./package-lock.json ../applied-angular
cp ./tsconfig.json ../applied-angular
cp -r ./src ../applied-angular
cp -r ./.vscode ../applied-angular
