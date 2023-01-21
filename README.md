# Overview
This repo hosts the code for Cage-free hub. The core tech used is React/JS + Firebase(Google Cloud Platform). UI uses Material-ui 
Core tech used:
- Javascript & React
- Firebase for backend
- Material UI for ui components

# Handoff doc + Production Readiness + OpsRunbook
https://docs.google.com/document/d/1cnZXL82MXrW7FbkgwEexp_J9ve18RfNbFrV5tdtTUyI/edit?usp=sharing

# Getting Started:
1. clone this repo 
1. Setup .env if you wish to use preprod database for local development. Copy this into .env in root:
  `REACT_APP_FIREBASE_API_KEY="AIzaSyAUTMx89j6lV6-R5EGn0yRWtAL5tu2SjLs"
  REACT_APP_FIREBASE_AUTH_DOMAIN="freerangeeggfarm-26736.firebaseapp.com"
  REACT_APP_FIREBASE_PROJECT_ID="freerangeeggfarm-26736"
  REACT_APP_FIREBASE_STORAGE_BUCKET="freerangeeggfarm-26736.appspot.com"
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID="471292011029"
  REACT_APP_FIREBASE_APP_ID="1:471292011029:web:b24d4e5a4f993aa860641c"
  REACT_APP_STAGE="dev"
  REACT_APP_APP_CHECK_DEBUG_TOKEN="{ask a developer for one}"`

1. run `npm install` 
1. `npm start`

# Firebase Infastucture:
1. Check which project is active: `firebase use`
1. `firebase use prod`

1. Set firebase functions secrets(one time only - create keys for AWS Simple Email Service): 
  `firebase functions:config:set aws.key="[THE_API_KEY]" aws.id="ses_access_key"` && 
  `firebase functions:config:set aws.key="[THE_API_SECRET_KEY]" aws.id="ses_secret_key"`

1. `firebase deploy --only functions` (Fix linting with: `npm run lint -- --fix`)
1. `firebase deploy --only firestore:rules`
1. `firebase deploy --only firestore:indexes`
1. `firebase deploy --only storage`

# Other Useful intformation
- `firebase init firestore` pulls rules/indexs from firebase
- `firebase init storage` pulls rules from firebase

Stages:
dev, preprod, prod

"freerangeeggfarm-26736" is preprod alias

"chickens-are-my-friends" is prod alias

# Contact:
Contact the developer: Daryl D'Souza https://www.linkedin.com/in/daryl-d-souza-68048b16a/ 
Contact the Organization: GlobalFoodPartners