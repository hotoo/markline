# Timeline Demo

- order: 2

---

<link rel="stylesheet" href="../timeline.css" type="text/css" media="screen" charset="utf-8">

<div id="demo"></div>

````javascript
seajs.use('../timeline', function(Markline) {
  var line = new Markline("#demo", "DEMO", {age:"show"}, {
    "default": [
      {
        "name": "text",
        "date-start": new Date("1983/08/08"),
        "date-end": new Date("2010/08/18"),
        "events": [
          {
            "date": new Date("2014/08/09"),
            "name": "event 1"
          }
        ]
      }
    ]
  });
  line.render();
});
````
