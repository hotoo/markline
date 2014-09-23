
var $ = require("jquery");
var Event = require("evt");

var offset_left = 30;
var offset_top = 20;

var year_width = 100;

function Markline (element, data) {
  this._element = $(element);
  this._data = data;
  this._evt = new Event();
}

function calcLength(distance){
  return (distance / (24 * 60 * 60 * 1000)) * year_width / 365.24;
}

function isFunction(object){
  return Object.prototype.toString.call(object) === "[object Function]";
}

Markline.prototype._process = function(data, handlers){
  if (!handlers) {return;}

  for(var group_name in data){
    if (!data.hasOwnProperty(group_name)) {continue;}

    var lines = data[group_name];

    if (isFunction(handlers["group:start"])) {
      handlers["group:start"].call(this, group_name, lines);
    }

    for(var i=0,l=lines.length; i<l; i++){
      var line = lines[i];

      if (isFunction(handlers["line:start"])) {
        handlers["line:start"].call(this, line);
      }

      for(var j=0,l=line.events.length; j<l; j++){

        if (isFunction(handlers["event"])) {
          handlers["event"].call(this, line);
        }
      }

      if (isFunction(handlers["line:stop"])) {
        handlers["line:stop"].call(this, line);
      }

    }

    if (isFunction(handlers["group:stop"])) {
      handlers["group:stop"].call(this, group_name, lines);
    }

  }
}

Markline.prototype.render = function(){

  var min_date;
  var max_date;

  this._process(this._data, {
    "line:start": function(line){

      var date_start = line["date-start"];
      var date_end = line["date-end"];

      if (!min_date || date_start < min_date){
        min_date = date_start;
      }

      if (!max_date || max_date < date_end) {
        max_date = date_end;
      }

    }
  });


  var first_year = min_date.getFullYear();
  var last_year = max_date.getFullYear() + 2;

  // HEAD: dates
  var head_dates = ['<div class="dates">', '<ol>'];

  for(var year=first_year; year<=last_year; year++){
    head_dates.push('<li>', year, '</li>')
  }

  head_dates.push('</ol>', '</div>');


  // BODY: events groups, and events.
  var body_events = ['<div class="events" id="events">'];

  this._process(this._data, {
    "group:start": function(group_name){
      body_events.push(
        '<div class="groups">',
          '<label>', group_name, '</label>',
          '<ol>'
      );
    },

    "group:stop": function(){
      body_events.push(
          '</ol>',
        '</div>'
      );
    },

    "line:start": function(line){

      var date_start = line["date-start"];
      var date_end = line["date-end"];
      var line_start = calcLength(date_start - min_date) + offset_left;
      var line_length = calcLength(date_end - date_start);

      body_events.push(
        '<li style="left:', line_start, 'px;">',
          '<ol style="width:', line_length, 'px;">');
    },

    "line:stop": function(line){
      body_events.push(
          '</ol>',
          '<time>', line["date-start"], '</time>',
          '<label>', line.name, '</label>',
        '</li>'
      );
    },

    "event": function(event){
      var event_name = event.name;
      var event_start = 0;
      body_events.push('<li style="left:', event_start, 'px;" title="', event_name, '"></li>');
    }

  });


  this._element.addClass("markline");
  this._element.append(head_dates.join(""));
  this._element.append(body_events.join(""));

};

module.exports = Markline;
