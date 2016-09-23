# Slingshot Sagas!
Another React-Redux starter kit heavily inspired by Cory House's react-slingshot

[![Build Status](https://travis-ci.org/nibblesnbits/slingshot-sagas.svg?branch=master)](https://travis-ci.org/nibblesnbits/slingshot-sagas)
[![Build status](https://ci.appveyor.com/api/projects/status/ytf3aupfshvgt0u5?svg=true)](https://ci.appveyor.com/project/nibblesnbits/slingshot-sagas)
[![Coverage Status](https://coveralls.io/repos/github/nibblesnbits/slingshot-sagas/badge.svg?branch=master)](https://coveralls.io/github/nibblesnbits/slingshot-sagas?branch=master)
[![Dependency Status](https://david-dm.org/nibblesnbits/slingshot-sagas.svg?style=flat-square)](https://david-dm.org/nibblesnbits/slingshot-sagas)

Slingshot Sagas is a comprehensive starter kit for rapid application development using React, heavily inspired by [@coryhouse](https://github.com/coryhouse)'s [React Slingshot Project](https://github.com/coryhouse/react-slingshot).

Why Slingshot?

1. **(Almost) One command to get started** - Type `npm start` to start development in your default browser.
  a. In order to make requests to the included auth server, see [Auth Server](#auth-server).
2. **Rapid feedback** - Each time you hit save, changes hot reload and linting and automated tests run.
3. **One command line to check** - All feedback is displayed on a single command line.
4. **No more JavaScript fatigue** - Slingshot uses the most popular and powerful libraries for working with React.
5. **Working example app** - The included example app shows how this all works together.
6. **Automated production build** - Type `npm run build` to do all this:

## Get Started
1. **Initial Machine Setup**. First time running the starter kit? Then complete the [Initial Machine Setup](#initial-machine-setup).
2. **Clone the project**. `git clone https://github.com/nibblesbits/slingshot-saga.git`.
3. **Run the setup script**. `npm run setup`
4. **Run the example app**. `npm start -s`
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
5. **Review the example app.** This starter kit includes a working example app that calculates fuel savings. Note how all source code is placed under /src. Tests are placed alongside the file under test. The final built app is placed under /dist. These are the files you run in production.

## Initial Machine Setup
1. **Install [Node 5.0.0 or greater](https://nodejs.org)** Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).
2. **Install [Git](https://git-scm.com/downloads)**. 
3. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  
 
**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` 

**On Windows:** 
 
* **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

## Technologies
Slingshot offers a rich development experience using the following technologies:

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)  |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Pluralsight Course]
|  [Redux Saga](https://github.com/yelouafi/redux-saga) | A library that aims to make side effects in React/Redux applications easier and better. |   |
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications) |
|  [React Router Redux](https://github.com/reactjs/react-router-redux) | Enables easy programatic management of routing state |  |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](http://webpack.github.io) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Mocha](http://mochajs.org) | Automated tests with [Chai](http://chaijs.com/) for assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
| [Isparta](https://github.com/douglasduteil/isparta) | Code coverage tool for ES6 code transpiled by Babel. | 
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |

## Test Server
This project includes a submodule from [an auth0 example repo](https://github.com/auth0-blog/nodejs-jwt-authentication-sample/tree/8a3e52e52ceafeac12b1693d06837f3351aced47).
There are a couple of steps enable requests to that server.
### Initial Setup
First, navigate to the project directory directory and execute
```
git submodule update --recursive --remote
cd auth-server
npm i
```
This will pull down the submodule and download it's NPM packages.
### Running the Server
After initial setup, just navigate to the `auth-server` directory and run `npm start -s` to run the server.

# TODO
- Handle 404 routes
- *If anyone has any more, feel free to report them in Issues*
