# MOBX CRUD EXAMPLE

## Introduction
This is a simple CRUD application for managing contacts. This project demonstrates the use of React, Mobx, FeathersJS and Mongodb to manage data. Inside the root project folder is another project(backend) that holds logic for the FeathersJS back-end server. The root project was created using [create-react-app](https://github.com/facebookincubator/create-react-app) tool while the back-end api server was created using [Feathers Cli](https://www.npmjs.com/package/feathers) tool.

### Requirements
This is NodeJS application is compatible with Linux, Windows and Mac platforms. Below are the dependencies that need to be installed first:

  - Nodejs version 6.10+
  - Mongodb version 3.4+
  - Yarn (latest version)


##  How to install
Use `git` or **Download Zip** option to download the software.

```bash
git clone git@github.com:brandiqa/mobx-crud-example.git
cd mobx-crud-example

# Install frontend dependencies
yarn install

# Install backend dependencies
cd backend
yarn install
```

## How to configure
At the root of the application, create a file and name it `.env`. Paste  and save the following code in this file:
```env
# babel
REACT_APP_BABEL_STAGE_0=true
REACT_APP_DECORATORS=true
```

## How to run (in development mode)
Ensure you have mongodb installed in your system and that it is running. By default, this project uses `mongodb://localhost:27017/api` to access the database. You can change that in `mobx-crud-example\backend\config\default.json`.


### Start the app
This app is setup to run the backend and the client server concurrently. Just do:

```bash
yarn start
```

Both backend server and client server will start concurrently. You can access the backend API server using a browser or REST client app like Postman using the url http://localhost:3030/api/contacts. To access the client front-end, you'll need to open your browser (chrome recommended) using the url [http://localhost:3000](http://localhost:3000).
