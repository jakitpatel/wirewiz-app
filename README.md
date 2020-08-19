Install Node Js : https://nodejs.org/en/download/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) like below.

Install Create React APP Globally

### npm install -g create-react-app   

For Creating the new application with create-react-app
### npx create-react-app my-app
### cd my-app
### npm start

## Available Scripts

In the project directory, you can run:

### `yarn start`  (yarn package manager)
OR 
### `npm run start`   (npm package manager)

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`
OR 
### `npm run test`   (npm package manager)

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`
OR 
### `npm run build`   (npm package manager)

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


For Getting & pushing the code to Source Control GitHub Repository

For cloning any existing repository from remote

### git clone git@github.com:User/UserRepo.git

Below is used to a add a new remote to existing repository if there is no remote link exist : https://git-scm.com/docs/git-remote

### git remote add origin git@github.com:User/UserRepo.git

Below is used to change the url of an existing remote repository: https://git-scm.com/docs/git-remote

### git remote set-url origin git@github.com:User/UserRepo.git

Below will push your code to the master branch of the remote repository defined with origin and -u let you point your current local branch to the remote master branch:

### git add --all
### git commit -m "Any message related to changes done in files"
### git push -u origin master