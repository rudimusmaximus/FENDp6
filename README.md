# MyReads Project

**Web app bootstrapped with `Create React App`**  
An Udacity FEND Nanodegree repository. Demonstrate functional app using React approach.

## Project Setup

1. Clone the Project - `git clone https://github.com/rudimusmaximus/FENDp6.git`
2. Go into the directory where the project now lives - `cd FENDp6`
3. Install the dependencies - `npm install`
4. Start the app - `npm start`

## Nvm
I used nvm to load the LTS versions of Node and it's npm.

`Now using node v10.13.0 (npm v6.4.1)`

# My Notes Completing This

## Important Starting Code Note
 - Uses starter code from https://github.com/udacity/reactnd-project-myreads-starter  
 
## Lessons learned:  

| Area | Comments |
| :--- | :--- |
| 1. eslint issue revealed with <br>`cli$ npm ls eslint` <br>Prevents npm start | a. <img width="322" alt="screen shot 2018-11-10 at 12 17 23 pm" src="https://user-images.githubusercontent.com/21182598/48307609-3077d100-e516-11e8-8c3a-c0fa8dd09af9.png"><br>b. The above conflict results when manually installing eslint and the react plug in for it as follows: <br> `npm install eslint --save-dev`<br>`npm install eslint-plugin-react --save-dev`<br>c. Fix with remove node directories and package-lock.json AND eslint 5.9.0 from devDependencies in package.json<br>`rm package-lock.json`<br>`rm -rf node_modules`<br>`npm uninstall -save eslint` <br>d. prefere local npm installations, watch for conflicts of other script version requirements|
| 2. Importing using ES6 modules | a. Becuase React uses webpack (a module bundler), we can use modules from npm installed libraries as follows. <br>`$ npm install --save react-router-dom`<br> and in the code<br>`import { BrowserRouter, Route, Link } from 'react-router-dom'`.<br>b. further reading:<br>[Why babel and webpack with React](https://stackoverflow.com/questions/43175140/why-does-react-require-babel-and-webpack-to-work)<br>[When and Why to Use webpack](https://blog.andrewray.me/webpack-when-to-use-and-why/) |
| 3. Installing peer dependencies | a. read about history and why you can't do this automatically [stackoverflow](https://stackoverflow.com/questions/35207380/how-to-install-npm-peer-dependencies-automatically)<br>b. solution is to take error<br>`warning: npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.`<br> edit your package.json for each of these warnings<br>` "ajv":"^6.0.0" `<br>remove local node modules and package lock<br>`rm package-lock.json`<br>`rm -rf node_modules`<br>`npm install`|
|4. prevent usage of deprecated methods |a. research this as we had to change `componentWillReceiveProps`<br>to<br>`UNSAFE_componentWillReceiveProps`<br>b. TODO: document best practice for future projects. |  

## Assumptions required to solve the problem
The following assumptions were made by evaluating the code and all given instructions (per overview):
 - Demonstrate React thinking approach in markdown file DESIGN_NOTES.md
 - Starter code has all CSS and HTML, but omits the React code; it is a static HTML page of the finished app without interactive functionality
 - Reviewer will have npm installed on their machine
 - Focus on functional React code
 - Required to make use of the `booksAPI.js` file that comes with the starter template to interact with the backend API. It's methods are descripted in the starter portion of the README.md  
 - Avoid using `.jsx` extension; stick with `.js`
 
## Work Flow
Similar to my 'DevFlow' style in FENDp5 - issue labels and template, .eslintrc, .editorconfig, GIT FLOW, Atom, and GitKraken with repo hosted on GitHub.

## Resources used to complete this work
I read:
 - [x](TODO links) 
I watched:
 - [My Reads / React Zoom Study Session w/ Doug Brown](https://www.youtube.com/watch?v=OcL7-7cRpkQ&t=373s)
 - [React Router training](https://reacttraining.com/react-router/)  
 

## Working Notes
These possible packages if needed, install from cli
to see if newer version from contacts exercise
these would appear in package.json:

```json
  "dependencies": {
    "escape-string-regexp": "^1.0.5", [not used this time]
    "form-serialize": "^0.7.2",[not used this time]
    "react-router-dom": "^4.1.1",
    "sort-by": "^1.2.0"[not used this time]
  },
```

# Demonstrate React Approach Design Thinking
Watch edits to `DESIGN_NOTES.md` across commits to document my iteration and design thinking.

# MyReads Project (THIS SECTION FROM STARTER CODE)

This is the starter template for the final assessment project for Udacity's React Fundamentals course. The goal of this template is to save you time by providing a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project. If you choose to start with this template, your job will be to add interactivity to the app by refactoring the static code in this template.

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

For details, check out .github/CONTRIBUTING.md
