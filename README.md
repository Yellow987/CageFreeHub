# Overview
This repo hosts the code for Cage-free hub. The core tech used is React/JS + Firebase(Google Cloud Platform). UI uses Material-ui 

#Handoff doc + Production Readiness + Runbook
https://docs.google.com/document/d/1cnZXL82MXrW7FbkgwEexp_J9ve18RfNbFrV5tdtTUyI/edit?usp=sharing

# Getting Started:
clone this repo, then run "npm install" and then "npm start" to run application locally.
You will need the .env for development. Copy this into .env in root:

REACT_APP_FIREBASE_API_KEY="AIzaSyAUTMx89j6lV6-R5EGn0yRWtAL5tu2SjLs"
REACT_APP_FIREBASE_AUTH_DOMAIN="freerangeeggfarm-26736.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="freerangeeggfarm-26736"
REACT_APP_FIREBASE_STORAGE_BUCKET="freerangeeggfarm-26736.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="471292011029"
REACT_APP_FIREBASE_APP_ID="1:471292011029:web:b24d4e5a4f993aa860641c"
REACT_APP_STAGE="dev"
REACT_APP_APP_CHECK_DEBUG_TOKEN="{create one in firebase console}"

# Firebase Infastucture:
run "firebase init firestore" to pull rules and indexes of firestore
run "firebase init storage" to pull rules of firebase storage

TODO:(Infastructure via github action) for now:
run "firebase deploy --only functions" to deploy the firebase cloud function
(You can fix linting errors auto with "npm run lint -- --fix")

firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes

Stages:
dev, preprod, prod

# Contact:
Contact the developer: Daryl D'Souza https://www.linkedin.com/in/daryl-d-souza-68048b16a/ 
Contact the Organization: GlobalFoodPartners