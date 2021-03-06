
var Timeline = require("./timeline");

var DEFAULT_MENTION_URL = "https://github.com/{@mention}";

function isString (object){
  return Object.prototype.toString.call(object) === "[object String]";
}

function Markline(element, markdown){
  this.element = element;

  var data = this.data = parse(markdown);
  this.timeline = new Timeline(this.element, data);
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
  var month = parseInt(match[2] || 1, 10) - 1;
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
function parseMarkdown(markdown, meta){
  var RE_IMAGE = /!\[([^\]]*)\]\(([^\)]+)\)/g;
  var RE_LINK = /\[([^\]]*)\]\(([^\)]+)\)/g;
  var RE_STRONG = /(\*\*|__)(.*?)\1/g;
  var RE_EM = /(\*|_)(.*?)\1/g;
  var RE_DELETE = /(\~\~?)(.*?)\1/g;
  var RE_CODE = /`([^`]+)`/g
  var RE_MENTION = /(^|[^a-zA-Z0-9])@([^\s\t,\(\)\[\]\{\}]+)/g;
  var RE_MENTION_PLACEHOLDER = /\{@mention\}/ig;
  var RE_HASHTAG = /(?:^|[\s\t])\#([^\s\t]+)/g;


  var html = markdown.replace(RE_IMAGE, '<a href="$2" class="img" title="$1" target="_blank">$1</a>');
  html = html.replace(RE_LINK, '<a href="$2" target="_blank">$1</a>');
  html = html.replace(RE_STRONG, '<strong>$2</strong>');
  html = html.replace(RE_EM, '<em>$2</em>');
  html = html.replace(RE_DELETE, '<del>$2</del>');
  html = html.replace(RE_CODE, '<code>$1</code>');

  // mention:
  if (meta.mention) {
    html = html.replace(RE_MENTION, function($0, prefix, mention_name){
      var mention_url = meta.mention || DEFAULT_MENTION_URL;
      return prefix + '<a href="' +
        mention_url.replace(RE_MENTION_PLACEHOLDER, mention_name) +
        '" target="_blank">@' + mention_name + '</a>';
    });
  }

  // #hashtags:
  html = html.replace(RE_HASHTAG, function($0, $1_tag_name){
    var tag_colors = meta.tags || meta.tag || {};
    var style;

    if (tag_colors.hasOwnProperty($1_tag_name)) {
      var tag_color = (tag_colors[$1_tag_name] || "").split(/,[\s\t]+/);
      var color = tag_color[0];
      var bg_color = tag_color[1];
      style =  ' style="color:' + color + ';background-color:' + bg_color + ';"';
    }
    return '<span class="tags"' + style + '>#' + $1_tag_name + '</span>';
  });

  return html;
}

// parse markline.
function parse(markdown){
  var lines = markdown.split(/\r\n|\r|\n/);
  var data = {
    title: "",
    meta: {},
    body: {}
  };

  var re_title = /^#\s+(.*)$/;
  var re_meta = /^[\+\-\*]\s+([^:]+):\s*(.*)$/;
  var re_submeta = /^[\s\t]+[\-\*]\s+([^:]+):\s*(.*)$/;
  var re_hr = /^\-{2,}$/;
  var re_group = /^##{1,5}\s+(.*)$/;
  var re_line  = /^[\+\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/;
  var re_event  = /^\s+[\+\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/;

  var current_group = "";
  var current_line;
  var inline = false; // into group, line, or event body.
  var inmeta = false;
  var current_meta_name;
  var current_meta_value;

  function addGroup(group_name){
    while (data.body.hasOwnProperty(group_name)) {
      group_name += " ";
    }
    current_group = parseMarkdown(group_name, data.meta);
    data.body[current_group] = [];

    inline = true;
  }

  for(var i=0,l=lines.length; i<l; i++){
    var text_line = lines[i];
    var match;
    if (match = text_line.match(re_title)){
      // PARSE TITLE.
      data.title = parseMarkdown(match[1], data.meta);
    } else if (!inline && (match = text_line.match(re_meta))) {
      var meta_name = match[1];
      var meta_value = match[2];
      data.meta[meta_name] = meta_value;
      current_meta_name = meta_name;
      current_meta_value = meta_value;
      inmeta = true;
    } else if (!inline && (match = text_line.match(re_submeta))) {

      if (isString(data.meta[current_meta_name])) {
        data.meta[current_meta_name] = {
          "default": current_meta_value
        };
      }

      var meta_name = match[1];
      var meta_value = match[2];
      data.meta[current_meta_name][meta_name] = meta_value;
      inmeta = true;
    } else if (text_line.match(re_hr)){
      addGroup("");
    } else if (match = text_line.match(re_group)){
      // PARSE GRPUPS.
      var group_name = match[1];
      addGroup(group_name);
    } else if (match = text_line.match(re_line)){
      // PARSE EVENT LINES.

      if (!data.body[current_group]){
        data.body[current_group] = [];
      }

      var line_start = match[2];
      var line_stop = match[3] === undefined ? line_start : match[3];
      var line_name = match[4];
      var data_line = {
        "date": match[1],
        "date-start": parseDate(line_start),
        "date-end": parseDateEnd(line_stop),
        "name": parseMarkdown(line_name, data.meta),
        "events": []
      };
      data.body[current_group].push(data_line);
      current_line = data_line;

      inline = true;
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
        "name": parseMarkdown(name, data.meta)
      });

      inline = true;
    }
  }

  return data;
}

Markline.prototype.render = function(){
  this.timeline.render();
  return this;
};

module.exports = Markline;
