
var $ = require("jquery");

var offset_left = 30;
var offset_top = 20;

var year_width = 100;

function Markline (element, data) {
  this._element = $(element);
  this._data = data;
}

Markline.prototype.prepare = function(){

  var date_min = new Date();
  var date_max;

  for(var groupName in this._data){
    if (!this._data.hasOwnProperty(groupName)) {continue;}
    var lines = this._data[groupName];

    for(var i=0,l=lines.length; i<l; i++){
      var date_start = lines[i]["date-start"];
      var date_end = lines[i]["date-end"];

      if (date_start < date_min){
        date_min = date_start;
      }

      if (!date_max) {
        date_max = date_end;
      } else if (date_max < date_end){
        date_max = date_end;
      }
    }

  }

  return {
    min: date_min,
    max: date_max
  };
};

Markline.prototype.render = function(){

  this._element.addClass("markline");

  var date_min = new Date();
  var date_max;

  // BODY: events groups, and events.
  var body_events = ['<div class="events" id="events">'];

  for(var groupName in this._data){
    if (!this._data.hasOwnProperty(groupName)) {continue;}

    body_events.push('<div class="groups">', '<label>Default</label>', '<ol>');

    var lines = this._data[groupName];
    for(var i=0,l=lines.length; i<l; i++){
      var line = lines[i];

      var date_start = line["date-start"];
      var date_end = line["date-end"];

      if (date_start < date_min){
        date_min = date_start;
      }

      if (!date_max) {
        date_max = date_end;
      } else if (date_max < date_end){
        date_max = date_end;
      }

      var line_name = "line";
      var line_start = 0 + offset_left;
      var line_length = 100;

      body_events.push(
        '<li style="left:', line_start, 'px;">',
          '<ol style="width:', line_length, 'px;">');

      for(var j=0,l=line.events.length; j<l; j++){
        var event = line.events[j];
        var event_name = event.name;
        var event_start = 0;
        body_events.push('<li style="left:', event_start, 'px;" title="', event_name, '"></li>');

      }

      body_events.push(
          '</ol>',
          '<time>', event["date-start"], '</time>',
          '<label>', line_name, '</label>',
        '</li>'
      );
    }
  }

  var min_year = date_min.getFullYear();
  var max_year = date_max.getFullYear() + 2;

  // HEAD: dates
  var head_dates = ['<div class="dates">', '<ol>'];

  for(var year=min_year; year<=max_year; year++){
    head_dates.push('<li>', year, '</li>')
  }

  head_dates.push('</ol>', '</div>');

  this._element.append(head_dates.join(""));
  this._element.append(body_events.join(""));

};

module.exports = Markline;
