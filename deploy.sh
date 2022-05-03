#!/usr/bin/env bash

source prod.env || exit 1

if [[ $REACT_APP_FIREBASE_API_KEY == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_API_KEY not set" && exit 1; fi
if [[ $REACT_APP_FIREBASE_AUTH_DOMAIN == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_AUTH_DOMAIN not set" && exit 1; fi
if [[ $REACT_APP_FIREBASE_PROJECT_ID == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_PROJECT_ID not set" && exit 1; fi
if [[ $REACT_APP_FIREBASE_STORAGE_BUCKET == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_STORAGE_BUCKET not set" && exit 1; fi
if [[ $REACT_APP_FIREBASE_MESSAGING_SENDER_ID == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_MESSAGING_SENDER_ID not set" && exit 1; fi
if [[ $REACT_APP_FIREBASE_APP_ID == "" ]]; then echo "Error: env variable REACT_APP_FIREBASE_APP_ID not set" && exit 1; fi

npm run build || exit 1
firebase deploy