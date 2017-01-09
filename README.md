## StudyHubb ##


- Run npm install
- Setup FB sdk onto your computer and connect it with the app (https://developers.facebook.com/docs/ios/getting-started)
- Create new firebase.config.js file (https://firebase.google.com/)

# Developing #

- When developing comment out the following from AppDelegate.m file:
'AHBuild *build = [[AppHub buildManager] currentBuild];
  jsCodeLocation = [build.bundle URLForResource:@"main"
                                  withExtension:@"jsbundle"];'
