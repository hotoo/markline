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

## Markdown

Markdown is so easy, and so powerful, you can use it to build the timeline graph.

Markline use subsets of markdown now:

### Dates

* `1986` for year.
* `1986/08` for month.
* `1986/08/14` is @lizzie's birthday.

### Date Ranges

* `2012~2014` year to year.
* `2012~2014/02` year to year.
* `1984/06/28~1984/08/14` from date to another date.
* `2012~` year to now.

### Header

* `# h1` for title.
* `## h2`, `### h3`, `#### h4`, `##### h5`, `###### h6` for groups.

### List

* `* list item`, `- another list item` for lines.
* `  * sub list item`, `  - another sub list item` for events.

### Others

More markdown syntax support maybe in the feature.

### Examples

```
# document name(title)

## group name (optional)

* 2012~2014 list 1
  - 2012/02 sub list 2.1
  - 2013/08/02~2013/12/20 sub list 2.2
* 2012/02 list 2
* 2012/02/02 list 3

## another group

- 2013 another list item.
- 2013/05/05 yet another list item.
```

### More info see ref:

* [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)
* [Example Data](examples/data.mdown)

## Why write this?

* I like [cheeaun/life](https://github.com/cheeaun/life) but I want more.
* I do'nt like cheeaun/life repo's code.
* But thanks @cheeaun anyway.

## LICENSES

MIT
