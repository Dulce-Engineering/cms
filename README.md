# deCMS

## Backend

## Frontend

## Setup & Run
Use "npm i" 
## Run
- npm start
## Deploy
- npm run deploy
## Dev Site
- [deCMS](https://decms-6dc54.firebaseapp.com/)

## CMS Usage
- Add the following scripts:
```
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
  <script defer src="https://decms-6dc54.firebaseapp.com/components/index.js" type="module"></script>
```
- Indicate which project to use with an appropriate project key:
```
  <de-project id="p1" key="plantimator"></de-project>
```
- Include components as required making sure to link to the previously created project component:
```
  <de-text key="h_p1" project-id="p1"></de-text>
```
- Complete Sample:
```
<html>
  <head>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
    <script defer src="https://decms-6dc54.firebaseapp.com/components/index.js" type="module"></script>
  </head>
  <body>
    <de-project id="p1" key="plantimator"></de-project>
    <de-text key="h_p1" project-id="p1"></de-text>
  </body>
</html>
```