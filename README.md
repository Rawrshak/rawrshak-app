# Setup local environment
1) Pull down & npm install within the Rawrshak contracts repository: https://github.com/Rawrshak/Rawrshak
2) Pull down & npm install within the Rawrshak subgraphs repository: https://github.com/Rawrshak/Subgraphs
3) Install IPFS Desktop: https://docs.ipfs.io/install/ipfs-desktop/#windows
4) Install the graph-cli: npm install -g @graphprotocol/graph-cli
5) Create an account on https://thegraph.com/ using your github account: https://thegraph.com/hosted-service/
6) In your local IPFS node, pin the testdata/metadata folder from within the Rawrshak subgraphs repository
7) Open a new terminal in Rawrshak contracts folder. Run “npx hardhat node”
8) Open a new terminal in Rawrshak contracts folder. Run:
      a) npx hardhat run --network localhost scripts/deploy.js
      b) npx hardhat run --network localhost scripts/distribute_rawr_tokens.js
      c) npx hardhat run --network localhost scripts/subgraph_arweave_data.js
      d) npx hardhat run --network localhost scripts/subgraph_ipfs_data.js
9) Set the deployed content factory contract addresses in the Rawrshak subgraph repository contents.yaml file
10) In the Rawrshak subgraphs folder, delete the docker\data folder
11) Open a new terminal in Rawrshak subgraphs folder. Run “npm run docker-up”
12) Open a new terminal in Rawrshak subgraphs folder. Run: 
      a) npm run codegen:contents
      b) npm run create-local:contents
      c) npm run deploy-local:contents
13) The subgraph endpoint should now be available at: http://localhost:8000/subgraphs/name/<github username>/contents
14) Add this URL to the REACT_APP_LOCAL_SUBGRAPH_ENDPOINT variable in the .env.local file of this repository
15) Start the web app using "npm run start"


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
