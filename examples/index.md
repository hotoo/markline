# Markline Demo

- order: 1

---

<link rel="stylesheet" href="../timeline.css" type="text/css" media="screen" charset="utf-8">

<div id="markline"></div>

````js
seajs.use(['../markline'], function(Markline){
  var markline = new Markline("#markline", "./hotoo.mdown");
  markline.render();
});
````
