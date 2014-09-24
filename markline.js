
var Timeline = require("./index");
var $ = require("jquery");

function Markline(element, markdown_filepath){
  this.element = element;
  this._datafile = markdown_filepath
}

function parse(markdown){
  var lines = markdown.split(/\r\n|\r|\n/);
  var data = {
    title: "",
    data: {}
  };

  var re_title = /^#\s+(.*)$/;
  var re_group = /^##+\s+(.*)$/;
  var re_line  = /^[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/;
  var re_event  = /^\s+[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/;

  var current_group = "";
  var current_line;

  for(var i=0,l=lines.length; i<l; i++){
    var text_line = lines[i];
    var match;
    if (match = text_line.match(re_title)){
      data.title = match[1];
    } else if (match = text_line.match(re_group)){
      var group_name = match[1];
      current_group = group_name;
      data.data[current_group] = [];
    } else if (match = text_line.match(re_line)){

      if (!data.data[current_group]){
        data.data[current_group] = [];
      }

      var line_start = match[2];
      if (line_start) {
        line_start = new Date(line_start);
      }

      var line_stop = match[3];
      if (line_stop === undefined) {
        line_stop = line_start;
      } else if (!line_stop) {
        line_stop = new Date();
      } else {
        line_stop = new Date(line_stop);
      }

      var line_name = match[4];
      var data_line = {
        "date": match[1],
        "date-start": line_start,
        "date-end": line_stop,
        "name": line_name,
        "events": []
      };
      data.data[current_group].push(data_line);
      current_line = data_line;

    } else if (match = text_line.match(re_event)) {

      var date = match[1];
      var date_start = match[2];
      var date_end = match[3];
      var name = match[4];

      if (date_start) {
        date_start = new Date(date_start);
      }

      if (date_end === undefined){
        date_end = date_start;
      } else if (!date_end) {
        date_end = new Date();
      } else {
        date_end = new Date(date_end);
      }

      current_line.events.push({
        "date": date,
        "date-start": date_start,
        "date-end": date_end,
        "name": name
      });

    }
  }

  return data;
}

Markline.prototype.render = function(){
  var me = this;
  $.get(this._datafile, function(markdown){
    var data = parse(markdown);

    var timeline = new Timeline(me.element, data.data);
    timeline.render();
  });
};

module.exports = Markline;
