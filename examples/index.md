# Markline Demo

- order: 1

---

<link rel="stylesheet" href="../timeline.css" type="text/css" media="screen" charset="utf-8">

<div id="markline"></div>

````js
seajs.use(['jquery', '../markline'], function($, Markline){
  $.get("./data.mdown", function(markdown){
    var markline = new Markline("#markline", markdown);
    markline.render();
  });

  $("body").on('mousemove', function(event){
    event.preventDefault();
  });
});
````
