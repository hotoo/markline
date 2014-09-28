# Timeline Demo

- order: 2

---

<link rel="stylesheet" href="../timeline.css" type="text/css" media="screen" charset="utf-8">

<div id="demo"></div>

````javascript
seajs.use('../timeline', function(Markline) {
  var line = new Markline("#demo", {
    title: "DEMO",
    meta: {
      age: "show"
    },
    body: {
      "default": [
        {
          "name": "text",
          "date-start": new Date("1983/08/08"),
          "date-end": new Date("1994/08/18"),
          "events": [
            {
              "date-start": new Date("1984/02/09"),
              "date-end": new Date("1985/06/09"),
              "name": "event 1"
            }
          ]
        }
      ]
    }
  });
  line.render();
});
````
