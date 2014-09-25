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

## API

### Markline(Object element, String filePath)

Markline Constuctor.

Params:

* `Object element`: markline container element, Need HTMLElement, jQuery Object, or Selector.
* `String filePath`: markdown file path to be used.

### markline.render()

Render timeline into container.
