# Overview
This repo hosts the code for Cage-free hub. The core tech used is React/JS + Firebase(Google Cloud Platform). UI uses Material-ui 

#Handoff doc + Production Readiness + Runbook
https://docs.google.com/document/d/1cnZXL82MXrW7FbkgwEexp_J9ve18RfNbFrV5tdtTUyI/edit?usp=sharing

# Getting Started:
clone this repo, then run "npm install" and then "npm start" to run application locally.
You will need the .env for development. Copy this into .env in root(get firebase secrets from firebase):

REACT_APP_STAGE="dev"
REACT_APP_APP_CHECK_DEBUG_TOKEN="{create one in firebase console}"

# Firebase deployments:
run "firebase init firestore" to pull rules and indexes of firestore
run "firebase init storage" to pull rules of firebase storage
run "firebase deploy --only functions" to deploy the firebase cloud function
I forget how you can deploy the rules but there be a command

# Contact:
Contact the developer: Daryl D'Souza https://www.linkedin.com/in/daryl-d-souza-68048b16a/ 
Contact the Organization: GlobalFoodPartners