# attain


A package for Node.JS to make requiring custom resources easier.

Clearly this is still in development.

## Goals:
1. Make it easy to load your work
2. Avoid re-inventing the wheel
3. Not have to deal with paths or links
4. Be fully tested

## Motivation:
All too often, I've had to do things like:
```
var path = require('path'), somename = require(path.join('..', '..', 'dir', 'somename.js');
```
or
```
var config = require('path'), somename = require(path.join('..', '..', 'config.json');
```

## Intended implementation:
```
var config = require(attain('config'));
var somename = require(attain('somename'));
```

How I am intending to do this:
1. Maintain an index file where your files are registered and their relative paths
2. When calling attain(), it will traverse the file tree until it finds the index file, looks up the relative path, and returns that so require can use that path.
3. I would like to also find a way to use this with gulpjs so during build steps it can update any changed relative paths
