# Markline [![spm version](http://spmjs.io/badge/markline)](http://spmjs.io/package/markline) [![NPM version](https://badge.fury.io/js/markline.png)](http://badge.fury.io/js/markline)

---

Timeline via Markdown

* [Sample repository on hotoo' life](https://github.com/hotoo/life), and [demo here](http://hotoo.me/life).

## Install

via npm:

```bash
$ npm install markline -g
```

via spm:

```
$ spm install markline --save
```

## Usage

### for Command Line Interface(CLI):

```bash
$ markline server data.md
Server Started 127.0.0.1:8000

$ markline server -p 80 data.md
Server Started 127.0.0.1:80

$ markline server -w data.md
Server Started 127.0.0.1:8000

$ markline build data.md

$ markline build data.md --dist _site
```

build pages in `dist` directory by default, you can set `--dist` argument for custom.

### for Web:

```js
var Markline = require('markline');
var $ = require("jquery");

$.get("./data/timeline.md", function(markdown){
  var line = new Markline("#timeline", markdown);
  line.render();
});
```

## API

### Markline(Object element, String markdown)

Markline Constuctor.

Params:

* `Object element`: markline container element, Need HTMLElement, jQuery Object, or Selector.
* `String markdown`: markdown content.

### markline.render()

Render timeline into container.

## Markdown

Markdown is so easy, and so powerful, you can use it to build the timeline graph.

Markline use subsets of markdown now:

### Dates

```markdown
* 1986 for year.
* 1986/06 for month.
* 1986/06/28 is a good day.
* 1986-06-28 you also can use this date formart.
```

### Date Ranges

```markdown
* 2012~2014 year to year.
* 2012~2014/02 year to year.
* 1986/06/28~1986/08/14 from date to another date.
* 2012~ year to now.
```

### Header

```markdown
# title

## h2 group name
### h3 group name
#### h4 group name
##### h5 group name
###### h6 group name
```

### Meta

Between title and group or lines, we can set meta data in markdown by key-value pair.

```markdown
# title

- age: show
- date: 2014/01/01
- author: @hotoo
- mention: https://twitter.com/{@mention}

----

# Group 1

* 2014 line 1.
```

Now we support meta data:

* `age`: show age after year in top header line. default is hide, if want show, set:

  ```markdown
  - age: show
  ```
* `mention`: set mention enable, and mention base url. default mention is disable.

  ```md
  # @Mention Demo

  - mention: https://github.com/{@mention}

  ----

  - 2014 @hotoo mention @lizzie
  ```

  `{@mention}` is placeholder for mention name.

* `hashtag`: custom hashtag styles.

  ```md
  # #HashTag Demo

  - hashtag:
    - tag-name: text-color, background-color
    - life: yellow, #f00
    - job: rgb(255,255,255), rgba(255,0,0,0.5)

  ----

  - 2014 this is my #life
  ```

following meta data support come soon.

* `theme`: set different theme, by build-in theme name, or theme css file url.

  ```markdown
  - theme: light
  - theme: http://www.example.com/theme.css
  ```
* `year-length`: set date column width.
* `date-type`: show date type by `year`, `month`, or `date`
* `author`: set author information.

### List

```markdown
* 2014 list item
  * 2014/01 sub list item

- 2014 another list item
  - 2014/01 another sub list item
```

### Horizontal

for anonymous group.

```markdown
* 2014 line 1

----

* 2015 line 2
```

### Link

```markdown
* 2014 this is a  [link](url)
```

### Image

```markdown
* 2014 this is an image: ![alt](image-url)
```

### Strong

```markdown
* 2014 this is **strong** text.
* 2014 this is __another strong__ text.
```

### Emphasized

```markdown
* 2014 this is _emphasized_ text.
* 2014 this is *another emphasized* text.
```

### Delete

```markdown
* 2014 this is ~delete~ text.
* 2014 this is ~~another delete~~ text.
```

Want more markdown syntax feature? make [issues](https://github.com/hotoo/markline/issues), fork and pull request.

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
- 2013-05-05 yet another list item.
```

### References

* [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)
* [Example Data](examples/data.mdown)

## Why I write this?

* I like [cheeaun/life](https://github.com/cheeaun/life) but I want more.
* I don't like cheeaun/life repo's code.
* cheeaun/life's date format is not good for me. ([IETF-compliant RFC 2822 timestamps](http://tools.ietf.org/html/rfc2822#page-14))
* But Thanks @cheeaun for anyway.
* [Convert cheeaun/life.md for markline](https://github.com/hotoo/markline/wiki#convent-cheeaunlife-data-for-markline)

## LICENSES

MIT
