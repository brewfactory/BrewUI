# BrewUI

User interface for the [BrewCore](https://github.com/brewfactory/BrewCore) project.

## Goal
Having a common responsive controlling interface for the [Brewfactory](http://brewfactory.org)
projects.

### Features
* Schedules new brew
* Monitors brewing
* Visualises brew logs

## How to use

### Interfaces

### Public interfaces
`var BrewUI = require('brew-ui');`

* `BrewUI.routes` -> returns route config (good to check SPA routes)
* `BrewUI.build(outputPath)` -> see below
* `BrewUI.isomorphic()` -> add `BrewUI.App`, `BrewUI.React`, `BrewUI.actions` endpoints (needs [JSX support](https://www.npmjs.org/package/node-jsx))
* `getStaticPath()` -> returns with the static path to the dist directory

#### Overwrite API host
Default: `/`

* Without WebSockets support (will use pooling)
`API=http://localhost:8080 gulp serve` or  

* With WebSockets support
`localStorage.API_HOST= 'http://localhost:8080'` or  
 `window.API_HOST= 'http://localhost:8080'`


### Use as pre-built

Install package  
`npm install brew-ui`  

`var BrewUI = require('brew-ui');`
Serve `BrewUI.getStaticPath()` as  static folder.

**Express example:**
```
var BrewUI = require('brew-ui');
app.use(express.static(BrewUI.getStaticPath()));
```

### Build from project

Install dev dependencies too:
`cd node_modules/brew-ui; npm install`

Build:
```
var BrewUI = require('brew-ui');
var distPath = '/my-projects/brewer/public'

// Build only when it's necessary
BrewUI.build(distPath)
	.then(function (wasBuild) {
	  console.log('Was it built: ' + wasBuild);
	})
	.catch(function (err) {
	  console.error(err);
	});
```

## How to run

**Build dist**
`gulp`

**Serve / watch**
`gulp serve`  

Overwrite API host:
`API=http://localhost:8080 gulp serve`

## Technologies

* React
* Flux
* Isomorphic
* Twitter Bootstrap
