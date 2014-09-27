
var Timeline = require("./timeline");
var $ = require("jquery");

function Markline(element, markdown){
  this.element = element;

  var data = parse(markdown);
  this.timeline = new Timeline(this.element, data.title, data.data);
}

// @param {String} date
function parseDate(date_string){

  if (!date_string) {
    return new Date();
  }

  //              year          month           date            hour         minute       second
  var RE_DATE = /^(\d{4})(?:[/-](\d{1,2})(?:[/-](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?)?)?)?$/;

  var match = date_string.match(RE_DATE);
  if (!match){return;}

  var year = match[1];
  var month = match[2] || 0;
  var date = match[3] || 1;
  var hour = match[4] || 0;
  var minute = match[5] || 0;
  var second = match[6] || 0;
  return new Date(year, month, date, hour, minute, second);
}

// @param {String} date.
function parseDateEnd(date){

  var RE_YEAR = /^\d{4}$/;
  var RE_MONTH = /^\d{4}[\/\-]\d{1,2}$/;
  var RE_DATE = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/;

  var dt = parseDate(date);

  if (RE_YEAR.test(date)) {
    dt.setYear(dt.getFullYear() + 1);
  } else if (RE_MONTH.test(date)) {
    if (dt.getMonth() === 11) {
      dt.setYear(dt.getFullYear() + 1);
      dt.setMonth(0);
    } else {
      dt.setMonth(dt.getMonth() + 1);
    }
  }

  return dt;
}

// parse simple markdown.
// @param {String} markdown.
// @return {String} html tags.
function parseMarkdown(markdown){
  var RE_IMAGE = /!\[([^\]]*)\]\(([^\)]+)\)/g;
  var RE_LINK = /\[([^\]]*)\]\(([^\)]+)\)/g;
  var RE_STRONG = /(\*\*|__)(.*?)\1/g;
  var RE_EM = /(\*|_)(.*?)\1/g;
  var RE_DELETE = /(\~\~?)(.*?)\1/g;


  var html = markdown.replace(RE_IMAGE, '<a href="$2" target="_blank"><ins alt="$1" title="$1"></ins></a>');
  html = html.replace(RE_LINK, '<a href="$2" target="_blank">$1</a>');
  html = html.replace(RE_STRONG, '<strong>$2</strong>');
  html = html.replace(RE_EM, '<em>$2</em>');
  html = html.replace(RE_DELETE, '<del>$2</del>');
  return html;
}

// parse markline.
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
      // PARSE TITLE.
      data.title = match[1];
    } else if (match = text_line.match(re_group)){
      // PARSE GRPUPS.
      var group_name = match[1];
      current_group = group_name;
      data.data[current_group] = [];
    } else if (match = text_line.match(re_line)){
      // PARSE EVENT LINES.

      if (!data.data[current_group]){
        data.data[current_group] = [];
      }

      var line_start = match[2];
      var line_stop = match[3] === undefined ? line_start : match[3];
      var line_name = match[4];
      var data_line = {
        "date": match[1],
        "date-start": parseDate(line_start),
        "date-end": parseDateEnd(line_stop),
        "name": parseMarkdown(line_name),
        "events": []
      };
      data.data[current_group].push(data_line);
      current_line = data_line;

    } else if (match = text_line.match(re_event)) {
      // PARSE SUB EVENT POINTS.

      var date = match[1];
      var date_start = match[2];
      var date_end = match[3] === undefined ? date_start : match[3];
      var name = match[4];

      current_line.events.push({
        "date": date,
        "date-start": parseDate(date_start),
        "date-end": parseDateEnd(date_end),
        "name": parseMarkdown(name)
      });

    }
  }

  return data;
}

Markline.prototype.render = function(){
  this.timeline.render();
};

module.exports = Markline;
