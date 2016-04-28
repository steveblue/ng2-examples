Angular 2 Boilerplate
https://github.com/steveblue/ng2-boilerplate

This project is starter code for a web app built with Angular 2, based off my previous angular-boilerplate.

## Dependencies ##

You should install these frameworks at a system level before cloning the repo. Homebrew is helpful for installing node.js on a Mac, otherwise all other packages should be handled through npm. Note: if you have previously installed SASS via the gem, uninstall SASS and run the node-sass compiler instead, node-sass is a port of lib-sass and is much faster to compile.

* [node.js] (http://www.nodejs.org)
* [bower] (http://bower.io)
* [gulp] (http://gulpjs.com)
* [sass] (http://www.sass-lang.com)
* [bourbon] (http://www.bourbon.io)


Here are the shell commands so you don't have to look them up: (npm install commands may require sudo)

```
brew install node
npm install -g bower
npm install -g node-sass
npm install -g node-bourbon
npm install -g gulp
```

## Github ##

Fork the repo.
Clone the repo into a local folder.

Use the following command to clone the repo, replacing [username] with your Github username.

```
git clone https://github.com/[username]/angular-boilerplate.git
```


## Installation ##

In the root folder of the repo, run the package installer for the project. This will initiate a bower install of all necessary libraries.

```
npm install
bower install
```

In the project root directory, this command will set up node_modules folder and various dev dependencies. If you do not have ownership rights on the folders that will be created, npm or bower could throw an error. If bower fails to run, `bower install`.


Duplicate the file `/settings/local-config.json` and rename the new file `/settings/local/config.json`. This will establish the settings of the local environment.

After that, you should be able to run `gulp dev` in the root directory of the repo and visit localhost:9000/ in your browser.

```
localhost:9000
```

## Notes ##

A config file for dev and prod environments is found in `/settings`.

This boilerplate is the starter code for any Angular Project. It includes a gulp workflow to build and deploy projects for 2 environments, development and production. The main tasks are detailed in gulpfile.js. `gulp dev` will deploy a development server at `localhost:9000`. This task symlinks the files in /app, /assets, etc to /build/www/ and sets up watchers for changes in .html, .css, and .js files. The dev server may fail when changes are made to app.js. Can someone please fix and submit a pull request?

`gulp prod` will copy all files outlined in config.paths.json to /build/prod/ and create a workable build that can be deployed to a staging server. You can modify what is copied in config.paths.json and/or modify the gulp tasks as needed.

This project uses a AMD module pattern as a wrapper for virtually all JavaScript files. This allows you to inject external dependencies not handled by Angular dependency injection. head.js is used to inject all dependencies prior to bootstrapping the app. SASS/Bourbon/Neat is included to bootstrap responsive states and includes templates for a responsive grid.
