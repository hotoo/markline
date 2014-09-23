# Markline [![spm version](http://spmjs.io/badge/markline)](http://spmjs.io/package/markline)

---

Timeline via Markdown

## Install

```
$ spm install markline --save
```

## Usage

```js
var Markline = require('markline');
var line = new Markline("#timeline", "./data/timeline.md");
line.render();
```
