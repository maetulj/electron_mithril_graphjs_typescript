# Introduction
Simple project that shows how Electron can be used with Mithril, GraphJS and Typescript.

# Compiling

## Necessary Dependencies
To compile `node-js`, `npm` and `gulp` need to be installed. For `node-js` and `npm` check online for installation instruction for your operating system.

To install gulp run: 
```
npm install --global gulp-cli
```

To install necessary `node_modules`run in the root of this project the following command:
```
npm install
```

## Compiling the Project

Because the core of this project is written in Typescript first compilation to Javascript is necessary. To watch-compile this project simply run in the root of this project the following command:
```
gulp
```

This starts a process that compiles the project and then watches for changes and in case of a change re-compiles the project. 

## Starting the Program
After the program has been compiled you can either stop watching with `Ctrl+C` or open a new terminal and start the program with: 
```
npm start
```
This will start the Electron based app written in Typescript that by using Mithril displays a GraphJS graph.