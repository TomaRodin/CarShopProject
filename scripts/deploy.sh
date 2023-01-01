#!/usr/bin/env bash

# create dist folder 
yarn install
yarn build

# setup deploy folder
cd deploy
yarn install

# aws cdk
cdk synth
cdk deploy